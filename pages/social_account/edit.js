import { LoadingButton } from '@mui/lab'
import { CircularProgress, Divider, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import StaticHeader from '../../components/basic/StaticHeader'

// import { LottiePlayer } from 'lottie-web'; //IMPORT_DYNAMICALLY
import { blue, purple } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { FRONTEND_ROOT_URL } from '../../config';
import { useRouter } from 'next/router';
import { status_indicator_colors } from '../../components/profile_edits/EditStatusIndicator';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';

// import status_indicator_colors from 

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

function Edit() {

    const ref = useRef(null);
    const [lottie, setLottie] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    const [userInfo, setUserInfo] = React.useState({username: null, password: '', re_password: '', email: '', status: '', status_indicator: ''})
  
    const router = useRouter();

    const callback_url = router.query.callback_url ?? encodeURIComponent(FRONTEND_ROOT_URL)

    const snackbar = useContext(SnackbarContext);

    const InitialInformationFetch = async () => {

        const response = await fetch(`${FRONTEND_ROOT_URL}/api/social_account/get_initial_info`);

        const dataj = await response.json();

        setUserInfo({...userInfo, username: dataj.username ?? '', email: dataj.email ?? '',status: dataj.status ?? '', status_indicator: dataj.status_indicator ?? ''});



    }

    useEffect(async() => {
      await InitialInformationFetch();
      import('lottie-web').then((Lottie) => setLottie(Lottie.default));
    }, []);
  
    useEffect(() => {
      if (lottie && ref.current) {
        const animation = lottie.loadAnimation({
          container: ref.current,
          renderer: 'svg',
          loop: false,
          autoplay: true,
          // path to your animation file, place it inside public folder
          path: '/social_account_bg.json',
        });
  
        return () => animation.destroy();
      }
    }, [lottie]);

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
      <>
        <StaticHeader />
        {/* <CircularProgress /> */}
        {
            userInfo.username === null ? 
            <><LinearProgress /><center><h2 style={{marginTop: '30vh', color: 'grey'}}>Retrieving Information...</h2></center></>
            :

            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap :'wrap', marginTop: '10vh'}}>
                <div ref={ref} style={{width: '30vw'}}></div>
                {/* <h1 style={{ flex: '1'}}>+</h1> */}
                <div>
                    <h1 style={{fontFamily: 'Roboto', fontSize: '2.5rem', fontWeight: '600'}} >Complete Profile</h1>

                    <br />

                    <TextField label="Username" variant="standard" style={{margin: '2rem 0', width: '30ch'}} value={userInfo.username} onChange={(e) => {setUserInfo({...userInfo,username:e.target.value})}}/>
                    {/* <TextField label="Status" variant="standard" style={{margin: '2rem 15ch'}} value={userInfo.status} onChange={(e) => {setUserInfo({...userInfo,status:e.target.value})}}/> */}
                    <TextField label="Working Email" variant="standard" style={{margin: '2rem 8ch', width: '30ch'}} value={userInfo.email} onChange={(e) => {setUserInfo({...userInfo,email:e.target.value})}} type="email"/>
                    <br />
                    <Select
                    style={{margin: '3rem 0', width: '30ch'}}
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

                    </Select>
                    <Select
                    style={{margin: '1rem 8ch', width: '30ch'}}
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

                    </Select>
                    <br />

                    <TextField label="Password" variant="standard" style={{margin: '0.5rem 0', width: '30ch'}} value={userInfo.password} onChange={(e) => {setUserInfo({...userInfo,password:e.target.value})}} type="password"/>
                    {/* <TextField label="Status Indicator" variant="standard" style={{margin: '0.5rem 8ch', width: '30ch'}} value={userInfo.status_indicator} onChange={(e) => {setUserInfo({...userInfo,status_indicator:e.target.value})}} type="text"/> */}
                    {/* <br /> */}

                    <TextField label="Password (again)" variant="standard" style={{margin: '1rem 8ch', width: '30ch'}} value={userInfo.re_password} onChange={(e) => {setUserInfo({...userInfo,re_password:e.target.value})}} type="text"/>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />

                    <CustomLoadingButton onClick={handleSubmit} loading={submitting} disableElevation style={{padding: '0.7rem 1.3rem', borderRadius: '0px'}} endIcon={<svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.18194 4.18185C6.35767 4.00611 6.6426 4.00611 6.81833 4.18185L9.81833 7.18185C9.90272 7.26624 9.95013 7.3807 9.95013 7.50005C9.95013 7.6194 9.90272 7.73386 9.81833 7.81825L6.81833 10.8182C6.6426 10.994 6.35767 10.994 6.18194 10.8182C6.0062 10.6425 6.0062 10.3576 6.18194 10.1819L8.86374 7.50005L6.18194 4.81825C6.0062 4.64251 6.0062 4.35759 6.18194 4.18185Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>} variant="contained">Continue</CustomLoadingButton>

                </div>
            </div>
        }
      </>
  )
}

export default Edit