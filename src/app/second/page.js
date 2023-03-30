"use client"
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function Second() {
  const [image, setImage] = useState("/next.svg")
  const [message, setMessage] = useState("")
  const router = useRouter()

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

      <div className={styles.center}>
        <img
         src={image} className={styles.logo} />
      </div>

      <div className={styles.grid}>
      <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className} >
            this is second page
          </h2>
          <p className={inter.className}>
            native will detect back button pressed and call onReceiveBackEvent (js function)
          </p>
        </a>
      </div>
      

      <div className={styles.grid} onClick={() => router.back()}>
      <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className} >
            back to first page again  <span>-&gt;</span>
          </h2>
        </a>
      </div>
    </main>
  )
}
