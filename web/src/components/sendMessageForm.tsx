/* Import ---------------------------------------------------------------------- */ // - x70

import {
    FormEvent,
    useContext,
    useState
} from 'react'

import { ToastContext } from '../contexts/ToastContext'

import { motion } from 'framer-motion'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'

import { api }            from '../services/api'
import { useAuth }        from '../hooks/useAuth'
import { ForbiddenWords } from '../../ForbiddenWords'

import Image from 'next/image'

import styles from '../styles/components/sendMessageForm.module.scss'

/* ---------------------------------------------------------------------- */

export function SendMessageForm() {
    const [ message,          setMessage          ] = useState('')
    const [ isSendingMessage, setIsSendingMessage ] = useState(false)

    const { user, signOut } = useAuth()
    const { successToast, warningToast } = useContext(ToastContext)

    const maxCharacters  = 150
    const restCharacters = maxCharacters - message.length

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault()

        if (!message.trim()) return

        const postMessage = async () => {
            try {
                setIsSendingMessage(true)

                await api.post('messages', { message, })

                setMessage('')

                successToast({ context: 'message' })
            } finally { setIsSendingMessage(false) }
        }
        const blockedMessage = () => warningToast({ context: 'message' })

        const words = message.split(' ')
        if (ForbiddenWords.some(word => words.includes(word))) { blockedMessage() }
        else { postMessage() }
    }

    return (
        <div className={styles.sendMessageFormWrapper}>
            <motion.button
                onClick={signOut}
                className={styles.signOutButton}
                whileHover="hover"
                variants={{ hover: { scale: 1.2, } }}
            >
                <VscSignOut size={32} />
            </motion.button>

            <motion.div initial="hidden" animate="visible" variants={{
                hidden: {
                    scale: .8,
                    opacity: 0
                },
                visible: {
                    scale: 1,
                    opacity: 1,
                    transition: {
                    delay: .4
                    }
                },
            }}>
                <header className={styles.signedUserInformation}>
                    <div className={styles.userImage}>
                        <Image
                            src={user?.avatar_url!}
                            alt={user?.name ?? 'User Image'}
                            layout="fixed"
                            width={90}
                            height={90}
                        />
                    </div>
                    <strong className={styles.userName}>{user?.name}</strong>

                    <span className={styles.userGithub}>
                        <VscGithubInverted size={16} />
                        {user?.login}
                    </span>
                </header>
            </motion.div>

            <form onSubmit={handleSendMessage} className={styles.sendMessageForm}>
                <label htmlFor="message">Mensagem</label>
                <textarea
                    id="message"
                    name="message"
                    placeholder="Qual sua expectativa para o evento?"
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                    maxLength={maxCharacters}
                />
                <div className={styles.maxCharacters}>
                    <span>{restCharacters}</span>
                </div>

                <button disabled={isSendingMessage} type="submit">Enviar Mensagem</button>
            </form>
        </div>
    )
}