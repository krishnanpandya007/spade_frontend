import { LoadingButton } from '@mui/lab'
import { CircularProgress, Divider, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import StaticHeader from '../../components/basic/StaticHeader'

// import { LottiePlayer } from 'lottie-web'; //IMPORT_DYNAMICALLY
import { blue, purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { FRONTEND_ROOT_URL, NEW_UNCOMPLETED_PROFILE_PREFFIX } from '../../config';
import { useRouter } from 'next/router';
import { status_indicator_colors } from '../../components/profile_edits/EditStatusIndicator';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import { validate_user } from '../../components/authenticate_user';
import Layout from '../../components/basic/layout';
import authContext from '../../components/basic/contexts/layout_auth_context';
import emotion_styled from '@emotion/styled'
// import status_indicator_colors from 

const CustomStatusSelect = styled(Select)`

  &:before{
    content: 'Status';
    top: -1.3rem;
    text-align : left;
    color: grey;
    font-size: 0.8rem;

  }

`

const StyledH1 = emotion_styled('h1')`

  position: relative;

  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 46%;
    content: '';
    width: min(18%, 300px);
    height: 3px;
    border-radius: 10px;
    background: linear-gradient(135deg, #004CBB, #0066ff, #6198FF);
  }

`

const CustomStatusIndicatorSelect = emotion_styled(Select)`

  &:before{
    content: 'Status Indicator';
    top: -1.3rem;
    text-align : left;
    color: grey;
    font-size: 0.8rem;
  }

`

const CustomLoadingButton = styled(LoadingButton)`

    background-color: #6A11DB;
    transition: 0.4s ease;

    &:hover{
        color: #6A11DB;
        background-color: #ffffff !important;
        border-color: #6A11DB !important; 
        box-shadow: 0px 0px 0px 2px #6A11DB inset !important;
    }

`

function EditParent(props){

  return (

    <Layout title="Complete Social Signup - Spade" content="Complete social signup process after social login" isAuthenticated={props.is_authenticated} userInfo={props.user_info}>
      <Edit />
    </Layout>
  )

}

function Edit() {

    const [submitting, setSubmitting] = useState(false);

    const [loadingText, setLoadingText] = useState('Retrieving Information...')

    const [userInfo, setUserInfo] = React.useState({username: null, password: '', re_password: '', email: '', status: '', status_indicator: ''})
  
    const router = useRouter();

    const callback_url = router.query.callback_url ?? encodeURIComponent(FRONTEND_ROOT_URL)

    const snackbar = useContext(SnackbarContext);

    const auth = useContext(authContext);

    const InitialInformationFetch = async () => {

        const response = await fetch(`${FRONTEND_ROOT_URL}/api/social_account/get_initial_info`);

        const dataj = await response.json();

        if(!dataj.username.startsWith(NEW_UNCOMPLETED_PROFILE_PREFFIX)){
          setLoadingText('Welcome Back, Redirecting you...')
          // window.location.href = FRONTEND_ROOT_URL
          router.push('/')
          return;
        }

        setUserInfo({...userInfo, username: dataj.username?.replace(NEW_UNCOMPLETED_PROFILE_PREFFIX, '') ?? '', email: dataj.email ?? '',status: dataj.status ?? '', status_indicator: dataj.status_indicator ?? ''});



    }

    useEffect(async() => {
      await InitialInformationFetch();

    }, []);
  

    const handleSubmit = async () => {

      setSubmitting(true);

        try{

          const response = await fetch(`${FRONTEND_ROOT_URL}api/social_account/submit_info/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(userInfo)
          })
          const dataj = await response.json();
  
          if(response.status === 201){
            // Updated Data successfully
            snackbar.open('success', "Data Updated successfully.")
            window.location.href = decodeURIComponent(callback_url)
          }else{
            snackbar.open('error', dataj.error ? dataj.message : "Please re-view information")
  
          }
        } catch (e) {
          console.log(e)
          snackbar.open('error', 'Something went wrong.')

        }





      setSubmitting(false)
    }

  return (
        // <Layout title="Complete Social Signup - Spade" content="Complete social signup process after social login" isAuthenticated={is_authenticated} userInfo={user_info}>
      <>
        {/* <CircularProgress /> */}
        {
            userInfo.username === null ? 
            <><LinearProgress /><center><h2 style={{marginTop: '30vh', color: 'grey'}}>{loadingText}</h2></center></>
            :

            <center style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap :'wrap', marginTop: '7vh'}}>
                {/* <h1 style={{ flex: '1'}}>+</h1> */}

                <div style={{width: auth.is_on_mobile ? '100%' : '80%', color: 'black', borderRadius: '10px', boxShadow: '0px 0px 20px 1px rgba(0, 0, 0, 0.1)', paddingBottom: '3rem', background: auth.is_on_mobile ? '' : "url('/complete_profile_bg.svg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
                    <StyledH1 style={{fontFamily: 'Roboto', fontSize: '2.5rem', fontWeight: '600'}} >Complete Profile</StyledH1>

                    <br />

                    <TextField label="Username" variant="standard" style={{input: { color: 'black' },margin: '2rem', width: '30ch', color: 'black'}} value={userInfo.username} onChange={(e) => {setUserInfo({...userInfo,username:e.target.value})}}/>
                    {/* <TextField label="Status" variant="standard" style={{margin: '2rem 15ch'}} value={userInfo.status} onChange={(e) => {setUserInfo({...userInfo,status:e.target.value})}}/> */}
                    <TextField label="Working Email" variant="standard" style={{input: { color: 'black' },margin: auth.is_on_mobile ? '1rem 0':'2rem', width: '30ch', color: 'black'}} value={userInfo.email} onChange={(e) => {setUserInfo({...userInfo,email:e.target.value})}} type="email"/>
                    <br/>
                    <CustomStatusSelect
                    style={{input: { color: 'black' },margin: auth.is_on_mobile ? '1rem 0':'2rem', marginTop: auth.is_on_mobile ? 'calc(1.3rem + 2rem)' : '2rem', width: '30ch', color: 'black', textAlign:'left'}}
                      variant="standard"
                      // labelId="demo-simple-select-label"
                      // id="demo-simple-select"
                      value={userInfo.status.toLowerCase()}
                      label="Status"
                      onChange={(e) => {setUserInfo({...userInfo, status:e.target.value})}}
                    >
                      <MenuItem value={"spading"}>Spading</MenuItem>
                      <MenuItem value={"working"}>Working</MenuItem>
                      <MenuItem value={"chilling"}>Chilling</MenuItem>
                      <MenuItem value={"learning"}>Learning</MenuItem>
                      <MenuItem value={"lazy"}>Lazy</MenuItem>

                    </CustomStatusSelect>
                    <CustomStatusIndicatorSelect
                    style={{input: { color: 'black' },margin: auth.is_on_mobile ? '1rem 0':'2rem', color: 'black', marginTop: auth.is_on_mobile ? 'calc(1.3rem + 2rem)' : '2rem', width: '30ch', textAlign:'left'}}
                      variant="standard"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select-si"
                      value={userInfo.status_indicator.toLowerCase()}
                      label="Status Indicator"
                      onChange={(e) => {setUserInfo({...userInfo, status_indicator:e.target.value})}}
                    >
                      <MenuItem value={"do not disturb"}><div style={{backgroundColor: status_indicator_colors["do not disturb"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Do not disturb</MenuItem>
                      <MenuItem value={"available"}><div style={{backgroundColor: status_indicator_colors["available"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Available</MenuItem>
                      <MenuItem value={"offline"}><div style={{backgroundColor: status_indicator_colors["offline"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Offline</MenuItem>
                      <MenuItem value={"away"}><div style={{backgroundColor: status_indicator_colors["away"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Away</MenuItem>
                      <MenuItem value={"busy"}><div style={{backgroundColor: status_indicator_colors["busy"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Busy</MenuItem>

                    </CustomStatusIndicatorSelect>
                    <br />

                    <TextField label="Password" variant="standard" sx={{input: { color: 'black' },margin: '2rem', width: '30ch', color: 'black'}} value={userInfo.password} onChange={(e) => {setUserInfo({...userInfo,password:e.target.value})}} type="password"/>
                    {/* <TextField label="Status Indicator" variant="standard" style={{margin: '0.5rem 8ch', width: '30ch'}} value={userInfo.status_indicator} onChange={(e) => {setUserInfo({...userInfo,status_indicator:e.target.value})}} type="text"/> */}
                    {/* <br /> */}

                    <TextField label="Password (again)" variant="standard" sx={{input: {color: 'black'},margin: auth.is_on_mobile ? '1rem 0':'2rem', color: 'black !important', width: '30ch'}} value={userInfo.re_password} onChange={(e) => {setUserInfo({...userInfo,re_password:e.target.value})}} type="password"/>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <CustomLoadingButton onClick={handleSubmit} loading={submitting} disableElevation style={{padding: '0.7rem 1.3rem', borderRadius: '0px'}} endIcon={<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>} variant="contained">Continue</CustomLoadingButton>

                </div>
            </center>
        }
        </>
  )
}

export default EditParent

export async function getServerSideProps(context) {

    
    
  const response = await validate_user(context);

  // if(response.is_authenticated){
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false
  //     }
  //   }
  // }
  
  return {
      props: {is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null}
  }


}