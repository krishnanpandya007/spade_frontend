import './HeaderAppMenuLogged.module.css';
// import { styled } from '@material-ui/styles';

// import { Badge, IconButton, Paper } from '@material-ui/core';

// import Home from '@material-ui/icons/Home'
// import { ExitToApp, HomeOutlined, Notifications, Settings, SettingsOutlined } from '@material-ui/icons';

// import { NotificationsNoneOutlined } from '@material-ui/icons';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import AccountCircleOutlined from '@material-ui/icons/AccountCircleOutlined';
// import Tooltip from '@material-ui/core/Tooltip';
// import logout from './logout';
import {useRouter} from 'next/router'
import { useEffect, useState } from 'react';
import Link from 'next/link'
import getUserInfo from './get_user_info';
import { HomeOutlined, SettingsOutlined } from '@mui/icons-material';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { FRONTEND_ROOT_URL } from '../../config';
// import {Exit} from '@material-ui/icons/ExitToApp'
// ExitToApp

function HeaderAppMenuLogged({_onClick}) {

    const [currentState, setCurrentState] = useState(false);
    const [username, setUsername] = useState('')

    useEffect(async () => {

        if(typeof window != undefined){
            let current_href = window.location.href + "/";
            switch(current_href){
                case FRONTEND_ROOT_URL:
                    // Home View
                    setCurrentState('home')
                    break;
                case 5:
                    if (current_href[4] === 'edit'){
                        // Its settings view
                        setCurrentState('settings')
                    }
                    break;
            }
    
            // current_state = (current_href.length === 6 ? (current_href[4] ==='edit' ? 'settings': current_href.length === 1 ? 'home'  : false) : false)
        }
        // try{
            // const userInfo = await getUserInfo();
    // } catch (err) {
    //     console.log(err)
    // }
        setUsername('krishnan_pandya')

    }, [])

    const router = useRouter();

    return (
        <div className="header__menu" style={{
            width: '300px !important',
            // display: 'flex',
        // flex: '0.8'
        }}>
             
        {/* <FontAwesomeIcon icon="fa-light fa-house" /> */}

            <Tooltip title="Home">
                <Link href="/">
                <IconButton
                //  style={{transform: 'scale(1.2)'}}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    style={{position: 'relative'}}
                    // sx={{ mr: 20 }}
                    >
                    {/* <Badge variant="dot" color="secondary" anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}> */}
                        <HomeOutlined/>
                        {
                            true ?
                            <div style={{width: '5px', height: '5px', borderRadius: '1000px', backgroundColor: '#2D31FA', position: 'absolute', bottom: '0'}}></div>
                            : false
                        }
                    {/* </Badge> */}
 
                </IconButton>
                </Link>
            </Tooltip>
            <Tooltip title="Settings">
                {/* <Link href={"/profile/edit"}> */}
                <IconButton
                //  style={{transform: 'scale(1.2)'}}

                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    style={{position: 'relative'}}
                    onClick={_onClick}
                    // sx={{ mr: 2 }}
                    >
                    <SettingsOutlined />
                        {
                            currentState === 'settings' ?
                            <div style={{width: '5px', height: '5px', borderRadius: '1000px', backgroundColor: '#2D31FA', position: 'absolute', bottom: '0'}}></div>
                            : false
                        }

                </IconButton>
                {/* </Link> */}
            </Tooltip>
                    {/*             
            <Tooltip title="notifications">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                        {current_state === "notifications" ? 
                        <Notifications /> : 
                        <StyledBadge badgeContent={4} color="secondary">
                            <NotificationsNoneOutlined />
                        </StyledBadge>
                        }
                </IconButton>
            </Tooltip>
            <Tooltip title="profile">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                >
                    {current_state === "profile" ? <AccountCircle /> : <AccountCircleOutlined />}

                </IconButton>
            </Tooltip>
            <Tooltip title="logout">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}

                    onClick={() => {logout();router.push('/login')}}
                >
                    <ExitToApp />

                </IconButton>
            </Tooltip> */}
   </div>
    )
}

export default HeaderAppMenuLogged
