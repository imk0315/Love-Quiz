// src/lib/useChat.js
//
// 通用的 Firebase 聊天 Hook
// 傳入 roomId 就可以在任何頁面接入對應的聊天室
//
// 用法：
//   const { messages, onlineCount, send } = useChat('lobby', nickname)

import { useEffect, useState, useRef } from 'react'
import {
  ref, push, onValue, off,
  serverTimestamp, onDisconnect, set, remove,
} from 'firebase/database'
import { db } from './firebase.js'

export function useChat(roomId, nickname) {
  const [messages, setMessages]       = useState([])
  const [onlineCount, setOnlineCount] = useState(0)
  const presenceRef = useRef(null)

  // ── Presence（上線/離線人數）──────────────────────────
  useEffect(() => {
    if (!nickname) return

    // 每個使用者在 presence/{roomId}/{randomKey} 寫入自己的暱稱
    const presencePath = ref(db, `presence/${roomId}`)
    const myRef = push(presencePath)
    presenceRef.current = myRef

    set(myRef, { nickname, joinedAt: serverTimestamp() })
    onDisconnect(myRef).remove() // 斷線自動移除

    // 監聽線上人數
    const unsubPresence = onValue(presencePath, (snap) => {
      setOnlineCount(snap.exists() ? Object.keys(snap.val()).length : 0)
    })

    return () => {
      off(presencePath)
      remove(myRef)
      unsubPresence()
    }
  }, [roomId, nickname])

  // ── Messages ──────────────────────────────────────────
  useEffect(() => {
    const msgsRef = ref(db, `messages/${roomId}`)

    const unsubMsgs = onValue(msgsRef, (snap) => {
      if (!snap.exists()) return
      const raw = snap.val()
      const list = Object.entries(raw)
        .map(([id, v]) => ({ id, ...v }))
        .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0))
        // 只顯示最新 100 則，避免畫面過長
        .slice(-100)
      setMessages(list)
    })

    return () => off(msgsRef)
  }, [roomId])

  // ── Send ──────────────────────────────────────────────
  function send(text) {
    const trimmed = text.trim()
    if (!trimmed || !nickname) return

    push(ref(db, `messages/${roomId}`), {
      nickname,
      text: trimmed,
      timestamp: serverTimestamp(),
    })
  }

  return { messages, onlineCount, send }
}
