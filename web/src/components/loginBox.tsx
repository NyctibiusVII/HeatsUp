/* Import ---------------------------------------------------------------------- */ // - x70

import { VscGithubInverted } from 'react-icons/vsc'

import { useAuth } from '../hooks/useAuth'

import styles from '../styles/components/loginBox.module.scss'

/* ---------------------------------------------------------------------- */

export function LoginBox() {
    const { signInUrl } = useAuth()

    // - Colocar Link/next
    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <a href={signInUrl} className={styles.signWithGithubButton}>
                <VscGithubInverted size={24} />
                Entrar com Github
            </a>
        </div>
    )
}