import { useState } from 'react'
import { loginAdmin } from '../services/api'
import AuthContext from './contextValue'

const TOKEN_KEY = 'cci_admin_token'

function readToken() {
  return localStorage.getItem(TOKEN_KEY)
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken)

  async function login(credentials) {
    const response = await loginAdmin(credentials)
    localStorage.setItem(TOKEN_KEY, response.token)
    setToken(response.token)
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }

  return <AuthContext.Provider value={{ token, isAuthenticated: Boolean(token), login, logout }}>{children}</AuthContext.Provider>
}
