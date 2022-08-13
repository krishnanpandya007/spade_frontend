import React, { useContext } from 'react'
import { Button, TextField } from "@mui/material";

import styles from './rules.module.css'
import edit_email, {send_verification_code, verify_verification_code} from '../profile_edit_apis/edit_email';
import authContext from '../basic/contexts/layout_auth_context';
export default function EditEmail({username, current_email, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [email, setEmail] = React.useState(current_email);
  const [actionButtonText, setActionButtonText] = React.useState('Verify Email')
  const [verifyView, setVerifyView] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');

  const auth = useContext(authContext)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  // 1. Click verify
  // 2. enable verify view
  // 3. confirm

  const enableVerifyView = async () => {

      setActionButtonText('loading...')

      const response = await send_verification_code(email);
    
      if(response.status === 200) {

        setVerifyView(true)
        setActionButtonText('Submit')
        handleRaiseMessageOnSnackbar('success', "Verification code Sent Successfull!")


      }else{
        handleRaiseMessageOnSnackbar('error', "Can't able to send verification code to given email")
        setActionButtonText('Verify Email')
      }



  }

  const disableVerifyView = async () => {

    const response = await verify_verification_code(username, email, verificationCode);

    const message = await response.json();

    if(response.status === 200 && message.success) {

      handleRaiseMessageOnSnackbar('success', message.success)

      // setVerifyView(true)
      setActionButtonText('Verify Email')

      setVerifyView(false)


    }else{
      handleRaiseMessageOnSnackbar('error', message.error)

      setActionButtonText('Submit')
    }

  }

  const handleEditEmail = async () => {

    


    // every edit_field have different urls to make change
    // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
    // It must have body[UPDATE req.]


        const response = await edit_email(username, email);
      

      if (response.status === 200){
        // Successfully Updated Username
        // console.log("Updated Username")
        handleRaiseMessageOnSnackbar('success', 'Email Reset Successfully')
      }else {
        handleRaiseMessageOnSnackbar('error', 'Email Reset Failed')

      }



  }

  return (
    <div style={{ width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {!auth.is_on_mobile && <h3>Edit Email</h3>}
    <TextField disabled={verifyView} placeholder="krishnanpandya06@gmail.com" label="Email" fullWidth value={email} onChange={(e) => {setEmail(e.target.value)}}/>
    {
      verifyView ? 
        <>
          <br />
          <br />
          <h4>Enter Verification Code we&apos;ve sent on your e-mail</h4>
          <br />
          <TextField placeholder="Verification Code" fullWidth value={verificationCode} onChange={(e) => {setVerificationCode(e.target.value)}}/>

        </>:null
    }
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>We sent all related updates to associated email with your account</li>
        <li>We&apos;ll notify you on events, special-occasions, through e-address</li>
        <li>Usefull for password recovery</li>
    </ul>

    <Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} disabled={actionButtonText === 'loading...'} onClick={verifyView ? disableVerifyView : enableVerifyView}>{actionButtonText}</Button>
</div>
  )
}
