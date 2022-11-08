// Register a new user

// import { Button, Divider, InputAdornment, Snackbar, TextField } from "@material-ui/core"


import {Snackbar} from '@mui/material'


// Box


import React, { useEffect } from "react";
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../../config";
import { Alert } from "@mui/material";
import CreateAccount from "../../components/CreateAccount";
import Head from "next/head";
import StaticHeader from '../../components/basic/StaticHeader'

import {useRouter} from 'next/router'
// import TodayOverview from '../../components/basic/TodayOverview';
// import Script from 'next/script';



function assertBasicRules(form_data){

  let error = true, message = ""

  for(const key in form_data){

    if(form_data[key] === ''){
      message = `Please provide ${key.replace("_", " ")}`
      return { error, message }
    }

  }
  if(form_data['password']?.length < 8){
    message = "Password must be atleast 8 char(s) long"
    return { error, message }

  }
  if(form_data['password'] !== form_data['re_password']){
    message = "Passwords do not match!"
    return { error, message }
  }

  return { error: false, message: null }


}



function Account() {

    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({first_name: '', last_name: '', email: '', password: '', re_password: '', username: '', status: 'working', statusIndicator: 'available'});
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

        const {error, message} = assertBasicRules(formData);

        if(error){
          setErrorData(message)
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


    


    return (<>
        
        <Layout title="Create Profile | Spade">

            <Snackbar open={formError} autoHideDuration={6000} onClose={() => {setFormError(false)}}>
                <Alert onClose={() => {setFormError(false)}}  severity="error" sx={{ width: '100%'}}>
                    {errorData}
                </Alert>
            </Snackbar>
        <CreateAccount handleFormError={setFormError} handleErrorData={setErrorData} data={formData} t_and_c_ref={terms_and_condi_agree_ref} handleOnChange={handleOnChange} handleSubmit={handleSubmit} loading={isSubmitting} setLoading={setIsSubmitting} profileCreated={profileCreated} />
        </Layout>
 
    
    </>
    )
}

export default Account
