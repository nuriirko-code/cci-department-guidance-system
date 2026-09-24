//react wants to remember 'is there currently an authn token?'
import { useState } from 'react'
//admin login is file that communicates with backend
import { adminLogin } from '../services/api'

//AuthContext is the chaneel that was created erlier, AuthContext.jsx puts authn info into that channel(so it is authn office), and useAuth.jsx is a door that allows any component to get the authn info from that channel.
import AuthContext from './contextValue'

const TOKEN_KEY = 'adminToken'
//this is saying "When the application starts, look in the browser's storage cupboard and see whether we already have an admin token."
function readToken() {
  return localStorage.getItem(TOKEN_KEY)
}
// any thing inside authprovider can access the authn info, and any component that wants to use that info can call useAuth() to get it.
// children is the stuff inside the <AuthProvider> tag in App.jsx
export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken)
//Authentication office, please log this administrator in.
  async function login(credentials) {
    //send credentials to backend
    const response = await adminLogin(credentials.username, credentials.password)
    // backend checks credentials, compare bcrypt and sends token like {"token": "ef4d..."} after creating it. the browser stores it(localstorage) which persists even after page refresh
    localStorage.setItem(TOKEN_KEY, response.token)

    setToken(response.token)
  }
//remove the token from local storage and set the token state to null, effectively logging the user out because isauthenticated will be false. This is a client side logout, the backend does not know about it.
  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    setToken(null)
  }
   //Any component inside me can access these four things.
  return <AuthContext.Provider value={{ token, isAuthenticated: Boolean(token), login, logout }}>{children}</AuthContext.Provider>
}
