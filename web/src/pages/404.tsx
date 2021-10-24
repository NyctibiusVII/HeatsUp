/* Import ---------------------------------------------------------------------- */ // - x70

import { Header } from '../components/header'

import _404WebImage from '../../public/404/404-web.png'
import _404MobImage from '../../public/404/404-mob.png'

import Image from 'next/image'
import Head  from 'next/head'
import Link  from 'next/link'

import styles from '../styles/pages/404.module.scss'

/* ---------------------------------------------------------------------- */

export default function _404() {
    return (
        <div className={styles.container}>
            <Head><title>404 | HeatsUp</title></Head>
            <Header />
            <main>
                <section className={styles.mobImage}>
                    <Image
                        src={_404MobImage}
                        alt="404 Image"
                        quality={100}
                        decoding="async"
                        width= {258}
                        height={322}
                        priority
                    />
                </section>
                <section className={styles.webImage}>
                    <Image
                        src={_404WebImage}
                        alt="404 Image"
                        quality={100}
                        decoding="async"
                        width= {578}
                        height={328}
                        priority
                    />
                </section>
                <h1>Página Não Encontrada</h1>
                <Link href='/'>
                    <a className={styles.backHome}>VOLTAR</a>
                </Link>
            </main>
        </div>
    )
}