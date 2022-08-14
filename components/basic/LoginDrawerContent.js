import {Backdrop, Divider,Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { styled as st } from '@mui/material/styles';

import styled from '@emotion/styled'
import Image from 'next/image';
import Link from 'next/link';
import { FRONTEND_ROOT_URL } from '../../config';
// import { LoadingButton } from '@mui/lab';
// import { blue } from '@mui/material/colors';

import {signIn} from 'next-auth/react'
import LoginDrawerCredentialsSignIn from './LoginDrawerCredentialsSignIn';
import authContext from './contexts/layout_auth_context';
import { DarkMode, LightMode } from '@mui/icons-material';
import ColorModeContext from './contexts/color_mode_context';
import { useTheme } from '@mui/system';

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


const SocialLoginButton = styled.button`
  display: flex;
  justify-content: flex-start;
  position: relative;
  align-items: center;
  width: 80%;
  padding: 1rem;
  margin-bottom: 2rem;
  border-radius: 15px;
  border:1px solid #00000031;
  font-family: Poppins;
  transition: 0.2s ease;
  background-color: white;
  
  &:hover:enabled {

    cursor: pointer;
    box-shadow: 0 0 0 1px #4D77FF;
    color: #4D77FF;

  }


  &:disabled {
    cursor: not-allowed;
    // background-color: #c4c4c4 !important;
    // color: black;

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


  const theme = useTheme();
  const colorMode = useContext(ColorModeContext)

  const auth = useContext(authContext);

  return (
      <Stack
        direction="column"
        // justifyContent="space-between"
        height="100vh"
        style={{backgroundColor: theme.palette.background.default}}
      >

        <Stack
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            style={{backgroundColor: theme.palette.action.hover}}
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
            <Divider variant="middle" textAlign="center">or</Divider>
        </Root>

        <Stack
            direction="column"
            alignItems="center"
            justifyContent="space-evenly"
            padding={1}
        >
          {/* <BackdropDiv > */}
          {/* <Tooltip title="In Enhancement"> */}
            <SocialLoginButton style={{backgroundColor: theme.palette.mode==='dark' ? '#A2D2FF80' : null, maxWidth: '350px'}} onClick={() => {signIn('google', {callbackUrl:'/social_account/edit?callback_url=' + encodeURIComponent(window ? window.location.href : FRONTEND_ROOT_URL) })}} >
            {/* <svg style={{position: 'absolute', top: '0', right: '0px', transform: 'translate(25%, -50%)', background: 'white'}} width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.49998 0.5C5.49998 0.223858 5.72383 0 5.99998 0H7.49998H8.99998C9.27612 0 9.49998 0.223858 9.49998 0.5C9.49998 0.776142 9.27612 1 8.99998 1H7.99998V2.11922C9.09832 2.20409 10.119 2.56622 10.992 3.13572C11.0116 3.10851 11.0336 3.08252 11.058 3.05806L11.858 2.25806C12.1021 2.01398 12.4978 2.01398 12.7419 2.25806C12.986 2.50214 12.986 2.89786 12.7419 3.14194L11.967 3.91682C13.1595 5.07925 13.9 6.70314 13.9 8.49998C13.9 12.0346 11.0346 14.9 7.49998 14.9C3.96535 14.9 1.09998 12.0346 1.09998 8.49998C1.09998 5.13362 3.69904 2.3743 6.99998 2.11922V1H5.99998C5.72383 1 5.49998 0.776142 5.49998 0.5ZM2.09998 8.49998C2.09998 5.51764 4.51764 3.09998 7.49998 3.09998C10.4823 3.09998 12.9 5.51764 12.9 8.49998C12.9 11.4823 10.4823 13.9 7.49998 13.9C4.51764 13.9 2.09998 11.4823 2.09998 8.49998ZM7.99998 4.5C7.99998 4.22386 7.77612 4 7.49998 4C7.22383 4 6.99998 4.22386 6.99998 4.5V9.5C6.99998 9.77614 7.22383 10 7.49998 10C7.77612 10 7.99998 9.77614 7.99998 9.5V4.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> */}
                <Image width="35" height="35" style={{borderRadius:'5px'}} src="/google_logo.png" />
                <p style={{margin :'0', marginLeft: '1rem', width: '100%', textAlign: 'center', letterSpacing: '1px'}}>CONNECT VIA GOOGLE</p>
            </SocialLoginButton>
          {/* </Tooltip> */}
          {/* </BackdropDiv> */}
          {/* <Tooltip title="In Enhancement"> */}

            <SocialLoginButton style={{backgroundColor: theme.palette.mode==='dark' ? '#A2D2FF80' : null, maxWidth: '350px'}} onClick={() => {signIn('facebook', {callbackUrl: '/social_account/edit?callback_url=' + encodeURIComponent(window ? window.location.href : FRONTEND_ROOT_URL) })}} >

                <Image style={{margin: '1rem', borderRadius: '5px'}} width="35" height="35" src="/facebook_logo.png" />
                <p style={{margin :'0', marginLeft: '1rem', width: '100%', textAlign: 'center', letterSpacing: '1px'}}>CONNECT VIA FACEBOOK</p>
            </SocialLoginButton>
          {/* </Tooltip> */}

        </Stack>

        <p style={{fontFamily: 'Poppins', width: '100%', textAlign: 'center', opacity: '0.9'}}>Don&apos;t have a Profile? <Link href={`${FRONTEND_ROOT_URL}create/account/`}><a style={{color: '#4D77FF', textDecoration :'underline'}}>create one</a></Link></p>

        <center style={{height: '100%',  display: 'grid',placeItems: 'center'}}>
        <ToggleButtonGroup
            color="primary"
            value={theme.palette.mode}
            exclusive
            // style={{alignContent:}}
            onChange={colorMode.toggleColorMode}
        >
            <ToggleButton value="light"><LightMode /> &nbsp;&nbsp;Light</ToggleButton>
            <ToggleButton value="dark"><DarkMode/>&nbsp;&nbsp;Dark</ToggleButton>

        </ToggleButtonGroup>
    </center>


      </Stack>
  )
}

export default LoginDrawerContent