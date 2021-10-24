/* Import ---------------------------------------------------------------------- */ // - x70

import { ThemeChanger } from '../components/themeChanger'

import { useAuth }  from '../hooks/useAuth'
import { useTheme } from 'next-themes'

import logoLImage from '../../public/logo/logo-light.svg'
import logoDImage from '../../public/logo/logo-dark.svg'
import userLImage from '../../public/avatar/avatar-light.png'
import userDImage from '../../public/avatar/avatar-dark.png'

import Image from 'next/image'

import styles from '../styles/components/header.module.scss'

/* ---------------------------------------------------------------------- */

export function Header() {
    const { user, signOut } = useAuth()
    const { theme } = useTheme()

    return (
        <div className={styles.container}>
            <div className={styles.logoImage}>
                <Image
                    src={theme === 'light' ? logoLImage : logoDImage}
                    alt="HeatsUp"
                    layout="responsive"
                />
            </div>
            <ThemeChanger />

            <div className={styles.logout}>
                { !!user && <button onClick={signOut} className={styles.signOutButton}>Sair</button> }

                <div className={`${styles.userImage} userImage`}>
                    <Image
                        src={user?.avatar_url ?? (theme === 'light' ? userLImage : userDImage)}
                        alt={user?.name ?? 'User Image'}
                        layout="fixed"
                        width={40}
                        height={40}
                    />
                </div>
                { !!user && <style jsx>{`div.userImage > div { border: 0.25rem solid var(--ui-border-img); }`}</style>}
                <ThemeChanger />
            </div>
        </div>
    )
}