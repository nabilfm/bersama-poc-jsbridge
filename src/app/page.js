"use client"
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const JSBridgeType = {
  SET_TITLE: "setTitle",
  OPEN_CAMERA: "openCamera",
  TOGGLE_NAVIGATION_VISIBILITY: "toggleNavigationVisibility"
}

export default function Home() {
  const getOS = (userAgent) => {
    console.warn(`userAgent ===> ${userAgent}`)
    if (/android/i.test(userAgent)) {
        return "Android";
    }
  
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
  }


  const [image, setImage] = useState("/next.svg")
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")
  const [isAndroid, setIsAndroid] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const router = useRouter()
  useEffect(() => {
    window.onReceiveImage = (imageFromNative = "") => {
      const base64Image = `data:image/png;base64,${imageFromNative}`
      setImage(base64Image)
      setMessage(`${base64Image.substring(0, 20)}.....${base64Image.substring(base64Image.length - 20)}`)
    }
    window.onReceiveBackEvent = null
    const os = getOS(window.navigator.userAgent || window.navigator.vendor || window.opera)
    console.warn(`"os ===> ${os}"`)
    setIsAndroid(os === "Android")
    setIsIOS(os === "iOS")
  }, [])

  const invokeJSBridge = (type = JSBridgeType.OPEN_CAMERA, params = "") => {
    console.warn(`type ${type} and isAndroid ${isAndroid} and isIOS ${isIOS}`)
    try{
      switch(type) {
        case JSBridgeType.OPEN_CAMERA:
          isAndroid && SuperBridge.takeAPicture()
          isIOS && window.webkit.messageHandlers.openCamera.postMessage({})
          break;
        case JSBridgeType.SET_TITLE:
          isAndroid && SuperBridge.setTitle(params)
          isIOS && window.webkit.messageHandlers.setTitle.postMessage({title: params})
          break;
        case JSBridgeType.TOGGLE_NAVIGATION_VISIBILITY && isAndroid:
          isAndroid && SuperBridge.toggleNavigationVisibility()
          isIOS && window.webkit.messageHandlers.toggleNavigationVisibility.postMessage({})
          break;
        default:
          throw Error()
      }
    } catch(err) {
      setMessage("no handler")
        setTimeout(() => {
          setMessage("")
        }, 4000)
    }
  }

  const callJSBridgeCamera = () => {
    invokeJSBridge(JSBridgeType.OPEN_CAMERA)
  }

  const callJSBridgeSetTitle = (title) => {
    invokeJSBridge(JSBridgeType.SET_TITLE, title)
  }

  const callJSBridgeToggleNavigationVisibility = () => {
    invokeJSBridge(JSBridgeType.TOGGLE_NAVIGATION_VISIBILITY)
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

      <div className={styles.grid} onClick={() => router.push('second')}>
        <a
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={inter.className}>
            Override back event  <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            go to next page first
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
          <h2 className={inter.className} onClick={() => callJSBridgeToggleNavigationVisibility(title)}>
            Toggle navigation visibility  <span>-&gt;</span>
          </h2>
          <p className={inter.className}>
            This will call JSBridge.toggleNavigation()
          </p>
        </a>
      </div>
    </main>
  )
}
