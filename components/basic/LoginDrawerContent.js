import { CircularProgress, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { styled as st } from '@mui/material/styles';

import styled from '@emotion/styled'
import Image from 'next/image';
import Link from 'next/link';
import { FRONTEND_ROOT_URL } from '../../config';
import { LoadingButton } from '@mui/lab';
import { blue } from '@mui/material/colors';

import {signIn, getProviders} from 'next-auth/react'
import LoginDrawerCredentialsSignIn from './LoginDrawerCredentialsSignIn';
import authContext from './contexts/layout_auth_context';

const StyledCloseButton = styled.svg`

  width: 25px;
  height: 25px;
  
  fill: #c4c4c4;

  &:hover {
    cursor: pointer;
    fill: #a6a6a6;
  }

`


const StyledInput = styled.input`

  border: none;
  outline: none;
  background-color: #c4c4c440;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 10px;
  width: 100%;
  padding: 15px;
  margin: 1rem;

  &::placeholder{

    font-family: Poppins

  }

`


const SocialLoginButton = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 15px;
  border:1px solid #00000031;
  font-family: Poppins;
  transition: 0.2s ease;

  &:hover {

    cursor: pointer;
    box-shadow: 0 0 0 1px #4D77FF;
    color: #4D77FF;

  }

  &:disable {

    background-color: #c4c4c4 !important;
    color: black;

  }
  
`


const Root = st('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
      marginTop: theme.spacing(2),
    },
    margin: '1.2rem 0'
  }));

function LoginDrawerContent() {



  /// Remove all handle Close Replace with Provider Functions




  const auth = useContext(authContext);

  return (
      <Stack
        direction="column"

        // justifyContent="space-between"
        height="100vh"
      >

        <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            spacing={0}
            width="100%"
            padding={3}
        >

            <Typography variant="h5" noWrap={true} fontWeight="500" > {auth.drawer_title}</Typography>
            <StyledCloseButton onClick={() => {auth.set_open_drawer(false)}} viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"  fillRule="evenodd" clipRule="evenodd"></path></StyledCloseButton>
            
        </Stack>

        <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            spacing={0}
            padding={3}
        >

           <LoginDrawerCredentialsSignIn />
            {/* <Typography variant="h5" noWrap={true} fontWeight="500" > Let&apos;s Connect !</Typography> */}
            {/* <StyledCloseButton  viewBox="0 0 15 15"  xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"  fillRule="evenodd" clip-rule="evenodd"></path></StyledCloseButton> */}
            
        </Stack>
        <Root>
            <Divider variant="middle" textAlign="center" style={{color: '#00000099'}}>or</Divider>
        </Root>

        <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            padding={3}
        >

            <SocialLoginButton onClick={() => {signIn('google')}}>
                <Image width="35" height="35" src="/google_logo.png" />
                <p style={{margin :'0', marginLeft: '1rem', width: '100%', textAlign: 'center', letterSpacing: '1px'}}>LOGIN WITH GOOGLE</p>
            </SocialLoginButton>

            <SocialLoginButton onClick={() => {signIn('facebook')}}>
                <Image style={{margin: '1rem'}} width="35" height="35" src="/facebook_logo.png" />
                <p style={{margin :'0', marginLeft: '1rem', width: '100%', textAlign: 'center', letterSpacing: '1px'}}>LOGIN WITH FACEBOOK</p>
            </SocialLoginButton>

        </Stack>

        <p style={{fontFamily: 'Poppins', width: '100%', textAlign: 'center', color: '#00000080'}}>Don&apos;t have a Profile? <Link href={`${FRONTEND_ROOT_URL}create/account/`}><a style={{color: '#4D77FF', textDecoration :'underline'}}>create one</a></Link></p>

        <div style={{height: '100%', width: '100%', display: 'grid', placeItems: 'center', letterSpacing: '3px', color: '#c4c4c470', fontSize: '1.5rem'}}>
            SPADE 
        </div>

      </Stack>
  )
}

export default LoginDrawerContent