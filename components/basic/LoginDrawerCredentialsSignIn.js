import React, { useContext, useMemo } from 'react'
import styled from '@emotion/styled'
import { IconButton, Stack } from '@mui/material'
import Link from 'next/link'
import { LoadingButton } from '@mui/lab'
import { signIn, useSession } from 'next-auth/react'
import { FRONTEND_ROOT_URL } from '../../config'
import { blue, green } from '@mui/material/colors'
import login from './apis/drawer_credentials_login'
import { DoneOutlined, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material'
import authContext from './contexts/layout_auth_context'
import getUserInfo from './get_user_info'

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
  position: relative;

  &::placeholder{

    font-family: Poppins

  }

`

function LoginDrawerCredentialsSignIn() {

    const [loading, setLoading] = React.useState(false);

    const auth = useContext(authContext);

    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false);

    const [successfullLogin, setSuccessfullLogin] = React.useState(false)

    
    const handleUsernameChange = React.useCallback((e) => {
        setUsername(e.target.value)
    }, [username])
    
    const handlePasswordChange = React.useCallback((e) => {
        setPassword(e.target.value)
    }, [password])
    
    const handleLogin = async () => {

      setLoading(true);

        const success = await login(username, password);
        console.log("Done")


        if (success) {


            /*
            NOTE: FROM BACKEND WE MUST GET USERNAME, ID, EMAIL, PROFILE_PIC_URL
            */

            const user_data = await getUserInfo();

            console.log("User Data [RECV.] = ", user_data)

            const username = user_data.data.username;
            const profile_pic = user_data.data.profile_pic;
            const first_name = user_data.data.first_name;
            const last_name = user_data.data.last_name;
            
            
            auth.set_user_data(username, profile_pic, first_name, last_name)
            console.log("Manual: ",  auth.user_data)

          auth.authenticate();
          setSuccessfullLogin(true);
          // Fetch primary user Data
            // alert("Logged In Successfully")
        }else{
          alert("Trouble while `Log In`")
        }
      setLoading(false);

    }
    
  return (

    <React.Fragment>
          {/* {status === "authenticated" && <h5>User Authenticated: {JSON.stringify(session)}</h5>} */}
            <StyledInput type="text" onChange={handleUsernameChange} placeholder="Username"  />
            <StyledInput value={password} onChange={handlePasswordChange} type={!showPassword ? "password" : "text"} placeholder="Password"  /><IconButton size="small" style={{position: 'absolute', right: '0', transform: 'translate(-100%, 40%)'}} onClick={() => {setShowPassword(prevState => !prevState)}}>{showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}</IconButton>
            <Stack
                direction="row"
                alignItems="baseline"
                justifyContent="space-between"
                
                spacing={0}
                width="100%"
                style={{margin: '0.4rem 1rem'}}
            >

                <Link href={`${FRONTEND_ROOT_URL}reset/password`}><a style={{marginLeft: '15px', fontFamily: 'Poppins', color: '#4D77FF'}}>Forgot Password?</a></Link>
                {/* <LoginButton>Login</LoginButton> */}
                <LoadingButton 
                  loading={loading}
                  // disabled={!successfullLogin}
                  variant="contained"
                  
                  sx={{borderRadius: '8px', width: '25%', backgroundColor: successfullLogin ? green[400] :blue[500], letterSpacing: '1px'}}
                  disableElevation
                  size="large"  
                  onClick={() => {!successfullLogin ? handleLogin() : null}}
                >
                  { successfullLogin ? <DoneOutlined color="white" /> : "Login"}
                </LoadingButton>
                {/* <CircularProgress style={{marginTop: '0.5rem'}} /> */}
            </Stack>

    </React.Fragment>

  )
}

export default LoginDrawerCredentialsSignIn