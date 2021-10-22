/* Import ---------------------------------------------------------------------- */ // - x70

import React, {
    createContext,
    useState,
    useEffect
} from 'react'

import * as AuthSessions from 'expo-auth-session'
import AsyncStorage      from '@react-native-async-storage/async-storage'

import { api } from '../services/api'

/* ---------------------------------------------------------------------- */

type User = {
    id:         string
    avatar_url: string
    name:       string
    login:      string
}
type AuthContextType = {
    user:          User | null
    isSigningIn:   boolean
    signIn:  () => Promise<void>
    signOut: () => Promise<void>
}
type AuthContextProvider = {
    children: React.ReactNode
}
type AuthResponse = {
    token: string
    user:  User
}
type AuthorizationResponse = {
    params: {
        code?:  string
        error?: string
    },
    type?: string
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProvider) {
    const [ isSigningIn, setIsSigningIn ] = useState(false)
    const [ user,        setUser        ] = useState<User | null>(null)

    const CLIENT_ID     = '2049d3e793d64c9c6c5b'
    const SCOPE         = 'read:user'
    const USER_STORAGE  = '@heatsup:user'
    const TOKEN_STORAGE = '@heatsup:token'

    async function signIn() {
        try {
            setIsSigningIn(true)

            const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`

            const authSessionResponse = await AuthSessions.startAsync({ authUrl }) as AuthorizationResponse
            console.log('Response: ', authSessionResponse)

            if (authSessionResponse.type === 'success' && authSessionResponse.params.error !== 'access_denied') {
                const authResponse = await api.post('/authenticate', { code: authSessionResponse.params.code, app: 'mobile' })
                const { user, token } = authResponse.data as AuthResponse

                api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
                await AsyncStorage.setItem(TOKEN_STORAGE, token)

                setUser(user)
            }
        } catch (err) { console.error(err) }
        finally { setIsSigningIn(false) }
    }
    async function signOut() {
        setUser(null)

        await AsyncStorage.removeItem(USER_STORAGE)
        await AsyncStorage.removeItem(TOKEN_STORAGE)
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStorage  = await AsyncStorage.getItem(USER_STORAGE)
            const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE)

            if (userStorage && tokenStorage) {console.log('entrou')
                api.defaults.headers.common['Authorization'] = `Bearer ${tokenStorage}`
                setUser(JSON.parse(userStorage))
            }

            setIsSigningIn(false)
        }

        loadUserStorageData()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut,
                user,
                isSigningIn
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}