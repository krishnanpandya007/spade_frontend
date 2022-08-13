import { Alert, Divider, MenuItem, Select, Snackbar, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, {useContext, useEffect} from 'react'
import Layout from './basic/layout'
import EditBio from './profile_edits/EditBio';
import EditEmail from './profile_edits/EditEmail';
import EditName from './profile_edits/EditName';
import EditProfilePicture from './profile_edits/EditProfilePicture';
import EditResetPassword from './profile_edits/EditResetPassword';
import EditStatus from './profile_edits/EditStatus';
import EditStatusIndicator from './profile_edits/EditStatusIndicator';
import EditUsername from './profile_edits/EditUsername';
// import { defaultBorderColor } from '../../config';

import { BACKEND_ROOT_URL, defaultBorderColor } from '../config';
import getUserInfo from './basic/get_user_info';
import SpadeLoader from './basic/SpadeLoader';
import EditCustomization from './profile_edits/EditCustomization';
import authContext from './basic/contexts/layout_auth_context';

export default function EditProfile({userInfo, isAuthenticated}) {

    const [actionValue, setActionValue] = React.useState("username");
    const [userData, setUserData] = React.useState(userInfo);
    const [isLoading, setIsLoading] = React.useState(false);
    const auth = useContext(authContext)
    // Snack bar constants

    const [message, setMessage] = React.useState('');
    const [openSnackbar, SetOpensnackbar] = React.useState(false);
    const [severity, setSeverity] = React.useState(''); //[success, error, warning, info]

    // Format
    /*
    
    username: jevik_pandya
    first_name: Jevik, last_name: Pandya,
    email: jevikpandya@gmail.com,
    status: Learning
    status_indicator: Away
    bio: chill the lives around you!
    profile_pic: 'http://127.0.0.1:8000/media/profile_pic/jevikd23r2.jpeg'
    

    Send this same format from backend

    */
    // useEffect(() => {
    //   console.log(userData)
    // }, [])

    useEffect( async () => {
        // Get all initial Data to show in place of placeholders
        const user_info = await getUserInfo();
        setUserData(user_info.data);
        setIsLoading(false)
        // console.log("LOGGER: ", user_info.data)
        setIsLoading(false)
    }, [])
    const componentIndicators = {
        "username": <EditUsername username={userData.username} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "name": <EditName username={userData.username} first_name={userData.first_name} last_name={userData.last_name} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "profile_pic": <EditProfilePicture profile_pic={userData.profile_pic} removeProfilePic={() => {setUserData({...userData, profile_pic: null})}} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "email": <EditEmail username={userData.username} current_email={userData.email} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar}/>,
        "status": <EditStatus username={userData.username} current_status={userData.status} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar}/>,
        "status_indicator": <EditStatusIndicator username={userData.username} current_status_indicator={userData.status_indicator} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "bio": <EditBio username={userData.username} current_bio={userData.bio} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "reset_password": <EditResetPassword username={userData.username} ParentSnackbarMessage={setMessage} ParentSnackbarSeverity={setSeverity} parentOpenSnackBar={SetOpensnackbar} />,
        "customization": <EditCustomization />
      }

  return (
      
        isLoading ? <SpadeLoader is_loading={isLoading} /> : auth.is_on_mobile ? 
        <React.Fragment>
          <center style={{backgroundColor: "#C4C4C4"}}><p style={{padding: '0.3rem', fontFamily: 'Poppins'}}>Edit {actionValue[0].toUpperCase()+actionValue.slice(1).replace('_', ' ')}</p></center>
          <br/>
          <center>
            <p style={{textAlign: 'left', width: '80%', marginBlockEnd: '0', fontSize: '0.9rem', color: '#979797'}}>Select a field to Edit.</p>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={actionValue}
          variant="standard"
          style={{width: '80vw', textAlign: 'left'}}
          onChange={(e)=>{setActionValue(e.target.value)}}
          >
            <center><b style={{color: 'grey'}}>Personal Information</b></center>
            <Divider variant="middle"/>
                <MenuItem  value={"username"}>Username</MenuItem>
                <MenuItem value={"name"}>Name</MenuItem>
                <MenuItem value={"profile_pic"}>Profile Pic.</MenuItem>
                <MenuItem value={"email"}>Email</MenuItem>
                <br/>

            <center><b style={{color: 'grey'}}>Profile</b></center>
            <Divider variant="middle"/>
                <MenuItem  value={"status_indicator"}>Status Indicator</MenuItem>
                <MenuItem value={"status"}>Status</MenuItem>
                <MenuItem value={"bio"}>Bio</MenuItem>
                <br/>

            <center><b style={{color: 'grey'}}>Security</b></center>
            <Divider variant="middle"/>
                <MenuItem  value={"reset_password"}>Reset Password</MenuItem>
                <br/>

            <center><b style={{color: 'grey'}}>Prefrences</b></center>
            <Divider variant="middle"/>
                <MenuItem  value={"customization"}>Customization</MenuItem>




        </Select>
        </center>
        {/* CONTENT_BLOCK START */}
        <br/>
        <br/>

        <Divider />
        <br/>
        <Divider />
        <br/>



        {Object.keys(componentIndicators).includes(actionValue) ? <div style={{display: 'grid', placeItems: 'center', marginTop: '2rem'}}>{componentIndicators[actionValue]}</div> : 
            
            <div style={{ display: 'grid', placeItems: 'center',width: '40%', padding: '0 3%', position: 'relative'}}>
               <h3>Select a Field to Edit.</h3>
              </div>
            
          }

        
        {/* CONTENT_BLOCK END */}

        </React.Fragment>
        
        :
        
        <div style={{paddingTop: '2.5%', justifyContent: 'center',width :'100vw', display: 'flex', flexDirection: 'row'}}>
         
         <Snackbar 
          open={openSnackbar}
      
          >

            <Alert onClose={() => {SetOpensnackbar(false)}} severity={severity}>{message}</Alert>

          </Snackbar>

      

        <div style={{padding: '0 3%', borderRight: '1px solid '+defaultBorderColor}}>
          <h2>Personal Information</h2>
          <ToggleButtonGroup
            orientation="vertical"
            value={actionValue}
            exclusive
            onChange={(e, nextValue) => {setActionValue(nextValue)}}
            >
            <ToggleButton value="username" aria-label="list">
              Username
            </ToggleButton>
            <ToggleButton value="name" aria-label="module">
            Your Name
              {/* <ViewModuleIcon /> */}
            </ToggleButton>
            <ToggleButton value="profile_pic" aria-label="quilt">
            Profile Picture.
              {/* <ViewQuiltIcon /> */}
            </ToggleButton>
            <ToggleButton value="email" aria-label="quilt">
            Email
              {/* <ViewQuiltIcon /> */}
            </ToggleButton>
          </ToggleButtonGroup>



          <h2 style={{marginTop: '2rem'}}>Profile</h2>
              <ToggleButtonGroup
            orientation="vertical"
            value={actionValue}
            exclusive
            onChange={(e, newValue) => {setActionValue(newValue)}}
            >
            <ToggleButton value="status_indicator" aria-label="list" >
              Status Indicator
            </ToggleButton>
            <ToggleButton value="status" aria-label="module">
            Status 
              {/* <ViewModuleIcon /> */}
            </ToggleButton>
            <ToggleButton value="bio" aria-label="quilt">
            Bio.
              {/* <ViewQuiltIcon /> */}
            </ToggleButton>
              </ToggleButtonGroup>



          <h2 style={{marginTop: '2rem'}}>Security</h2>
          <ToggleButtonGroup
            orientation="vertical"
            value={actionValue}
            exclusive
            onChange={(e, newValue) => {setActionValue(newValue)}}
            >
            <ToggleButton value="reset_password" aria-label="list">
              Reset Password
            </ToggleButton>

          </ToggleButtonGroup>
          <br />
          <br />
          <br />

            <ToggleButton value="customization" aria-label="module" onClick={() => {setActionValue("customization")}}>
            Customization 
              {/* <ViewModuleIcon /> */}
            </ToggleButton>
        </div>
          {/* <h2 style={{marginTop: '2rem'}}>Personalization</h2> */}
                {/* <ToggleButtonGroup
              orientation="vertical"
              value={actionValue}
              exclusive
              onChange={(e, newValue) => {setActionValue(newValue)}}
              > */}

                {/* </ToggleButtonGroup> */}
          
            {Object.keys(componentIndicators).includes(actionValue) ? componentIndicators[actionValue] : 
            
              <div style={{ display: 'grid', placeItems: 'center',width: '40%', padding: '0 3%', position: 'relative'}}>
                 <h3>Select a Field to Edit.</h3>
                </div>
              
            }
    </div>
    
    )
  }
