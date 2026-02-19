import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import styles from './ChatPage.module.css'

function nowTime() {
  const d = new Date()
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0')
}

export default function ChatPage() {
  const { nickname, matchResult } = useApp()
  const navigate = useNavigate()
  const { candidate } = matchResult
  const bottomRef = useRef(null)

  const [messages, setMessages] = useState(() => {
    const t = nowTime()
    return [
      { from: candidate.name, text: candidate.greetings[0], time: t, me: false },
      { from: nickname,       text: '你好！看到你的測驗結果覺得我們很契合！', time: t, me: true },
      { from: candidate.name, text: candidate.greetings[1], time: t, me: false },
    ]
  })

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function send() {
    const text = input.trim()
    if (!text) return
    const t = nowTime()
    setMessages((prev) => [...prev, { from: nickname, text, time: t, me: true }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)
      const reply = candidate.autoReplies[Math.floor(Math.random() * candidate.autoReplies.length)]
      setMessages((prev) => [
        ...prev,
        { from: candidate.name, text: reply, time: nowTime(), me: false },
      ])
    }, 800 + Math.random() * 900)
  }

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Header */}
      <header className={styles.header}>
        <button className={styles.backBtn} onClick={() => navigate('/match')}>←</button>
        <div className={styles.partnerAvatar}>{candidate.avatar}</div>
        <div className={styles.partnerInfo}>
          <div className={styles.pname}>{candidate.name}</div>
          <div className={styles.pstatus}>● 在線中</div>
        </div>
      </header>

      {/* Messages */}
      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.msgRow} ${m.me ? styles.me : ''}`}>
            <div className={styles.msgAv}>{m.from[0].toUpperCase()}</div>
            <div>
              <div className={`${styles.msgBubble} ${m.me ? styles.meBubble : ''}`}>
                {m.text}
              </div>
              <div className={`${styles.msgTime} ${m.me ? styles.meTime : ''}`}>{m.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className={styles.msgRow}>
            <div className={styles.msgAv}>{candidate.avatar}</div>
            <div className={styles.typingBubble}>
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className={styles.inputWrap}>
        <div className={styles.inputRow}>
          <input
            className={styles.field}
            placeholder="輸入訊息…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
          />
          <button className={styles.sendBtn} onClick={send}>➤</button>
        </div>
      </div>
    </div>
  )
}
