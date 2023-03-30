"use client"
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Second() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    window.onReceiveBackEvent = () => {
      setMessage('back button is pressed')
    }
  }, [])

  return (
    <main className={styles.main}>
      {
        message != "" && <div className={styles.description}>
        <p>
          message:
          <code className={styles.code}>{message}</code>
        </p>
      </div>
      }

      <div className={styles.grid}>
      <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className} onClick={() => callJSBridgeToggleNavigationVisibility(title)}>
            this is second page
          </h2>
          <p className={inter.className}>
            native will call onReceiveBackEvent
          </p>
        </a>
      </div>
    </main>
  )
}
