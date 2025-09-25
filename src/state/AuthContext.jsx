import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as api from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = async (email, password) => {
    const res = await api.login(email, password)
    setToken(res.token)
    setUser(res.user)
  }

  const register = async (name, email, password) => {
    const res = await api.register(name, email, password)
    setToken(res.token)
    setUser(res.user)
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, login, register, logout }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
