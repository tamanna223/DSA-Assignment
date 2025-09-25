import React, { useEffect, useState } from 'react'
import { useAuth } from '../state/AuthContext.jsx'
import * as api from '../services/api.js'

export default function ProgressPage() {
  const { token } = useAuth()
  const [rows, setRows] = useState([])

  useEffect(() => {
    api.getProgressByTopic(token).then(setRows).catch(() => {})
  }, [token])

  return (
    <div>
      <h2>Progress Report</h2>
      <ul className="list">
        {rows.map(r => (
          <li key={r.topicId} className="list-item">
            <div>
              <div className="title">{r.title}</div>
              <div className="desc">Completed {r.completed} / {r.total} • Pending {r.pending}</div>
            </div>
            <div className="actions" style={{ minWidth: 220 }}>
              <div style={{ width: 200, background: '#0b1220', border: '1px solid #1f2937', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${r.percent}%`, background: '#22c55e', height: 10 }} />
              </div>
              <span style={{ marginLeft: 8 }}>{r.percent}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
