import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import styles from './Login.module.css'

export default function Login() {
  const { setNickname } = useApp()
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [shake, setShake] = useState(false)

  function handleEnter() {
    const nick = value.trim()
    if (!nick) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setNickname(nick)
    navigate('/lobby')
  }

  function handleKey(e) {
    if (e.key === 'Enter') handleEnter()
  }

  return (
    <div className={styles.bg}>
      <div className={`${styles.card} page-enter`}>
        <div className={styles.icon}>💕</div>
        <h1 className={styles.title}>戀愛心理測驗</h1>
        <p className={styles.sub}>探索你的愛情世界 💌</p>

        <input
          className={`input-field ${shake ? styles.shake : ''}`}
          placeholder="輸入你的暱稱"
          maxLength={20}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          style={{ textAlign: 'center', marginBottom: 14 }}
        />

        <button className="btn-primary full" onClick={handleEnter}>
          ✦ 進入大廳
        </button>
      </div>
    </div>
  )
}
