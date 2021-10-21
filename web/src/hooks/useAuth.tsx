/* Import ---------------------------------------------------------------------- */ // - x70

import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState
} from 'react'
import { api } from '../services/api'

/* ---------------------------------------------------------------------- */

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
type User = {
    id:         string
    name:       string
    login:      string
    avatar_url: string
}
type AuthProviderProps = PropsWithChildren<{}>
type AuthContextData = {
    user:          User | null
    isSigningIn:   boolean
    signInUrl:     string
    signOut: () => Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
    const [ user,        setUser        ] = useState<User | null>(null)
    const [ isSigningIn, setIsSigningIn ] = useState(false)

    const clientId = "f0263884eb3692b28c6d"

    const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${clientId}`

    async function signIn(code: string) {
        setIsSigningIn(true)

        try {
            const response = await api.post<AuthResponse>('/authenticate', { code })

            const { token, user } = response.data

            localStorage.setItem('@heatsup:token', token)

            api.defaults.headers.common.authorization = `Bearer ${token}`

            setUser(user)
        }
        catch (err) { console.log(err) }
        finally { setIsSigningIn(false) }
    }
    async function signOut() {
        setUser(null)

        localStorage.removeItem('@heatsup:token')
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
        const token = localStorage.getItem('@heatsup:token')

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
        <AuthContext.Provider value={{ user, isSigningIn, signInUrl, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    return context
}