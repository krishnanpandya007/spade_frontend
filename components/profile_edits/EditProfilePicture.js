import { Add, Delete, Edit } from '@mui/icons-material'
import { Avatar, Button, Divider, IconButton, Input, TextField, Tooltip } from '@mui/material'
import React, { useContext } from 'react'
import {FRONTEND_ROOT_URL } from '../../config'
import authContext from '../basic/contexts/layout_auth_context'
import styles from './rules.module.css'
// import { Input } from '@material-ui/core'


export default function EditProfilePicture({profile_pic, ParentSnackbarMessage, removeProfilePic,ParentSnackbarSeverity, parentOpenSnackBar}) {

    const [profilePicContent, setProfilePicContent] = React.useState(null);
    const [profilePicName, setProfilePicName] = React.useState(null);

    const auth = useContext(authContext)

    const [url, setUrl] = React.useState(null);

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

        if(url){
            const response = await fetch(`${FRONTEND_ROOT_URL}api/profile/edit/profile_pic_url/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    edit_url: url
                })
            })

            // const dataj = await response.json();

            if(response.status !== 204){
                // Cant update profile pic url
                handleRaiseMessageOnSnackbar('error', "Can't able to update profile pic. (URL)")

            }
            handleRaiseMessageOnSnackbar('success', "Successfully updated your profile pic (URL)")

            return
        }

        const form_data = new FormData();

        // console.log(csrf_cookie)

        form_data.append('profile_pic', profilePicContent, profilePicName);
        
        // axios.post('/api/profile/edit/profile_pic/', form_data)
        //                         .then((res)=> console.log(res))
        try{
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

        } catch (e) {

            console.log("Attac:", e)

        }

    }

  return (
    <div style={{ width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {!auth.is_on_mobile && <h3>Edit Profile Pic.</h3>}
    <br />
    <div style={{display: 'flex', alignItems: 'center', width: '100%',justifyContent: 'center'}}>
    <div style={{display: 'flex', width: '30%', justifyContent: 'space-between', alignItems: 'center'}}>
    <Avatar style={{transform: 'scale(1.25)'}} src={profile_pic} />
    <label htmlFor="contained-button-pic">
        <Input accept="image/*" style={{display: 'none'}} id="contained-button-pic" onChange={(e) => {setProfilePicContent(e.target.files[0]);setProfilePicName(e.target.files[0].name)}} multiple type="file" />

        <Tooltip title="Upload New">
            <IconButton variant="contained" component="span">
                <Edit />
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
    <br />
    <br />

    <Divider>or</Divider>
    <h4>Provide URL:</h4>
    <TextField placeholder="URL for profile pic." variant="outlined" fullWidth type="url" value={url} onChange={(e) => {setUrl(e.target.value)}}/>
    <h4 style={{marginTop: '10%'}}>Note:</h4>
    <ul className={styles.UL}>
        {/* <li>{profile_pic}</li> */}
        <li>Anyone can see your profile pic. as its public</li>
        <li>If your profile picture is not attached, we show your name initials as profile pic (when required).</li>

    </ul>

    <Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} onClick={SubmitEditProfilePic}>Apply Changes</Button>
</div>
  )
}
