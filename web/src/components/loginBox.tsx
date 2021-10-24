/* Import ---------------------------------------------------------------------- */ // - x70

import { VscGithubInverted } from 'react-icons/vsc'

import { useAuth } from '../hooks/useAuth'

import Link  from 'next/link'

import styles from '../styles/components/loginBox.module.scss'

/* ---------------------------------------------------------------------- */

export function LoginBox() {
    const { signInUrl } = useAuth()

    return (
        <div className={styles.loginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem</strong>
            <Link href={signInUrl}>
                <a className={styles.signWithGithubButton}>
                    <VscGithubInverted size={24} />
                    Entrar com Github
                </a>
            </Link>
        </div>
    )
}