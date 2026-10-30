import { createContext, useContext, useState } from 'react'
import { getSessionUser, login, signup, logout } from '../utils/auth.js'

// Context lets any component read "who is logged in" without
// passing props through every level (no prop drilling).
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // lazy initial state: read the saved session once, when the app starts
  const [user, setUser] = useState(getSessionUser)

  async function handleLogin(email, password) {
    const result = await login(email, password)
    if (result.ok) setUser(result.user)
    return result
  }

  async function handleSignup(data) {
    const result = await signup(data)
    if (result.ok) setUser(result.user)
    return result
  }

  function handleLogout() {
    logout()
    setUser(null)
  }

  const value = { user, login: handleLogin, signup: handleSignup, logout: handleLogout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// custom hook so components just write: const { user } = useAuth()
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside <AuthProvider>')
  return context
}
