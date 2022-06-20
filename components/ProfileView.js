import { Add, Remove } from '@mui/icons-material'
import { Avatar, Button, CircularProgress, Divider, Icon, IconButton, LinearProgress, Tab, Tabs, Tooltip, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import { Box, styled } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../config'
import { fetch_profile_posts } from './basic/apis/fetch_new_posts'
import SnackbarContext from './basic/contexts/snackbar_context'
import Layout from './basic/layout'
import Feed from './feed/Feed'
import styles from './ProfileView.module.css'
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
export default function ProfileView({data, userData}) {

  const [currentMode, setCurrentMode] = React.useState('recent')// Any of ['recent', 'bookmarked', 'liked']

  const [loading, setLoading] = React.useState(false);

  const [joinLoading, setJoinLoading] = React.useState(false);

  const [currentData, setCurrentData] = React.useState(data);

  const [communityCount, setCommunityCount] = React.useState(data.community.length ?? 0)

  const [joined, setJoined] = React.useState(data.community?.includes(userData.user_info.f__id));


  const snackbar = useContext(SnackbarContext);

  const status_indicator_colors = {

    "Do not disturb": '#FF1700',
    Available: '#65C18C',
    Offline: '#DFD3C3',
    Away: '#FFBD35',
    Busy: '#4C3F91'
  
  }

  console.log("PORTING: ", joined, "ANOTHER:", userData)

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

    const new_data = await fetch_profile_posts(new_mode);

    setCurrentData(new_data);

    setCurrentMode(new_mode);

    setLoading(false);

  }


  return (
    <Layout title="Profile | Spade" content="profile view for an account on spade" >
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
                    <IconButton onClick={joined ? LeaveCommunity : JoinCommunity} style={{backgroundColor: blue[500], color: 'whitesmoke'}}>
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
              <h3 style={{fontSize: '2.5rem', margin: 0, padding: 0 }}>{data?.created_posts.length}</h3>
              <h3 style={{color: '#c4c4c4', margin: '0', padding: '0'}}> Posts  </h3>
            </div> 


            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}} >
              {/* N of Community */}
              <h3 style={{fontSize: '2.5rem', margin: 0, padding: 0}}>{communityCount}</h3>
              <h3 style={{color: '#c4c4c4', margin: '0', padding: '0'}}> Community</h3>
            </div> 
          </div>
          <div style={{width: '100%', display: 'grid', placeItems: 'center', marginTop: '12%'}}>
            <Button variant="contained" style={{backgroundColor: blue[500], borderRadius: '8px'}} size="large" disableElevation>CONTACT BY EMAIL</Button>
          </div>
        </div>
      </div>
      {/* <Tjhiss /> */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' , marginLeft: '5%'}}>
  <Tabs value={currentMode} onChange={(e, newVal) => { setCurrentMode(newVal) }} aria-label="basic tabs example">
    <Tab label="Recent" value={'recent'} onClick={() => {fetchNewModePosts('recent')}} />
    <Tab label="Liked"  value="liked" onClick={() => {fetchNewModePosts('liked')}}/>
    <Tab label="Bookmarked" value="bookmarked" onClick={() => {fetchNewModePosts('bookmarked')}}/>
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
      data?.error !== 'No posts found associated with this author.' ? 
        <Feed data={data} isProfileView={true} /> :
         <h3 style={{color: '#c4c4c4', margin: '5%'}}>No Posts to see.</h3>)
      }
    </Layout>
  )
}
