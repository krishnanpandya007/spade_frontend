import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FRONTEND_ROOT_URL } from '../../config'

function StaticHeader() {
  return (
    <center>
        <header style={{width: '100vw', padding: '1.3rem', display: 'flex', justifyContent: 'space-between'}}>
            <Link href="/">
              <a href="/">
                <Image src="/spade_icon.svg" width="25" height="25" />
              </a>
            </Link>
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