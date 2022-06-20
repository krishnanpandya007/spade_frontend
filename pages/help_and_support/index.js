import React from 'react'
import HelpAndSupport from '../../components/help_and_support/HelpAndSupport'
import Header from '../../components/basic/Header'
import { Breadcrumbs, Typography } from '@mui/material'
import Link from 'next/link';


function HelpAndSupportIndex() {




  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={() => {}}>
      Help & Support
    </Link>,

    <Typography key="3" color="text.primary">

    </Typography>,
  ];

  return (
    
    <>
    <Header />
    <Breadcrumbs   separator="›" aria-label="breadcrumb" style={{marginLeft: '3rem', marginTop: '2%'}}>
            {breadcrumbs}
        </Breadcrumbs>
    {/* <h2 style={{marginLeft: '3rem', fontWeight: '700', fontFamily: 'Roboto'}}>
      Help And Support
    </h2> */}
      <HelpAndSupport />
    </>



  )
}


export default HelpAndSupportIndex