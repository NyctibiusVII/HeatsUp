/* Import ---------------------------------------------------------------------- */ // - x70

 import type { AppProps } from 'next/app'

 import { AuthProvider }  from '../hooks/useAuth'
 import { ThemeProvider } from 'next-themes'

 import Head from 'next/head'

 import '../styles/global.scss'

 /* ---------------------------------------------------------------------- */

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <AuthProvider>
                <ThemeProvider themes={['light', 'dark']} defaultTheme="dark">
                    <Component {...pageProps} />
                </ThemeProvider>
            </AuthProvider>
        </>
    )
}

export default MyApp