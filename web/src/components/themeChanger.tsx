/* Import ---------------------------------------------------------------------- */ // - x70

import {
    useEffect,
    useState
} from 'react'
import { useTheme } from 'next-themes'

import styles from '../styles/components/themeChanger.module.scss'

/* ---------------------------------------------------------------------- */

export function ThemeChanger() {
    const [ mounted, setMounted ] = useState(false)
    const { theme,     setTheme } = useTheme()

    // - When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

    const imgSizeLittle = 20

    return (
        <button
            className={styles.lightDark}
            type="button"
            onClick={toggleTheme}
            title="Alternar tema claro/escuro"
            aria-label="Alternar tema claro/escuro"
            data-ga-event-action={theme}
        >
            { theme === 'light' ? (
                <span className={styles.lightIcon}>
                    <svg focusable="false" width={imgSizeLittle + 4} height={imgSizeLittle + 4} viewBox={`0 0 ${imgSizeLittle + 4} ${imgSizeLittle + 4}`} aria-hidden="true">
                        <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-.89 0-1.74-.2-2.5-.55C11.56 16.5 13 14.42 13 12s-1.44-4.5-3.5-5.45C10.26 6.2 11.11 6 12 6c3.31 0 6 2.69 6 6s-2.69 6-6 6z" />
                    </svg>
                </span>
            ) : (
                <span className={styles.darkIcon}>
                    <svg focusable="false" width={imgSizeLittle + 4} height={imgSizeLittle + 4} viewBox={`0 0 ${imgSizeLittle + 4} ${imgSizeLittle + 4}`} aria-hidden="true">
                        <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="var(--white)" />
                    </svg>
                </span>
            ) }
        </button>
    )
}