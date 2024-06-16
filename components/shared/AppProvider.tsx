'use client'

import { useContext } from "react"
import { AuthContext } from "@/shared/context/auth-context"

import AuthHook, {UserData} from "@/shared/hooks/auth-hook"


export const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth ; 
}

const AuthProvider = ({
    children
} : {children : React.ReactNode}) => {
    const {login, logout, userId, type, token} = AuthHook();
    return (
        <AuthContext.Provider
            value = {{
                isLoggedIn : !!token,
                login , 
                logout, 
                userId : userId || '',
                type : type || ''
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;