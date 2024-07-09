import React, { createContext, useEffect, useState } from 'react'
import Config from './config';

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [appName, setappName] = useState("")
    const [token, settoken] = useState(localStorage.getItem('access_token'))

    useEffect(() => {
        const storedToken = localStorage.getItem('access_token');
        settoken(storedToken)
        setappName(Config.APP_NAME)
    }, [])

    return(
        <AuthContext.Provider value={{appName, token}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
