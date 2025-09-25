import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/AuthContext.jsx'

export default function LoginPage() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      if (mode === 'login') await login(email, password)
      else await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="card">
      <h2>{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={onSubmit} className="form">
        {mode === 'register' && (
          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        )}
        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <div className="error">{error}</div>}
        <button type="submit">{mode === 'login' ? 'Login' : 'Create Account'}</button>
      </form>
      <button className="link" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Need an account? Register' : 'Have an account? Login'}
      </button>
    </div>
  )
}
