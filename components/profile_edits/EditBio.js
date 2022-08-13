import React, { useContext } from 'react'
import { Button, TextField } from "@mui/material";

import styles from './rules.module.css'
import edit_bio from '../profile_edit_apis/edit_bio';
import authContext from '../basic/contexts/layout_auth_context';

export default function EditBio({username, current_bio, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [bio, setBio] = React.useState(current_bio);

  const auth = useContext(authContext)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditBio = async () => {



    // every edit_field have different urls to make change
    // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
    // It must have body[UPDATE req.]


        const response = await edit_bio(username, bio);


      if (response.status === 200){
        // Successfully Updated Username
        // console.log("Updated Bio")
        handleRaiseMessageOnSnackbar('success', "Bio. is updated!")
      }else{
        handleRaiseMessageOnSnackbar('error', "Bio. Updated Successfully!")

      }



  }

  return (
    <div style={{ width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {!auth.is_on_mobile && <h3>Edit Bio.</h3>}
    <textarea name="bio" placeholder="Type in your inner person, Shortly" id="" cols="40" rows="10" value={bio} onChange={(e) => {setBio(e.target.value)}}></textarea>
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>Represents your Skills | achievements | Goals | Passion on your profile</li>
        {/* <li>Underscore and dot can't be at the end or start of a username (e.g _username / username_ / .username / username.). </li> */}
        {/* <li>Underscore and dot can't be next to each other (e.g user_.name).</li> */}
        {/* <li>Underscore or dot can't be used multiple times in a row (e.g user__name / user..name).</li> */}
        {/* <li>Number of characters must be between 8 to 20.</li> */}
    </ul>

    <Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} onClick={handleEditBio}>Apply Changes</Button>
</div>
  )
}
