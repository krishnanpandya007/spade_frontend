// import { Router } from 'next/router'
import { useRouter } from 'next/router';
import React from 'react'
function LoginHome() {

    const router = useRouter();

    router.push('/')

  return (
    <center>
        Welcome Back Smarty, We're Redirecting you...
    </center>
  )
}

// Something in this perticuallar sitruaio

export default LoginHome