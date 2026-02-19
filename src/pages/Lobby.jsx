import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { QUIZ_DATA } from '../data/questions.js'
import { useChat } from '../lib/useChat.js'
import styles from './Lobby.module.css'

// ── 最新測驗結果（之後可接 Firebase） ──
const RECENT = [
  { user: '0.0',       type: '成熟穩重・成長派',    avatar: '0' },
  { user: 'jen_y0923', type: '快樂規劃・積極分享者', avatar: 'J' },
]

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.getHours().toString().padStart(2, '0') + ':' +
         d.getMinutes().toString().padStart(2, '0')
}

export default function Lobby() {
  const { nickname, setQuizIndex } = useApp()
  const navigate  = useNavigate()
  const [input, setInput] = useState('')
  const chatBottomRef = useRef(null)

  // 接入 Firebase 聊天室（roomId = 'lobby'，所有人共用）
  const { messages, onlineCount, send } = useChat('lobby', nickname)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function handleSend() {
    send(input)
    setInput('')
  }

  function startQuiz(index) {
    setQuizIndex(index)
    navigate('/quiz')
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <header className={styles.header}>
        <h2>❤ 戀愛心理測驗</h2>
        <p className={styles.welcome}>歡迎回來・{nickname} 💕</p>
      </header>

      <div className={styles.body}>
        {/* ── 測驗卡片區 ── */}
        <section className={styles.quizSection}>
          <div className="section-title">✦ 選擇測驗</div>
          <div className={styles.quizGrid}>
            {QUIZ_DATA.map((quiz, i) => (
              <div key={quiz.id} className={styles.quizCard} onClick={() => startQuiz(i)}>
                <div className={styles.quizCardIcon} style={{ background: quiz.iconBg }}>
                  {quiz.icon}
                </div>
                <h3>{quiz.name}</h3>
                <p>{quiz.description}</p>
                <button className="btn-sm">開始測驗</button>
              </div>
            ))}
          </div>
        </section>

        {/* ── 右側面板 ── */}
        <aside className={styles.aside}>
          <div className={`${styles.chatPanel} card`}>
            <div className={styles.chatHeader}>
              <span>💬 聊天大廳</span>
              <span className={styles.onlineCount}>
                {onlineCount > 0 ? `${onlineCount} 位在線` : '連線中…'}
              </span>
            </div>

            <div className={styles.chatMessages}>
              {messages.length === 0 && (
                <div className={styles.emptyHint}>還沒有訊息，來說第一句話吧！💕</div>
              )}
              {messages.map((m) => {
                const isMe = m.nickname === nickname
                return (
                  <div key={m.id} className={`${styles.chatMsg} ${isMe ? styles.chatMsgMe : ''}`}>
                    {!isMe && (
                      <div className={styles.chatAvatar}>{m.nickname?.[0]?.toUpperCase() ?? '?'}</div>
                    )}
                    <div className={styles.chatBubbleWrap}>
                      {!isMe && <div className={styles.chatName}>{m.nickname}</div>}
                      <div className={`${styles.chatBubble} ${isMe ? styles.mine : ''}`}>
                        {m.text}
                      </div>
                      <div className={`${styles.chatTime} ${isMe ? styles.chatTimeMe : ''}`}>
                        {formatTime(m.timestamp)}
                      </div>
                    </div>
                    {isMe && (
                      <div className={`${styles.chatAvatar} ${styles.chatAvatarMe}`}>
                        {nickname?.[0]?.toUpperCase() ?? '?'}
                      </div>
                    )}
                  </div>
                )
              })}
              <div ref={chatBottomRef} />
            </div>

            <div className={styles.chatInputRow}>
              <input
                className={styles.chatInput}
                placeholder="說點什麼…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                maxLength={200}
              />
              <button className={styles.sendBtn} onClick={handleSend}>➤</button>
            </div>
          </div>

          <div className={`${styles.recentPanel} card`}>
            <div className="section-title" style={{ marginBottom: 10 }}>🏆 最新測驗結果</div>
            {RECENT.map((r, i) => (
              <div key={i} className={styles.resultItem}>
                <div className={styles.resultAvatar}>{r.avatar}</div>
                <div className={styles.resultInfo}>
                  <div className={styles.rname}>{r.user}</div>
                  <div className={styles.rtype}>✦ {r.type}</div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
