import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../App.jsx'
import { QUIZ_DATA } from '../data/questions.js'
import { findBestMatch } from '../lib/match.js'
import styles from './QuizPage.module.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const { quizIndex, setAnswers, setMatchResult } = useApp()
  const navigate = useNavigate()

  const quiz = QUIZ_DATA[quizIndex]
  const [qIndex, setQIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [collectedAnswers, setCollectedAnswers] = useState([])
  const [animKey, setAnimKey] = useState(0) // forces re-animation on question change

  const total = quiz.questions.length
  const question = quiz.questions[qIndex]
  const progress = ((qIndex + 1) / total) * 100

  function handleSelect(i) {
    setSelected(i)
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = [...collectedAnswers, selected]

    if (qIndex + 1 >= total) {
      // Quiz complete
      setAnswers(newAnswers)
      const result = findBestMatch(newAnswers)
      setMatchResult(result)
      navigate('/match')
    } else {
      setCollectedAnswers(newAnswers)
      setSelected(null)
      setQIndex(qIndex + 1)
      setAnimKey((k) => k + 1)
    }
  }

  return (
    <div className={`${styles.page} page-enter`}>
      {/* Nav */}
      <nav className={styles.nav}>
        <button className={styles.backBtn} onClick={() => navigate('/lobby')}>
          ← 返回大廳
        </button>
        <span className={styles.quizLabel}>❤ {quiz.name}</span>
      </nav>

      {/* Quiz Card */}
      <div className={styles.body}>
        <div className={`${styles.card} card`} key={animKey} style={{ animation: 'pageIn .35s ease both' }}>
          {/* Progress */}
          <div className={styles.progressWrap}>
            <div className={styles.progressLabel}>問題 {qIndex + 1} / {total}</div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Question */}
          <p className={styles.questionText}>{question.text}</p>

          {/* Options */}
          <div className={styles.options}>
            {question.options.map((opt, i) => (
              <button
                key={i}
                className={`${styles.optionBtn} ${selected === i ? styles.selected : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className={styles.optionLetter}>{LETTERS[i]}</span>
                {opt}
              </button>
            ))}
          </div>

          {/* Next */}
          {selected !== null && (
            <div className={styles.nextWrap}>
              <button className="btn-primary" onClick={handleNext} style={{ animation: 'pageIn .25s ease both' }}>
                {qIndex + 1 >= total ? '查看結果 ✨' : '下一題 →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
