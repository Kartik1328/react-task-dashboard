import { createContext, useContext, useState, ReactNode } from 'react'
import type { User, AuthContextType } from '../types'

// createContext needs a type — null means "not yet initialized"
const AuthContext = createContext<AuthContextType | null>(null)

// ReactNode = any valid JSX children
interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) as User : null
    //                              ↑ type assertion — we know the shape
  })

  function login(username: string, password: string): boolean {
    if (!username || !password) return false
    const userData: User = { username, role: 'developer' }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return true
  }

  function logout(): void {
    setUser(null)
    localStorage.removeItem('user')
  }

  //at the time of the logout remove the user from the localstorage.

  const value: AuthContextType = { user, login, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  // TypeScript knows context could be null — forces us to handle it
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
  // return type is AuthContextType — never null after this check
}