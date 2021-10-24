/* Import ---------------------------------------------------------------------- */ // - x70

 import type { AppProps } from 'next/app'

 import { ToastContextProvider } from '../contexts/ToastContext'
 import { AuthContextProvider }  from '../contexts/AuthContext'
 import { ToastProvider }        from 'react-toast-notifications'
 import { ThemeProvider }        from 'next-themes'

 import Head from 'next/head'

 import '../styles/global.scss'

 /* ---------------------------------------------------------------------- */

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ToastProvider
            autoDismiss
            autoDismissTimeout={3500}
            placement='top-center'
            transitionDuration={500}
        >
            <ToastContextProvider>
                <Head><meta name="viewport" content="width=device-width, initial-scale=1.0" /></Head>
                <AuthContextProvider>
                    <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
                        <Component {...pageProps} />
                    </ThemeProvider>
                </AuthContextProvider>
            </ToastContextProvider>
        </ToastProvider>
    )
}

export default MyApp