'use client'
import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // usuário  logado (localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('ksi-auth')
    if (savedAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('ksi-auth', 'true')
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('ksi-auth')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}