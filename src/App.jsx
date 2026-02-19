import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import Login   from './pages/Login.jsx'
import Lobby   from './pages/Lobby.jsx'
import QuizPage  from './pages/QuizPage.jsx'
import MatchPage from './pages/MatchPage.jsx'
import ChatPage  from './pages/ChatPage.jsx'

/* ─── Global App Context ─── */
export const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

export default function App() {
  const [nickname, setNickname] = useState('')
  const [quizIndex, setQuizIndex] = useState(0)
  const [answers, setAnswers]     = useState([])
  const [matchResult, setMatchResult] = useState(null) // { candidate, compat }

  const ctx = {
    nickname, setNickname,
    quizIndex, setQuizIndex,
    answers, setAnswers,
    matchResult, setMatchResult,
  }

  return (
    <AppContext.Provider value={ctx}>
      <Routes>
        <Route path="/"        element={<Login />} />
        <Route path="/lobby"   element={nickname ? <Lobby />   : <Navigate to="/" />} />
        <Route path="/quiz"    element={nickname ? <QuizPage /> : <Navigate to="/" />} />
        <Route path="/match"   element={matchResult ? <MatchPage /> : <Navigate to="/lobby" />} />
        <Route path="/chat"    element={matchResult ? <ChatPage />  : <Navigate to="/lobby" />} />
        <Route path="*"        element={<Navigate to="/" />} />
      </Routes>
    </AppContext.Provider>
  )
}
