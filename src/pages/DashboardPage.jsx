import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import * as api from '../services/api.js'

export default function DashboardPage() {
  const { token, user } = useAuth()
  const [summary, setSummary] = useState({ totalCompleted: 0 })
  const [topics, setTopics] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    api.getProgressSummary(token).then(setSummary).catch(() => {})
    api.getTopics(token).then(setTopics).catch(() => {})
  }, [token])

  const lastTopicId = localStorage.getItem('lastTopicId')

  return (
    <div>
      <h2>Welcome, {user?.name}</h2>
      <p>Completed problems: <strong>{summary.totalCompleted}</strong></p>
      <div className="row">
        <Link to="/topics" className="button">Browse Topics</Link>
        {lastTopicId && (
          <button className="button secondary" onClick={() => navigate(`/topics/${lastTopicId}`)}>Resume where you left off</button>
        )}
      </div>

      <h3 style={{ marginTop: 20 }}>Topics</h3>
      <ul className="list">
        {topics.map(t => (
          <li key={t.id} className="list-item">
            <div>
              <div className="title">{t.title} {t.level && <span className={`pill ${t.level}`}>{t.level}</span>}</div>
              <div className="desc">{t.description}</div>
            </div>
            <div className="actions">
              <span className={`badge`}>Problems: {t.problemCount}</span>
              <Link className="button" to={`/topics/${t.id}`}>Open</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
