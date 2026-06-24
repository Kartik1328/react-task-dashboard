import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Check localStorage so login persists on refresh
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  function login(username, password) {
    // Fake auth — any non-empty credentials work
    if (!username || !password) return false
    const userData = { username, role: 'developer' }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}