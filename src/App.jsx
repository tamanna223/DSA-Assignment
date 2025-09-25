import React from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import TopicsPage from './pages/TopicsPage.jsx'
import ProblemsPage from './pages/ProblemsPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import { useAuth } from './state/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

function NavBar() {
  const { user, logout, token } = useAuth()
  return (
    <nav className="nav">
      <Link to="/" className="brand">DSA Tracker</Link>
      <div className="spacer" />
      {token ? (
        <>
          <Link to="/">Dashboard</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/progress">Progress</Link>
          <span className="user">{user?.name}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}

export default function App() {
  return (
    <div className="container">
      <NavBar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/topics" element={<ProtectedRoute><TopicsPage /></ProtectedRoute>} />
        <Route path="/topics/:topicId" element={<ProtectedRoute><ProblemsPage /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
