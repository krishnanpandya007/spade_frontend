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
import StaticHeader from '../../components/basic/StaticHeader'

import {useRouter} from 'next/router'







function Account() {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({first_name: null, last_name: null, email: null, password: null, re_password: null, username: null});
    const [formError, setFormError] = React.useState(false);
    const [errorData, setErrorData] = React.useState(null);
    const terms_and_condi_agree_ref = React.useRef()

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

        // alert(terms_and_condi_agree_ref.current.checked)

        if(!(terms_and_condi_agree_ref.current.checked)){
          setErrorData("Please agree terms and conditions!")
          setFormError(true)
          setIsSubmitting(false)

          return;
        }

            const res = await fetch(`${FRONTEND_ROOT_URL}api/create/account/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

        alert(res.status)
        if (res.status === 200) {

          setProfileCreated(true)
          // Self Login
          router.push('/')
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
          <StaticHeader />
            <Snackbar open={formError} autoHideDuration={6000} onClose={() => {setFormError(false)}}>
                <Alert onClose={() => {setFormError(false)}}  severity="error" sx={{ width: '100%'}}>
                    {errorData}
                </Alert>
            </Snackbar>

        <CreateAccount t_and_c_ref={terms_and_condi_agree_ref} handleOnChange={handleOnChange} handleSubmit={handleSubmit} loading={isSubmitting} setLoading={setIsSubmitting} profileCreated={profileCreated} />
    </div>
    )
}

export default Account
