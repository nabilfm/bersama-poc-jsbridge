"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [image, setImage] = useState("/next.svg")
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  useEffect(() => {
    window.onReceiveImage = (imageFromNative = "") => {
      const base64Image = `data:image/png;base64,${imageFromNative}`
      setImage(base64Image)
      setMessage(`${base64Image.substring(0, 20)}.....${base64Image.substring(base64Image.length - 20)}`)
    }
  }, [])

  const callJSBridgeCamera = () => {
    try {
      SuperBridge.takeAPicture()
    } catch(error) {
      try {
        window.webkit.messageHandlers.openCamera.postMessage({})
      } catch(err) {
        setMessage("no handler")
        setTimeout(() => {
          setMessage("")
        }, 1000)
      }
    }
  }

  const callJSBridgeSetTitle = (title) => {
    try {
      SuperBridge.setTitle(title)
    } catch(error) {
      try {
        window.webkit.messageHandlers.setTitle.postMessage({ title })
      } catch(err) {
        setMessage("no handler")
        setTimeout(() => {
          setMessage("")
        }, 1000)
      }
    }
  }

  const callJSBridgeToggleNavigationVisibility = () => {
    try {
      SuperBridge.toggleNavigationVisibility()
    } catch(error) {
      try {
        window.webkit.messageHandlers.toggleNavigationVisibility.postMessage({})
      } catch(err) {
        setMessage("no handler")
        setTimeout(() => {
          setMessage("")
        }, 1000)
      }
    }
  }

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
          <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => {
            console.warn(title)
            callJSBridgeSetTitle(title)
            }} />
          <h2 className={inter.className} onClick={() => callJSBridgeToggleNavigationVisibility(title)}>
            Toggle navigation visibility  <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            This will call JSBridge.toggleNavigation()
          </p>
        </a>
      </div>
      <div className={styles.grid}>
      <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} onBlur={() => {
            console.warn(title)
            callJSBridgeSetTitle(title)
            }} />
          <h2 className={inter.className} onClick={() => callJSBridgeSetTitle(title)}>
            Set title  <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            This will call JSBridge.setTitle("params")
          </p>
        </a>
      </div>
      <div className={styles.grid}>
        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className} onClick={callJSBridgeCamera}>
            Take a Picture  <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            This will call JSBridge.takeAPicture()
          </p>
        </a>
      </div>
    </main>
  )
}
