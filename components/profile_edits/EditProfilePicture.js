import { Add, Delete } from '@mui/icons-material'
import { Avatar, Button, Divider, IconButton, Input, TextField, Tooltip } from '@mui/material'
import React from 'react'
import {FRONTEND_ROOT_URL } from '../../config'
import styles from './rules.module.css'
// import { Input } from '@material-ui/core'

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export default function EditProfilePicture({profile_pic, ParentSnackbarMessage, removeProfilePic,ParentSnackbarSeverity, parentOpenSnackBar}) {

    const [profilePicContent, setProfilePicContent] = React.useState(null);
    const [profilePicName, setProfilePicName] = React.useState(null);

    const handleRaiseMessageOnSnackbar = (severity, message) => {

        ParentSnackbarMessage(message)
    
        ParentSnackbarSeverity(severity)
    
        parentOpenSnackBar(true);
    
    }

    const RemoveProfilePic = async () => {

        const response = await fetch(`${FRONTEND_ROOT_URL}api/profile/delete/profile_pic`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })

        
        if (response.status === 204) {
            handleRaiseMessageOnSnackbar('success', "Successfully Removed profile pic!")
            removeProfilePic();
        }else{
            handleRaiseMessageOnSnackbar('error', "Can't able to remove profile pic.")
        }

    }

    const SubmitEditProfilePic = async () => {

        const form_data = new FormData();

        // console.log(csrf_cookie)

        form_data.append('profile_pic', profilePicContent, profilePicName);
        
        // axios.post('/api/profile/edit/profile_pic/', form_data)
        //                         .then((res)=> console.log(res))

            const response = await fetch(`${FRONTEND_ROOT_URL}api/profile/edit/profile_pic/`, {
                method: 'POST',
                headers: {
                    // 'content-type': 'multipart/form-data; boundary=98feb59a8abe4bfb95a7321f536ed800',
                    'Accept': 'application/json',
                     
                },
                body: form_data
            })

            if (response.status === 200) {
                handleRaiseMessageOnSnackbar('success', "Successfully updated your profile pic!")
            }else{
                handleRaiseMessageOnSnackbar('error', "Can't able to update profile pic.")
            }

    }

  return (
    <div style={{ width: '40%', padding: '0 3%', position: 'relative'}}>

    <h3>Edit Profile Pic.</h3>
    <br />
    <div style={{display: 'flex', alignItems: 'center', width: '30%',justifyContent: 'space-between'}}>
    <div style={{display: 'flex', width: '50%', justifyContent: 'space-between', alignItems: 'center'}}>
    <Avatar style={{transform: 'scale(1.25)'}} src={profile_pic} />
    <label htmlFor="contained-button-pic">
        <Input accept="image/*" style={{display: 'none'}} id="contained-button-pic" onChange={(e) => {setProfilePicContent(e.target.files[0]);setProfilePicName(e.target.files[0].name)}} multiple type="file" />

        <Tooltip title="Upload New">
            <IconButton variant="contained" component="span">
                <Add />
            </IconButton>
        </Tooltip>
    </label>
    </div>
    
    {/* <Divider variant="middle" orientation="vertical" />s */}

    <Tooltip title="Remove Profile Pic.">
        <IconButton onClick={RemoveProfilePic}>
            <Delete />
        </IconButton>
    </Tooltip>
    </div>
    <h4 style={{marginTop: '10%'}}>Note:</h4>
    <ul className={styles.UL}>
        <li>{profile_pic}</li>
        <li>Anyone can see your profile pic. as its public</li>
        <li>If your profile picture is not attached, we show your name initials as profile pic (when required).</li>

    </ul>

    <Button variant="contained" style={{transform: 'scale(1.1)',position: 'absolute', bottom: '0', right: '0'}} onClick={SubmitEditProfilePic}>Apply Changes</Button>
</div>
  )
}
