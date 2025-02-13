"use client"
import { Inter } from 'next/font/google'
import styles from '../page.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Template from './template'

const inter = Inter({ subsets: ['latin'] })

export default function Zanroo() {
    const router = useRouter()
    return <div className="">
        {
            [
                "in-review", "sub-1", "sub-2", "sub-3"
            ].map((item, index) =>
                <div key={index} className={styles.grid} onClick={
                    () => router.push(`zanroo/${item}`)
                }>
                    <h2 className={inter.className}>
                        {item}
                    </h2>
                </div>
            )
        }
        <div className={styles.grid} onClick={() => {router.push("zanroo/in-review")}}>
            <h2 className={inter.className}>
                <img className={styles.image} draggable="false" src='https://cdn-icons-png.flaticon.com/512/25/25297.png'/>
            </h2>
        </div>
    </div>
}