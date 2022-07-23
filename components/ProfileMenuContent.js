import { Add, Logout, Notifications, Person, Settings } from '@mui/icons-material'
import { Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FRONTEND_ROOT_URL } from '../config'
import authContext from './basic/contexts/layout_auth_context'
import SnackbarContext from './basic/contexts/snackbar_context'
import logout from './basic/logout'




function ProfileMenuContent() {

    const auth = useContext(authContext)
    const snackbar = useContext(SnackbarContext);

    const options = [
        {
            title: "Publish New",
            icon: <Add />,
            activation_url: `${FRONTEND_ROOT_URL}create/post`
        },
        {
            title: "View Profile",
            icon: <Person />,
            activation_url: `${FRONTEND_ROOT_URL}view_profile/${auth.user_data?.username}`
        },
        {
            title: "Settings",
            icon: <Settings />,
            activation_url: `${FRONTEND_ROOT_URL}profile/edit`
        },
        {
            title: "Notifications",
            icon: <Notifications />,
            activation_url: `${FRONTEND_ROOT_URL}profile/notifications`
        },
    
    
    ]

    const handleLogout = async () => {

        await logout();
        snackbar.open('success', "Logged out!")
        window.location.href = FRONTEND_ROOT_URL 

    }

    const current_url = window ? window.location.href : ''

  return (
      <>
        <div style={{display: 'flex', justifyContent: 'flex-start', padding: '5%', alignItems: 'center', width: auth.is_on_mobile ? '30vh' : '15vw'}}>
            
            <Avatar src={auth.user_data?.profile_pic} color="primary">{auth.user_data.first_name && auth.user_data.last_name ? auth.user_data.first_name[0].toUpperCase() + auth.user_data.last_name[0].toUpperCase() : auth.user_data.username?.slice(0, 2).toUpperCase()}</Avatar>
            <Typography style={{marginLeft: '10%'}} >{auth.user_data.first_name && auth.user_data.last_name ? auth.user_data.first_name + ' ' + auth.user_data.last_name : auth.user_data.username}</Typography>
        </div>
        {/* <br /> */}
        <Divider style={{marginTop: '5%'}} variant="middle" />

    <List>
        {
            options.map((option, idx) => {
                return (
                    <ListItem key={idx} disablePadding>
                        <Link href={option.activation_url}>
                            <a style={{width: '100%'}}>
                                <ProfileMenuOption {...option} current_url={current_url} />
                            </a>
                        </Link>
                    </ListItem>
                )
            })
        }
        <br />

        <Divider light variant="middle"  />
        <br />
        <ListItem key={"logout"} disablePadding>
            <ListItemButton onClick={handleLogout} onFocus={(e) => {e.target.style.backgroundColor = "#00000030"}} onBlur = {(e) => {e.target.style.backgroundColor = ""}} style={{ padding: '5%', margin: '0 3%', borderRadius: '10px'}} >
                <ListItemIcon >
                    <Logout />
                </ListItemIcon>
                <ListItemText primary={"Sign Out"} />
            </ListItemButton>
        </ListItem>
    </List>
    </>
  )
}

function ProfileMenuOption ({ title, icon, activation_url, current_url }) {

    const isActive = activation_url === current_url;
   

    // const isActive = window ? window.location.href.startsWith(urlPreffix) ? true : false : false
    
    // const isActive = title === "View Profile";



    return (
        <ListItemButton onFocus={(e) => {e.target.style.backgroundColor = "#00000030"}} onBlur = {(e) => {e.target.style.backgroundColor = ""}} style={{backgroundColor: isActive ?  blue[400] : '', color: isActive ? 'white' : '', padding: '5%', margin: '1% 3%', borderRadius: '10px'}} >
          <ListItemIcon style={{ color: isActive ? 'white' : '' }}>
            {icon}
          </ListItemIcon>
          <ListItemText primary={title} />
        </ListItemButton>
    )

}

// ? Changing open/close on parent component causes child to re-render even if args. not changed (to prevent this memoize.)
export default React.memo(ProfileMenuContent)