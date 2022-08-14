import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import edit_username from "../profile_edit_apis/edit_username";
import authContext from '../basic/contexts/layout_auth_context';

import styles from './rules.module.css'

export default function EditUsername({styl,username, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [editedUsername, SetEditedUsername] = useState(username);

  const auth = useContext(authContext)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditUsername = async () => {

    if (editedUsername !== username){


      // every edit_field have different urls to make change
      // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
      // It must have body[UPDATE req.]


          const response = await edit_username(username, editedUsername);

        if (response.status === 200){
          // Successfully Updated Username
          console.log("Updated Username")
          handleRaiseMessageOnSnackbar('success', 'Username Updated!')
        }else{
          handleRaiseMessageOnSnackbar('error', "Sorry, we're having trouble while renaming username")
        }


    }

  }

  return (
    <div style={{ width: auth.is_on_mobile ? '100%' : '50%', padding: '0 3%', position: 'relative', ...styl}}>

        {!auth.is_on_mobile && <h3>Edit Username</h3>}
        <TextField placeholder="krishnan_pandya" onChange={(e) => {SetEditedUsername(e.target.value)}} value={editedUsername}  label="username"/>
        <h4 style={{marginTop: '10%'}}>Rules:</h4>
        <ul className={styles.UL}>
            <li>Only contains alphanumeric characters, underscore and dot.</li>
            <li>Underscore and dot can&apos;t be at the end or start of a username (e.g _username / username_ / .username / username.). </li>
            <li>Underscore and dot can&apos;t be next to each other (e.g user_.name).</li>
            <li>Underscore or dot can&apos;t be used multiple times in a row (e.g user__name / user..name).</li>
            <li>Number of characters must be between 8 to 20.</li>
        </ul>

        <Button onClick={handleEditUsername} variant="contained" style={{transform: 'scale(1)',position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius: '200px'}}>Apply Changes</Button>
    </div>

  )
}
