import { LockOutlined, PersonOutlineRounded } from '@mui/icons-material'
import { Alert, Button, CircularProgress, circularProgressClasses, Divider, InputAdornment, Snackbar, TextField } from '@mui/material';

import { Stack } from '@mui/material'
import React from 'react'
import styles from './Login.module.css'

import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import login from '../components/basic/login';
import { useRouter } from 'next/router';
import Layout from '../components/basic/layout';
import { HttpsOutlined, PersonOutlineOutlined } from '@mui/icons-material';
import { FRONTEND_ROOT_URL } from '../config';


function FacebookCircularProgress(props) {

   
    return (
      <Box sx={{ position: 'relative',  marginRight: '3%',marginTop: '8%', marginBottom: '2%', }}>
        <CircularProgress
          variant="determinate"
          style={{color: grey[200]}}

          sx={{
            color: 'secondary',
          }}
          size={30}
          thickness={4}
          {...props}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
        //   color="secondary"
          style={{color: '#2979ff', margin: '2%'}}
          sx={{
            color: '#000000',
            animationDuration: '550ms',
            position: 'absolute',
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: 'round',
            },
          }}
          size={30}
          thickness={4}
          {...props}
        />
      </Box>
    );
  }



function Login() {

    const [errorData, setErrorData] = React.useState('');
    const [formError, setFormError] = React.useState('');

    const [loginData, setLoginData] = React.useState({username: null, password: null});

    const [isAuthenticating, setIsAuthenticating] = React.useState(false);

    const router = useRouter();

    const handleOnChange = (e, fieldName) => {
        setLoginData({...loginData, [fieldName]: e.target.value});
    }

    const handleOnSubmit = async () => {
        setIsAuthenticating(true);


          const response = await login(loginData.username, loginData.password);

        if (response.status === false){
            // Authentication Failed
            setFormError(true);
            setErrorData(response.message);

        } else {

        
            router.push('/')
            
        }
        setIsAuthenticating(false);
        
    }


  return (
    <div className={styles.main} style={{backgroundImage: `url(${FRONTEND_ROOT_URL}login_bg.jpg)`}}>
            <Snackbar open={formError} autoHideDuration={6000} onClose={() => {setFormError(false)}}>
                <Alert onClose={() => {setFormError(false)}}  severity="error" sx={{ width: '100%'}}>
                    {errorData}
                </Alert>
            </Snackbar>
        <form className={styles.main_form}>
            <h2>Login</h2>
            <div className={styles.main_form_input}>
                <div style={{display: 'grid', placeItems: 'center', marginLeft: '1rem'}}>
                    <PersonOutlineRounded style={{color: '#3A3845'}} />
                </div>
                <input type="text" placeholder="Username" onChange={(e) => {handleOnChange(e, 'username')}}/>
            </div>
            <div className={styles.main_form_input}>
            <div style={{display: 'grid', placeItems: 'center', marginLeft: '1rem'}}>

                <LockOutlined style={{color: '#3A3845'}} />

            </div>
                <input type="password" placeholder="Password" onChange={(e) => {handleOnChange(e, 'password')}}/>
            </div>
            <button onClick={(e) => {e.preventDefault();handleOnSubmit();}} type={"submit"}>{isAuthenticating ? <CircularProgress style={{color: 'white'}} /> : "Login"}</button>
            <p style={{marginTop: '0', fontFamily: 'Changa', fontWeight: '300', fontSize: '1rem'}}>Don&apos;t have a Profile? <a href={`${FRONTEND_ROOT_URL}create/account/`} style={{textDecoration: 'underline', color: '#5463FF'}}>create one</a></p>
        </form>
    </div>
  )
}

export default Login