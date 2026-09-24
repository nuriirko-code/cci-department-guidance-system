import { useContext } from 'react'
import AuthContext from './contextValue'
// this file is a conveniance door that allows any component to get the authn info from the AuthContext channel. It is a hook, so it must be called inside a function component.

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
