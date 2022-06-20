import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import styles from './rules.module.css'
import edit_status from '../profile_edit_apis/edit_status';
export default function EditStatus({username, current_status, ParentSnackbarMessage, ParentSnackbarSeverity, parentOpenSnackBar}) {

  const [status, setStatus] = React.useState(current_status)

  const handleRaiseMessageOnSnackbar = (severity, message) => {

    ParentSnackbarMessage(message)

    ParentSnackbarSeverity(severity)

    parentOpenSnackBar(true);

  }

  const handleEditStatus = async () => {



    // every edit_field have different urls to make change
    // ex.. 127.0.0.1:8000/apio/edit/edit_profile/{edit_field}/
    // It must have body[UPDATE req.]


        const response = await edit_status(username, status);


      if (response.status === 200){
        // Successfully Updated Username
        console.log("Updated Username")
        handleRaiseMessageOnSnackbar('success', "Status Updated successfully!")
      }else{
        handleRaiseMessageOnSnackbar('error', "Can't able to update status.")
      }



  }

  return (
    <div style={{ width: '40%', padding: '0 3%', position: 'relative'}}>

    <h3>Change Status:</h3>
    <br />
    <br />

    {/* <TextField placeholder="krishnanpandya06@gmail.com" label="username" fullWidth/> */}
    <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{current_status}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Select"
          onChange={(e) => {setStatus(e.target.value)}}
        >
          <MenuItem value={"spading"}>Spading</MenuItem>
          <MenuItem value={"working"}>Working</MenuItem>
          <MenuItem value={"chilling"}>Chilling</MenuItem>
          <MenuItem value={"learning"}>Learning</MenuItem>
          <MenuItem value={"lazy"}>Lazy</MenuItem>

        </Select>
    </FormControl>
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>Status (in-text) shows your current action.</li>
        <li>Spading: is just a word saying you are on Spade web-site.</li>
    </ul>

    <Button variant="contained" style={{transform: 'scale(1.1)',position: 'absolute', bottom: '0', right: '0'}} onClick={handleEditStatus}>Apply Changes</Button>
</div>
  )
}
