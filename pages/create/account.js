// Register a new user

// import { Button, Divider, InputAdornment, Snackbar, TextField } from "@material-ui/core"

import { EmailOutlined, HttpOutlined, HttpsOutlined, PersonOutlineOutlined } from "@mui/icons-material"

import { Button, Divider, InputAdornment, Snackbar, TextField} from '@mui/material'

import { grey } from '@mui/material/colors';

// Box

import CircularProgress, {
    circularProgressClasses,
  } from '@mui/material/CircularProgress';
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../../config";
import { Alert } from "@mui/material";
import CreateAccount from "../../components/CreateAccount";
import Head from "next/head";

import {useRouter} from 'next/router'

// Inspired by the former Facebook spinners.
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






function Account() {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({first_name: null, last_name: null, email: null, password: null, re_password: null, username: null});
    const [formError, setFormError] = React.useState(false);
    const [errorData, setErrorData] = React.useState(null);

    const[profileCreated, setProfileCreated] = React.useState(false);

    const handleOnChange = (e, nameOfField) => {
        setFormData({...formData, [nameOfField]: e.target.value})
    }

    const router = useRouter();

    const handleSubmit = async () => {
      if(isSubmitting || profileCreated){
        return;
      }
        setIsSubmitting(true);

  

            const res = await fetch(`${FRONTEND_ROOT_URL}api/create/account/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();


        if (res.status === 201) {

          setProfileCreated(true)
          router.push('/login')

        }else{
            // console.log(data);

            setErrorData(data.error)
            setFormError(true)

        }

        // setTimeout(() => {

        setIsSubmitting(false)
            
        // }, 1000)



    }


    


    return (<div>

        <Head>
          <title>Create Profile | Spade</title>
        </Head>

            <Snackbar open={formError} autoHideDuration={6000} onClose={() => {setFormError(false)}}>
                <Alert onClose={() => {setFormError(false)}}  severity="error" sx={{ width: '100%'}}>
                    {errorData}
                </Alert>
            </Snackbar>

        <CreateAccount handleOnChange={handleOnChange} handleSubmit={handleSubmit} loading={isSubmitting} setLoading={setIsSubmitting} profileCreated={profileCreated} />
    </div>
    )
}

export default Account
