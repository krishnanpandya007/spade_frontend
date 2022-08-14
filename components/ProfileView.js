import { Add, Minimize, PlusOne, Remove } from '@mui/icons-material'
import { Avatar, Button, Chip, CircularProgress, Divider, Icon, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box, styled } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../config'
import { fetch_profile_posts_frontend } from './basic/apis/fetch_new_posts_frontend'
import authContext from './basic/contexts/layout_auth_context'
import SnackbarContext from './basic/contexts/snackbar_context'
import Layout from './basic/layout'
import Feed from './feed/Feed'
import Image from 'next/image'
import styles from './ProfileView.module.css'
import { LoadingButton } from '@mui/lab'
// import Tjhiss from "https://framer.com/m/Tjhiss-1UN4.js@2e9Fvb8ccXpKOvGvIVAc"
const StyledTypography = styled(Typography)`

  transition: 0.3s ease;

  &:hover{
    color:#516BEB;  
    cursor: pointer;
  }

`

// Serve live data on this URL


// Also includes 404Page
export default function ProfileView({data, userData, postData, profileViewUsername}) {

  const [currentMode, setCurrentMode] = React.useState('recent')// Any of ['recent', 'bookmarked', 'liked']

  const [loading, setLoading] = React.useState(false);

  const [joinLoading, setJoinLoading] = React.useState(false);

  const [currentData, setCurrentData] = React.useState(data.created_posts);

  const [communityCount, setCommunityCount] = React.useState(data.community?.length ?? 0)
  const [joined, setJoined] = React.useState(data.community?.includes(userData.user_info?.f__id));

  const auth = useContext(authContext);

  const snackbar = useContext(SnackbarContext);

  const status_indicator_colors = {

    "Do not disturb": '#FF1700',
    Available: '#65C18C',
    Offline: '#DFD3C3',
    Away: '#FFBD35',
    Busy: '#4C3F91'
  
  }

  // console.log("PORTING: ", joined, "ANOTHER:", userData)

  const LeaveCommunity = async () => {

    setJoinLoading(true);

    // Join the community

    const response = await fetch(`${FRONTEND_ROOT_URL}api/community/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        target_user: data.username,
        action: 'leave'

      })
    }).catch((err) => console.log(err));

    if (response.status !== 200){

      snackbar.open('error', "Unable to leave community");
      setJoined(true);

    } else {

      snackbar.open('success', "You've left community!");
      // Just for asserting
      setJoined(false);
      setCommunityCount(curr => curr - 1);

    }

    setJoinLoading(false);

  }


  const JoinCommunity = async () => {

    setJoinLoading(true);

    // Join the community

    const response = await fetch(`${FRONTEND_ROOT_URL}api/community/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        target_user: data.username,
        action: 'join'

      })
    }).catch((err) => console.log(err));

    if (response.status !== 200){

      snackbar.open('error', "Unable to join community");
      setJoined(false);

    } else {

      snackbar.open('success', "You've joined community!");
      // Just for asserting
      setJoined(true);
      setCommunityCount(curr => curr + 1);


    }

    setJoinLoading(false);

  }

  const fetchNewModePosts = async (new_mode) => {

    if(new_mode === currentMode) {

      return;

    }

    setLoading(true);

    // alert(new_mode)

    const new_data = await fetch(`${FRONTEND_ROOT_URL}api/get_profile_posts_by_mode/`, {

      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          fetch_mode: new_mode,
          target_user: profileViewUsername
      })

  })

  const dataj = await new_data.json();

  // console.log("Vadhelaa::", dataj)

    setCurrentData(currData => dataj);

    setCurrentMode(new_mode);

    setLoading(false);

  }


  return (
    <React.Fragment >
    {auth.is_on_mobile ? <MobileProfileView is_authenticated={userData.is_authenticated} data={data} status_indicator_colors={status_indicator_colors} joinLoading={joinLoading} handleJoinLoading={setJoinLoading} joined={joined} LeaveCommunity={LeaveCommunity} JoinCommunity={JoinCommunity} communityCount={communityCount} /> :  
      <div className={styles.user_info_main}>
        <div className={styles.user_personal_info}>
          <div className={styles.user_profile}>
            {/* User Profile (PIC, STATUS)*/}
            {/* <Avatar src={`${BACKEND_ROOT_URL}${data.profile_pic}`} style={{height: '120px', width: '120px'}} /> */}
            {data.profile_pic ? <Avatar style={{height: '120px', width: '120px'}} src={`${BACKEND_ROOT_URL.slice(0,BACKEND_ROOT_URL.length-1)}${data.profile_pic}`} /> : data?.first_name && data?.last_name ? <Avatar style={{backgroundColor: '#e4704a', color: 'whitesmoke', fontWeight: '700', width: '120px', height: '120px'}} >{data?.first_name[0]+data?.last_name[0]}</Avatar>: <Avatar style={{height: '120px', width: '120px'}} />}
            {/* <img src="https://www.meme-arsenal.com/memes/1b8ef67dd089b62ceef53afe6373a3e4.jpg" style={{width: '120px', height: '120px', borderRadius: '1000px'}} /> */}
            <div className={styles.status_info}>
              <div className={styles.status_indicator} style={{backgroundColor: status_indicator_colors[data?.status_indicator]}} />
              <div className={styles.status} style={{fontFamily: 'Poppins'}}>
                {data?.status}
              </div>
            </div>
          </div>
          <div className={styles.user_info}>
            <div className={styles.primary_info_action_main}>
              <div className={styles.primary_info_action}>
                <div className={styles.primary_info}>
                  <h1 style={{fontWeight: '400', fontSize: '2.1rem', lineHeight: '1rem'}}>{data?.username}</h1>
                  <h2 style={{fontWeight:'400', fontFamily: 'Poppins', color: '#c4c4c4'}}>{data?.first_name} {data?.last_name}</h2>
                </div>
                <div className={styles.primary_action} >
                  {
                    !joinLoading?
                  <Tooltip title={joined ? "Leave Community" : "Join Community"}>
                    <IconButton disabled={!userData.is_authenticated} onClick={joined ? LeaveCommunity : JoinCommunity} sx={{backgroundColor: blue[500], color: 'whitesmoke'}}>
                      {joined ? <Remove  /> : <Add />}

                    </IconButton>
                  </Tooltip>:
                  <CircularProgress size={30} />
                  }
                </div>
              </div>
            </div>
            <div className={styles.user_bio}>
              {data?.bio}
            </div>
          </div>
        </div>
        <div className={styles.user_social_info}>
          <div className={styles.user_social_info_secondary}>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}} >
              {/* N of Posts */}
              <h3 style={{fontSize: '2.5rem', margin: '0', padding: '0' }}>{data?.created_posts?.length}</h3>
              <h3 style={{color: '#c4c4c4', margin: '0', padding: '0'}}> Posts  </h3>
            </div> 


            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}} >
              {/* N of Community */}
              <h3 style={{fontSize: '2.5rem', margin: '0', padding: '0'}}>{communityCount}</h3>
              <h3 style={{color: '#c4c4c4', margin: '0', padding: '0'}}> Community</h3>
            </div> 
          </div>
          <div style={{width: '100%', display: 'grid', placeItems: 'center', marginTop: '12%'}}>
            <Button variant="contained" style={{backgroundColor: blue[500], borderRadius: '8px'}} size="large" disableElevation>CONTACT BY EMAIL</Button>
          </div>
        </div>
      </div>
      }
      {/* <Tjhiss /> */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' , marginLeft: '5%'}}>
       
        <Tabs  value={currentMode} aria-label="basic tabs example">
          <Tab disabled={loading} label="Recent" value="recent" onClick={() => {fetchNewModePosts('recent')}} />
          <Tab disabled={loading} label="Liked"  value="liked" onClick={() => {fetchNewModePosts('liked')}}/>
          <Tab disabled={loading} label="Bookmarked" value="bookmarked" onClick={() => {fetchNewModePosts('bookmarked')}}/>
        </Tabs>
      </Box>
      {/* <StyledTypography fontWeight={currentMode === "recent" ? 600 : 300} variant="h4" onClick={() => {setCurrentMode('recent')}} style={{marginLeft: '5%', display: 'inline', borderBottom: currentMode === "recent" ? "3px solid #646FD4" : ""}}>Recent</StyledTypography>
      <StyledTypography fontWeight={currentMode === "bookmarked" ? 600:300} variant="h4"  onClick={() => {setCurrentMode('bookmarked')}} style={{padding: '0 2%', display: 'inline', borderBottom: currentMode === "bookmarked" ? "3px solid #646FD4" : ""}}>Bookmark</StyledTypography>
      <StyledTypography fontWeight={currentMode === "liked"?600:300} variant="h4"  onClick={() => {setCurrentMode('liked')}} style={{padding: '0 2% 0 0', display: 'inline', borderBottom: currentMode === "liked" ? "3px solid #646FD4" : ""}}>Liked</StyledTypography> */}


      {/* <Divider variant="middle" style={{marginLeft: '5%', width: '75%'}} /> */}
      {loading? 
        // <CircularProgress style={{margin: '2% 5%'}} size={20} />:
        <LinearProgress style={{marginLeft: '5%', height: '.1rem'}} />:
( 
      currentData && currentData.length > 0 ? 
        <Feed data={{created_posts: currentData}} isProfileView={true} /> :
         <h3 style={{color: '#c4c4c4', margin: '5%'}}>No Posts to see.</h3>)
      }
    </React.Fragment>
  )
}


function MobileProfileView({data, status_indicator_colors, joinLoading, handleJoinLoading, joined, LeaveCommunity, JoinCommunity, communityCount, is_authenticated}) {

  const auth = useContext(authContext);
  return (

    <React.Fragment>

      <center style={{backgroundColor: '#548CFF', color: 'white', fontFamily: 'Poppins', fontSize: '1.1rem'}}><p style={{padding: '0.2rem 0'}}>{data.username}</p></center>

      <div style={{display: 'flex', alignItems: 'center', padding: '5% 0 5% 5%', width: '100%'}}>
        {data.profile_pic ? <Avatar style={{height: '100px', width: '100px'}} src={`${BACKEND_ROOT_URL.slice(0,BACKEND_ROOT_URL.length-1)}${data.profile_pic}`} /> : data?.first_name && data?.last_name ? <Avatar style={{backgroundColor: '#e4704a', color: 'whitesmoke', fontWeight: '700', width: '100px', height: '100px'}} >{data?.first_name[0]+data?.last_name[0]}</Avatar>: <Avatar style={{height: '100px', width: '100px'}} />}
        <div style={{width: '100%', padding: '0 1.5rem 0 2rem'}}>
          <h2 style={{fontWeight:'400', fontFamily: 'Poppins', color: '#c4c4c4'}}>{data?.first_name} {data?.last_name}</h2>
          {/* <Chip label={data?.status} variant="outlined" icon={<div style={{width: '15px', height: '15px',backgroundColor: status_indicator_colors[data?.status_indicator], borderRadius: '10px', margin: '0 0 0 10px'}} />} style={{borderRadius: '5px'}} /> */}
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%'}}>
            <div style={{display: 'flex',padding: '3px 6px',height: '2.2rem', gap: '0.5rem',boxShadow: '0 0 0 1px #c4c4c4', justifyContent: 'flex-start', alignItems: 'center', borderRadius: '3px'}}>
              <div style={{width: '10px', height: '10px',backgroundColor: status_indicator_colors[data?.status_indicator[0].toUpperCase() + data?.status_indicator.slice(1)], borderRadius: '10px'}} />
              <p style={{marginLeft: '8px', margin: '0', padding: '0', fontFamily: 'Poppins', fontSize: '0.8rem'}}><b><i>{data?.status}</i></b></p>
            </div>
            <LoadingButton  loading={joinLoading} onClick={is_authenticated?joined ? LeaveCommunity : JoinCommunity:()=>{auth.set_open_drawer(true, "Login Required!")}} startIcon={joined ? <Remove /> :<Add />} variant="contained" disableElevation sx={{backgroundColor: joined ? '#FB3640' : '#548CFF'}} >
              {joined ? 'LEAVE' : 'JOIN'}
            </LoadingButton>
          </div>
        </div>
      </div>

      <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: '100%', margin: '0'}}>
        <div>
          <h1 style={{fontSize: '2.5rem', padding: '0', textAlign: 'center', marginBlock: '0rem'}}>{data?.created_posts?.length}</h1>
          <p style={{fontWeight: '700', fontSize: '1.2rem', color: '#C4C4C4', marginBlock: '0'}}>Posts</p>
        </div>
        <div style={{margin: '1.5rem 0'}}>
          <h1 style={{fontSize: '2.5rem', padding: '0', textAlign: 'center', marginBlock: '0'}}>{communityCount}</h1>
          <p style={{fontWeight: '700', fontSize: '1.2rem', color: '#C4C4C4', marginBlock: '0'}}>Community</p>
        </div>
      </div>

      <Divider variant="middle" light/>
      <div style={{margin: '2rem 5% 3rem 5%'}}>
        {data?.bio || <p style={{color: '#c4c4c4', fontSize: '0.9rem', fontWeight: '600'}}>No Profile Overview found!</p>}
      </div>
    </React.Fragment>

  )

}