import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { useChat } from '../lib/useChat.js'
import styles from './ChatPage.module.css'

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
}

export default function ChatPage() {
  const { nickname, matchResult } = useApp()
  const navigate = useNavigate()
  const { candidate } = matchResult
  const bottomRef = useRef(null)
  const [input, setInput] = useState('')

  const roomId = `match-${candidate.id}`
  const { messages, onlineCount, send } = useChat(roomId, nickname)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    send(input)
    setInput('')
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/match')}>←</button>
        <div className={styles.partnerAvatar}>{candidate.avatar}</div>
        <div className={styles.partnerInfo}>
          <div className={styles.pname}>{candidate.name} 主題聊天室</div>
          <div className={styles.pstatus}>● {onlineCount > 0 ? `${onlineCount} 位在線` : '連線中…'}</div>
        </div>
      </header>

      <div className={styles.messages}>
        {messages.length === 0 && (
          <div className={styles.emptyHint}>
            還沒有訊息！配對到「{candidate.name}」的朋友都在這裡 💕
          </div>
        )}
        {messages.map((m) => {
          const isMe = m.nickname === nickname
          return (
            <div key={m.id} className={`${styles.msgRow} ${isMe ? styles.me : ''}`}>
              <div className={styles.msgAv}>{m.nickname?.[0]?.toUpperCase() ?? '?'}</div>
              <div>
                {!isMe && <div className={styles.msgName}>{m.nickname}</div>}
                <div className={`${styles.msgBubble} ${isMe ? styles.meBubble : ''}`}>
                  {m.text}
                </div>
                <div className={`${styles.msgTime} ${isMe ? styles.meTime : ''}`}>
                  {formatTime(m.timestamp)}
                </div>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      <div className={styles.inputWrap}>
        <div className={styles.inputRow}>
          <input
            className={styles.field}
            placeholder="輸入訊息…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={200}
          />
          <button className={styles.sendBtn} onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  )
}