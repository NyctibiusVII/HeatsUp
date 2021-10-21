/* Import ---------------------------------------------------------------------- */ // - x70

import { LoginBox }        from '../components/loginBox'
import { MessageList }     from '../components/messageList'
import { SendMessageForm } from '../components/sendMessageForm'

import { useAuth } from '../hooks/useAuth'

import Head from 'next/head'

import styles from '../styles/pages/home.module.scss'

/* ---------------------------------------------------------------------- */

export default function Home() {
    const { user } = useAuth()

    return (
        <>
            <Head><title>HeatsUp</title></Head>
            <main className={`${styles.contentWrapper} ${!!user ? styles.contentSigned : ''}`}>
                <MessageList />
                { !!user ? <SendMessageForm /> : <LoginBox /> }
            </main>
        </>
    )
}