import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import styles from './MatchPage.module.css'

export default function MatchPage() {
  const { matchResult, setMatchResult } = useApp()
  const navigate = useNavigate()
  const [compatDisplay, setCompatDisplay] = useState(0)

  const { candidate, compat } = matchResult

  // Animate compatibility bar after mount
  useEffect(() => {
    const timer = setTimeout(() => setCompatDisplay(compat), 300)
    return () => clearTimeout(timer)
  }, [compat])

  function goChat() {
    navigate('/chat')
  }

  function goLobby() {
    setMatchResult(null)
    navigate('/lobby')
  }

  return (
    <div className={`${styles.page} page-enter`}>
      <div className={`${styles.card} card`}>
        {/* Hearts */}
        <div className={styles.hearts}>💕</div>
        <h2 className={styles.title}>配對結果出爐！</h2>
        <p className={styles.sub}>根據你的測驗答案，我們找到了最適合你的類型</p>

        {/* Candidate */}
        <div className={styles.matchPerson}>
          <div className={styles.matchAvatar}>{candidate.avatar}</div>
          <div className={styles.matchInfo}>
            <div className={styles.mname}>{candidate.name}</div>
            <div className={styles.mtype}>{candidate.type}</div>
            <div className={styles.mtraits}>
              {candidate.traits.map((t) => (
                <span key={t} className={styles.trait}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Compatibility bar */}
        <div className={styles.compatRow}>
          <span className={styles.compatLabel}>契合度</span>
          <div className={styles.compatBar}>
            <div className={styles.compatFill} style={{ width: `${compatDisplay}%` }} />
          </div>
          <span className={styles.compatPct}>{compat}%</span>
        </div>

        {/* Result type */}
        <div className={styles.resultType}>
          <div className={styles.typeName}>{candidate.resultType}</div>
          <div className={styles.typeDesc}>{candidate.desc}</div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button className="btn-outline" onClick={goLobby}>回大廳</button>
          <button className="btn-primary" onClick={goChat}>💬 進入私聊</button>
        </div>
      </div>
    </div>
  )
}
