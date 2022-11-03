import { createContext, ReactNode } from "react";

interface UseProps {
    name: String
    avatarUrl: String
}

interface AuthProviderProps{
    children: ReactNode
}

export interface AuthContextDataProps {
    user: UseProps
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)



export function AuthContextProvider({ children }:AuthProviderProps) {

    async function signIn() {
        console.log('Vamos Loggar')
    }

    return (
        <AuthContext.Provider value={{
            signIn,
            user: {
                name: 'Pedro',
                avatarUrl: 'https://github.com/Pedro77h.png'
            }

        }}>
            {children}

        </AuthContext.Provider>
    )

}