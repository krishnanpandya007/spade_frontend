import { LoadingButton } from '@mui/lab';
import { TextField } from '@mui/material';
import Error from 'next/error';
import React, { useContext, useState } from 'react'
import BasicContainer from '../../components/basic/BasicContainer';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import StaticHeader from '../../components/basic/StaticHeader';
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config';

function ResetPassowordConfirm(props) {

    const [password, setPassword] = useState({new_password: '', re_new_password: ''})
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const snackbar = useContext(SnackbarContext);

    const resetNewPassword = async (e) => {

        e.preventDefault()
        setLoading(true)

        if(password.new_password !== password.re_new_password){
            snackbar.open('error', "provided Passwords doesn't match")
            return;
        }

        if(password.new_password.length < 6 || password.re_new_password.length < 6){

            snackbar.open('error', "Password must be at least 6 characters long. (Security)")


        }

        const response = await fetch(`${FRONTEND_ROOT_URL}api/reset_password_by_email/`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify({
                auth_token: props.auth_token,
                new_password: password.new_password,
                re_new_password: password.re_new_password                
            })
        }).catch( err => console.log("Something went wrong") )

        if(response.status === 200){

            setSuccess(true)

        }else{
            setSuccess(false)
            snackbar.open('error', "Can't reset given Password")

        }

        setLoading(false)

    }

  return (
    <div>
        <StaticHeader />
        {
            success?
            <center><h2>Password reset Successfull.</h2></center>:
            <BasicContainer>
                <form onSubmit={resetNewPassword}>
                    <TextField required label="New Password" type="password"  value={password.new_password} onChange={(e) => {setPassword({...password, new_password: e.target.value})}} />
                    <br />
                    <br />

                    <TextField required label="Re-type new Password" type="password" value={password.re_new_password} onChange={(e) => {setPassword({...password, re_new_password: e.target.value})}} />
                    <br />
                    <br />
                    <br />
                    
                    <LoadingButton loading={loading} type="submit" variant="contained">Reset Password</LoadingButton>
                    <br />
                    <br />
                
                </form>
            </BasicContainer>
        }
    </div>
  )
}

export async function getServerSideProps(context){

    const auth_token  = context.query['auth-token'];

    // Validate Auth token 
    const response = await fetch(`${BACKEND_ROOT_URL}account/confirm/auth-token/${auth_token}`)

    if(response.status === 200){
        return {
            props: {
                auth_token: auth_token,
                errCode: false
            }
        }

    } else{
        return {
            notFound :true
        }
    }


}

export default ResetPassowordConfirm