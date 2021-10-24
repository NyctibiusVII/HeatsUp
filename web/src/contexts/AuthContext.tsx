/* Import ---------------------------------------------------------------------- */ // - x70

import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react'

import { ToastContext } from './ToastContext'

import { api } from '../services/api'

/* ---------------------------------------------------------------------- */

type User = {
    id:         string
    name:       string
    login:      string
    avatar_url: string
}
type AuthContextType = {
    user:          User | null
    isSigningIn:   boolean
    signInUrl:     string
    signOut: () => Promise<void>
}
type AuthContextProviderProps = PropsWithChildren<{}>
type AuthResponse = {
    token: string
    user: {
        id:         string
        avatar_url: string
        name:       string
        login:      string
    }
}
type ProfileResponse = AuthResponse['user']

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [ user,        setUser        ] = useState<User | null>(null)
    const [ isSigningIn, setIsSigningIn ] = useState(false)

    const { successToast } = useContext(ToastContext)

    const CLIENT_ID     = 'f0263884eb3692b28c6d'
    const SCOPE         = 'read:user'
    const TOKEN_STORAGE = '@heatsup:token'

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&scope=${SCOPE}`

    async function signIn(code: string) {
        setIsSigningIn(true)

        try {
            const response = await api.post<AuthResponse>('/authenticate', { code, app: 'web' })

            const { token, user } = response.data

            localStorage.setItem(TOKEN_STORAGE, token)

            api.defaults.headers.common.authorization = `Bearer ${token}`

            setUser(user)

            successToast({ context: 'signIn' })
        }
        catch (err) { console.log(err) }
        finally { setIsSigningIn(false) }
    }
    async function signOut() {
        setUser(null)

        localStorage.removeItem(TOKEN_STORAGE)

        successToast({ context: 'signOut' })
    }

    function cleanUrl() {
        const timer = setInterval(() => {
            const url = new URL(window.location.href)
            url.searchParams.delete('code')
            window.history.pushState('object or string', 'Title', url)
        }, 1000)

        return () => clearInterval(timer)
    }

    useEffect(() => {
        const token = localStorage.getItem(TOKEN_STORAGE)

        if (token) {
            api.defaults.headers.common.authorization = `Bearer ${token}`

            api.get<ProfileResponse>('/profile')
                .then(res => { setUser(res.data) })
                .catch(() => { signOut() })
        }
    }, [])
    useEffect(() => {
        const url = window.location.href
        const hasGithubCallbackCode = url.includes("?code=")

        if (hasGithubCallbackCode) {
            const [urlWithoutCode, githubAuthCode] = url.split("?code=")

            window.history.pushState({}, '', urlWithoutCode)

            signIn(githubAuthCode)

            return cleanUrl()
        }
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                isSigningIn,
                signInUrl,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}