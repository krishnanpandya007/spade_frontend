import React from 'react'
import { Alert, Button, Snackbar, TextField } from "@mui/material";



import styles from './rules.module.css'
import edit_reset_password from '../profile_edit_apis/edit_reset_password';
export default function EditResetPassword({username, parentOpenSnackBar, ParentSnackbarMessage, ParentSnackbarSeverity}) {

  const [oldPassword, setOldPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [newPasswordAgain, setNewPasswordAgain] = React.useState('')


  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditResetPassword = async () => {

 


    // every edit_field have different urls to make change
    // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
    // It must have body[UPDATE req.]

      if(newPassword !== newPasswordAgain){
        // setSnackBarMessage('New Passwords do not match!')
        // setSeverity('error')
        // setOpenSnackBar(true);

        handleRaiseMessageOnSnackbar('error' ,'New Passwords do not match!')

        return;
      }

      if(newPassword.length < 6){
        // setSnackBarMessage('New Password is too short | length must be 6 or above')
        // setSeverity('warning')
        // setOpenSnackBar(true);

        handleRaiseMessageOnSnackbar('warning', 'New Password is too short | length must be 6 or above')

        return;

      }

      const success = await edit_reset_password(username, oldPassword, newPassword);

      if (success){
        // Successfully Updated Username
        // console.log("Updated Username")
        // setSnackBarMessage('Password Reset SuccessFull')
        // setSeverity('success')
        // setOpenSnackBar(true);

        handleRaiseMessageOnSnackbar('success', 'Password reset Successfull!')
        

        setOldPassword('')
        setNewPasswordAgain('')
        setNewPassword('')
      }else{
        // setSnackBarMessage('Old Password Doesn\'t match!')
        // setSeverity('error')
        // setOpenSnackBar(true);

        handleRaiseMessageOnSnackbar('error', 'Old Password Doesn\'t match!')


      }



  }

  return (
    <div style={{ width: '40%', padding: '0 3%', position: 'relative'}}>


    <h3>Reset Password:</h3>
    <TextField type="password" label="Old Password" value={oldPassword} onChange={(e) => {setOldPassword(e.target.value)}}/>
    <br/>
    <br/>
    <br/>

    <TextField style={{marginRight: '1rem'}} type="password" label="New Password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
    {/* <br /> */}
    <TextField type="password" label="Retype New Password" value={newPasswordAgain} onChange={(e) => {setNewPasswordAgain(e.target.value)}}/>


    <h4 style={{marginTop: '10%'}}>Rules:</h4>
    <ul className={styles.UL}>
        <li>Needs to be atleast 6 characters long</li>
    </ul>

    <Button variant="contained" style={{transform: 'scale(1.1)',position: 'absolute', bottom: '0', right: '0'}} onClick={handleEditResetPassword}>Reset Password</Button>
</div>
  )
}
