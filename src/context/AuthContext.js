import React, { useEffect,useContext,useState } from 'react'
import { useHistory } from 'react-router'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState({})
    const history = useHistory()

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)

            if(user) {
                history.push('/chat')
            } else {
                history.push('/')
            }
        })
    }, [user, history])

    const value = { user }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider