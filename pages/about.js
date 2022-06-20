// import Link from 'next/link'
// import { Link } from '@mui/icons-material'
import { Link } from '@mui/material'
import { Breadcrumbs, Typography } from '@mui/material';
import React from 'react'
import About from '../components/About';
import Layout from '../components/basic/layout'

function about() {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
          About
        </Link>,

        <Typography key="3" color="text.primary">
          What is Spade
        </Typography>,
      ];

  return (
    
    <Layout title="About | Spade" content="about page spade spadebeta">

        <About />

    </Layout>

  )
}

export default about