import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Button, IconButton } from '@mui/material'


function MAnonymousHeader() {

    return (
        <Button variant="contained" disableElevation style={{backgroundColor: '#516BEB', borderRadius: '1000px', fontFamily: 'Poppins', marginLeft: '3ch'}}>
                JOIN
        </Button>
    )

}

function MLoggedHeader() {

    return (
        <div>
            <IconButton>
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>            </IconButton>

            <IconButton >
                <Avatar sx={{width: '30px', height: '30px'}}/>
            </IconButton>
        </div>

    )

}

function MHeader() {

    const isLoggedIn = true;

  return (
    <header style={{display: 'flex', alignItems: 'center', margin: '1rem', backgroundColor: '#F7F7F7', borderRadius: '10px', padding: '0.6rem', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
        <Link href="/">
            <a href="/" style={{margin: '0', padding: '0'}}>
                <Image src="/spade_icon.svg" width="25" height="25" />
            </a>
        </Link>
        <input aria-autocomplete={false} value={''} style={{border: '1px solid #42C2FF', outline:'none', fontSize: '0.9rem', borderRadius: '5px', padding: '0.5rem', width: 'max(15ch, 100%)'}} placeholder="Search here..." />
        </div>
        {isLoggedIn ? <MLoggedHeader /> : <MAnonymousHeader />}
    </header>
  )
}

export default MHeader