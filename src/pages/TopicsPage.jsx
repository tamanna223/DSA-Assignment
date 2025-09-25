import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'
import * as api from '../services/api.js'

export default function TopicsPage() {
  const { token } = useAuth()
  const [topics, setTopics] = useState([])
  const [progressMap, setProgressMap] = useState(new Map())

  useEffect(() => {
    api.getTopics(token).then(setTopics).catch((e) => console.error(e))
    api.getProgressByTopic(token).then((rows) => {
      setProgressMap(new Map(rows.map(r => [String(r.topicId), r])))
    }).catch(() => {})
  }, [token])

  return (
    <div>
      <h2>Topics</h2>
      <ul className="list">
        {topics.map(t => (
          <li key={t.id} className="list-item">
            <div>
              <div className="title">{t.title} {t.level && <span className={`pill ${t.level}`}>{t.level}</span>}</div>
              <div className="desc">{t.description}</div>
              <div className="links">
                {t.youtubeUrl && <a href={t.youtubeUrl} target="_blank" rel="noreferrer">YouTube</a>}
                {t.leetCodeUrl && <a href={t.leetCodeUrl} target="_blank" rel="noreferrer">LeetCode</a>}
                {t.codeforcesUrl && <a href={t.codeforcesUrl} target="_blank" rel="noreferrer">Codeforces</a>}
                {t.articleUrl && <a href={t.articleUrl} target="_blank" rel="noreferrer">Article</a>}
              </div>
              {progressMap.get(String(t.id)) && (
                <div className="desc">Completed {progressMap.get(String(t.id)).completed} / {progressMap.get(String(t.id)).total} • Pending {progressMap.get(String(t.id)).pending}</div>
              )}
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
