import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FRONTEND_ROOT_URL } from '../../config'

function StaticHeader() {
  return (
    <center>
        <header style={{width: 'clamp(400px, 80vw, 1200px)', padding: '1.3rem', display: 'flex', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', width: '10rem', letterSpacing: '2px'}}><Image src="/spade_icon.svg" width="25" height="25" />SPADE</div>
            <Link href={FRONTEND_ROOT_URL}>
                <a href={FRONTEND_ROOT_URL} style={{color: 'blue', textDecoration: 'underline'}}>
                    Go To Home
                </a>
            </Link>
        </header>
        <hr />
    </center>
  )
}

export default StaticHeader