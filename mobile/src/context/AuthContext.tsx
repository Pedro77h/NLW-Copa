import { createContext, ReactNode, useState , useEffect } from "react";
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as webBrowser from 'expo-web-browser'
import secret from '../../config/secret.json'

webBrowser.maybeCompleteAuthSession()

interface UseProps {
    name: String
    avatarUrl: String
}

interface AuthProviderProps {
    children: ReactNode
}

export interface AuthContextDataProps {
    user: UseProps
    isUserLoading: boolean
    signIn: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextDataProps)



export function AuthContextProvider({ children }: AuthProviderProps) {
    
    const [user , setUser] = useState<UseProps>({} as UseProps)
    const [isUserLoading, setIsUserLoading] = useState(false)


    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: secret.client_id,
        redirectUri: secret.redirect_uri,
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {

            setIsUserLoading(true)
            await promptAsync()

        } catch (err) {
            console.log(err);
            throw err
            


        } finally {
            setIsUserLoading(false)
        }
    }

    async function signInWithGoogle(acess_token:string) {
        console.log("TOKEN DE AUTENTICAÇÃO :" , acess_token);
        
    }

   const token = useEffect(() =>{
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken)
        }
    } , [response])

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user

        }}>
            {children}

        </AuthContext.Provider>
    )

}