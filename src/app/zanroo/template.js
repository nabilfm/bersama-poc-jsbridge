"use client"
import styles from '../page.module.css'
export default function Template({children}) {
    return <div className="">
        <div className={styles.back} onClick={() =>
            JsBridge.handleOnBack()
        }>
            ⬅️
        </div>
        <div className={styles.main}>
            {children}
        </div>
    </div>
}