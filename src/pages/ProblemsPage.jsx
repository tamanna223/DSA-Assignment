import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import * as api from '../services/api.js'

export default function ProblemsPage() {
  const { topicId } = useParams()
  const { token } = useAuth()
  const [problems, setProblems] = useState([])

  useEffect(() => {
    localStorage.setItem('lastTopicId', topicId)
    api.getProblemsByTopic(token, topicId).then(setProblems).catch((e) => console.error(e))
  }, [token, topicId])

  const toggle = async (id, completed) => {
    const next = problems.map(p => p.id === id ? { ...p, completed } : p)
    setProblems(next) // optimistic
    try { await api.setProgress(token, id, completed) } catch (e) { /* ignore */ }
  }

  return (
    <div>
      <h2>Problems</h2>
      <ul className="list">
        {problems.map(p => (
          <li key={p.id} className="list-item">
            <div>
              <div className="title">{p.subIndex}. {p.title} <span className={`pill ${p.level}`}>{p.level}</span></div>
              <div className="links">
                {p.youtubeUrl && <a href={p.youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>}
                {p.leetCodeUrl && <a href={p.leetCodeUrl} target="_blank" rel="noreferrer">LeetCode</a>}
                {p.codeforcesUrl && <a href={p.codeforcesUrl} target="_blank" rel="noreferrer">Codeforces</a>}
                {p.articleUrl && <a href={p.articleUrl} target="_blank" rel="noreferrer">Article</a>}
              </div>
            </div>
            <div className="actions">
              <label className="checkbox">
                <input type="checkbox" checked={p.completed} onChange={(e) => toggle(p.id, e.target.checked)} />
                Completed
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
