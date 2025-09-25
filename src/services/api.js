const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api'

function headers(token) {
  const h = { 'Content-Type': 'application/json' }
  if (token) h['Authorization'] = `Bearer ${token}`
  return h
}

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, options)
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Request failed')
  return data
}

export const login = (email, password) =>
  req('/auth/login', { method: 'POST', headers: headers(), body: JSON.stringify({ email, password }) })

export const register = (name, email, password) =>
  req('/auth/register', { method: 'POST', headers: headers(), body: JSON.stringify({ name, email, password }) })

export const getTopics = (token) =>
  req('/topics', { headers: headers(token) })

export const getProblemsByTopic = (token, topicId) =>
  req(`/problems/by-topic/${topicId}`, { headers: headers(token) })

export const setProgress = (token, problemId, completed) =>
  req('/progress/set', { method: 'POST', headers: headers(token), body: JSON.stringify({ problemId, completed }) })

export const getProgressSummary = (token) =>
  req('/progress/summary', { headers: headers(token) })

export const getProgressByTopic = (token) =>
  req('/progress/by-topic', { headers: headers(token) })

export const health = () => req('/health')
