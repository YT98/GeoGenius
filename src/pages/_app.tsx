import type { AppProps } from 'next/app';
import '../app/globals.css'
import localFont from 'next/font/local'

import Navbar from '../app/components/navbar'
import backgroundImage from '../../public/background.png'
import styles from '../styles/layout.module.css'

const minecraftFont = localFont({ src: './fonts/Minecraft.ttf'})

export default function Layout({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${minecraftFont.className} ${styles.container}`}
      style={{
        backgroundImage: `url(${backgroundImage.src})`
      }}
    >
      <Navbar />
      <div className={styles.gameContainer}>
        <Component {...pageProps} />
      </div>
    </div>
  )
}