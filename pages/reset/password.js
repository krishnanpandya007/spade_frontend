import { LoadingButton } from '@mui/lab';
import { Alert, Button, FormControl, Input, TextField } from '@mui/material'
import React, { useContext, useRef } from 'react'
import BasicContainer from '../../components/basic/BasicContainer'
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import StaticHeader from '../../components/basic/StaticHeader'
import { FRONTEND_ROOT_URL } from '../../config';

function ResetPassword() {

    const [success, setSuccess] = React.useState(false);
    const[loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState('');

    const sendResetLink = async (e) => {
        e.preventDefault()
        setLoading(true);

        const response = await fetch(`${FRONTEND_ROOT_URL}api/reset_password/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email
            })
        }).catch(err => {alert("Something went wrong")})


        if(response.status === 200){
            //Success
            setSuccess(true)

        }else{

            setSuccess(false)
            alert("Error, while sending password reset link.")
        }

        setLoading(false)

    }

  return (
    <React.Fragment>
        <StaticHeader />
        <BasicContainer>
            <h2>Reset Password</h2>
            <h4>Type the associated email below.</h4>
            <form onSubmit={sendResetLink}>
            <TextField required placeholder="johndoe@abc.co" type="email" value={email} onChange={(e) => {setEmail(curr => e.target.value)}} ></TextField>
            <br />
            <br />

            <LoadingButton loading={loading} type="submit" variant="contained">Send Reset Link</LoadingButton>
            </form>
            <br />
            <br />
            {success ? <Alert severity="success" >Check your email for Password reset Link.</Alert> : null}
        </BasicContainer> 

    </React.Fragment>
  )
}

export default ResetPassword