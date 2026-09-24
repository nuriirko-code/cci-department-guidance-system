import { createContext } from 'react'
//what is context in react? Context provides a way to pass data through the component tree without having to pass props down manually at every level. 
// It is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language.
//this creates the context only (official authentication channel)
// then authContext fills this comminication channel
const AuthContext = createContext(null)

export default AuthContext
