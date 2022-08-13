import { Button, TextField } from '@mui/material'
import React, { useContext } from 'react'
import authContext from '../basic/contexts/layout_auth_context';
import edit_name from '../profile_edit_apis/edit_name';
import styles from './rules.module.css'


// Remaining to show pre-first_name and pre-last_name



export default function EditName({username, first_name, last_name, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [firstName, setFirstName] = React.useState(first_name);
  const [lastName, setLastName] = React.useState(last_name);

  const auth = useContext(authContext)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditName = async () => {

    // if (editedUsername !== username){


      // every edit_field have different urls to make change
      // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
      // It must have body[UPDATE req.]


        const response = await edit_name(firstName, lastName, username);


      if (response.status === 200){
        // Successfully Updated Username
        console.log("Updated Username")
        handleRaiseMessageOnSnackbar('success', "Your name has updated!")
      }else{
        handleRaiseMessageOnSnackbar('error', "Sorry, we are having trouble while updating your name")
      }


    // }

  }

  return (
    <div style={{ width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {!auth.is_on_mobile&&<h3>Edit Name</h3>}
    <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between'}}>
    <TextField placeholder="Krishnan" label="First Name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
    <TextField placeholder="Pandya" label="Last Name" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
    </div>
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>If there is a typo. you&apos;ve made you can correct it here</li>
        <li>We use your name for mentioning them in email (if subscribed)</li>

    </ul>

    <Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} onClick={handleEditName}>Apply Changes</Button>
</div>
  )
}
