import React, { createContext, useContext, useState, useEffect} from "react";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const navigate = useNavigate()
    const [User, setUser] = useState(()=>
        localStorage.getItem("authToken")?
        jwtDecode(JSON.parse(localStorage.getItem("authToken")).access)
        :
        null
    );

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authToken")
            ? JSON.parse(localStorage.getItem("authToken"))
            : null
    );

    const saveAuthToken = (token) => {
        localStorage.setItem("authToken", JSON.stringify(token));
        setAuthTokens(token);
        setUser(jwtDecode(token.access));
    } 

    const logout = () => {
        localStorage.removeItem("authToken");
        setAuthTokens(null);
        setUser(null);
        navigate("/")
        
    }

    useEffect(() => {
        // run only when autheon is set chanegs with some values...
        if(authTokens && !User) {
            setUser(()=>jwtDecode(authTokens.access))
        }
    }, [authTokens, User])

    const contextData = {
        User, authTokens,setAuthTokens, saveAuthToken, logout, setUser
    }

    return (
        <>
            <AuthContext.Provider value={contextData}>
                {children}
            </AuthContext.Provider>
        </>
    )

}

const useAuth = ()=> useContext(AuthContext)

export{
    useAuth, AuthProvider
}