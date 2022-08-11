import { CircularProgress, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'
import { DOCS_ROOT_URL, FRONTEND_ROOT_URL } from '../config'
import styles from './CreateAccount.module.css'

import authContext from './basic/contexts/layout_auth_context'
import { status_indicator_colors } from './profile_edits/EditStatusIndicator'
import { LoadingButton } from '@mui/lab'
import { handle_global_email, send_verification_code, verify_verification_code } from './profile_edit_apis/edit_email'

function CreateAccount({data,t_and_c_ref,handleOnChange, handleSubmit, loading, setLoading, profileCreated, handleFormError, handleErrorData}) {

  const [actionButtonText, setActionButtonText] = React.useState('1. Verify Email')

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [isVerified, setIsVerified] = React.useState(false)
  const [verifyView, setVerifyView] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState('');


  const enableVerifyView = async () => {

    setButtonDisabled(true)
    setActionButtonText('Loading...')

    const response = await send_verification_code(data.email);
  
    if(response.status === 200) {

      setVerifyView(true)
      setActionButtonText('2. Verify Verification Code')


    }else if(response.status === 403){
      handleErrorData("Email already exists, Choose another one")
      handleFormError(true)
      setActionButtonText('Verify Email')
    }
    else{
      // alert("Please Enter valid email")
      handleErrorData("Please Enter valid Email")
      handleFormError(true)
      setActionButtonText('Verify Email')
    }
    setButtonDisabled(false)



}

const disableVerifyView = async () => {

  setButtonDisabled(true)

  const response = await verify_verification_code("_CREATEPROFILE_NULL",data.email,verificationCode);

  const dataj = await response.json();

  if(response.status === 200 && !(dataj?.error)) {

    
    
    // setVerifyView(true)
    setActionButtonText('Creating Account...')
    setIsVerified(true)
    setVerifyView(false)



  }else{
    handleErrorData("Invalid Code, Try again!")
    handleFormError(true)
    setActionButtonText('Retry')
  }

  setButtonDisabled(false)

}

  return (
    <center>

    <div className={styles.main} >
        <h1 className={styles.main_header} style={{textAlign: 'left'}}>Create Profile<span style={{fontWeight: '500', fontSize: '1.2rem', color: '#c4c4c4'}}>&nbsp;&nbsp;It&apos;s <i>Spady!</i></span></h1>
        <br />
        
        <div className={styles.first_last_section}>
        <TextField style={{flex :1, marginRight: '1rem'}}  label="First name" value={data.first_name} onChange={(e) => {handleOnChange(e, 'first_name')}}/>
        <TextField style={{flex :1}} label="Last name" value={data.last_name} onChange={(e) => {handleOnChange(e, 'last_name')}}/>
        </div>
        <br/>
        <TextField style={{flex :1}} fullWidth  label="Username" type="text" value={data.username} onChange={(e) => {handleOnChange(e, 'username')}} />
        
        <br />
        <br />
        <TextField style={{flex :1}} fullWidth  label="Email" type="email" value={data.email} onChange={(e) => {isVerified || verifyView ? null :handleOnChange(e, 'email')}} disabled={isVerified || verifyView} />
        <br />
        <br />

        <div className={styles.first_last_section}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.status}
          style={{flex: '1', textAlign: 'left', marginRight: '1rem'}}
          onChange={(e) => {handleOnChange(e, 'status')}}
          >
          <b style={{margin: '1rem', color: '#c4c4c4'}}>Choose Status</b>
          <MenuItem value={"spading"}>Spading</MenuItem>
          <MenuItem value={"working"}>Working</MenuItem>
          <MenuItem value={"chilling"}>Chilling</MenuItem>
          <MenuItem value={"learning"}>Learning</MenuItem>
          <MenuItem value={"lazy"}>Lazy</MenuItem>
        </Select>
        <Select
          style={{margin: '1rem 8ch', width: '30ch'}}
            labelId="demo-simple-select-label"
            id="demo-simple-select-si"
            style={{flex: '1', textAlign: 'left'}}
            value={data.statusIndicator}
            onChange={(e) => {handleOnChange(e, 'statusIndicator')}}
          >
            <b style={{margin: '1rem', color: '#c4c4c4'}}>Choose Status Indicator</b>

            <MenuItem value={"do not disturb"}><div style={{backgroundColor: status_indicator_colors["do not disturb"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Do not disturb</MenuItem>
            <MenuItem value={"available"}><div style={{backgroundColor: status_indicator_colors["available"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Available</MenuItem>
            <MenuItem value={"offline"}><div style={{backgroundColor: status_indicator_colors["offline"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Offline</MenuItem>
            <MenuItem value={"away"}><div style={{backgroundColor: status_indicator_colors["away"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Away</MenuItem>
            <MenuItem value={"busy"}><div style={{backgroundColor: status_indicator_colors["busy"], width: '10px', height: '10px', display: 'inline-block', borderRadius: '10px', marginRight: '1ch'}}></div> Busy</MenuItem>

          </Select>
        </div>


        <br />
        <div className={styles.first_last_section}>
        <TextField style={{flex :1, marginRight: '1rem'}}  label="Password" type="password" value={data.password} onChange={(e) => {handleOnChange(e, 'password')}}/>
        <TextField style={{flex :1}} label="Re-Password" type="password" value={data.re_password} onChange={(e) => {handleOnChange(e, 're_password')}}/>
        </div>
        <br/>
        {/* <br/>
        <input type="password" placeholder="Password" className={styles.text_input} onChange={(e) => {handleOnChange(e, 'password')}} /> 
        <input type="password" placeholder="Confirm Password" className={styles.text_input}  onChange={(e) => {handleOnChange(e, 're_password')}}/> 
        <br /> */}
        <input ref={t_and_c_ref}  type="checkbox"   id="agree-terms-n-conditions" value="agree-terms-n-conditions" /><label style={{fontFamily: 'Changa'}} htmlFor="agree-terms-n-conditions">I Agree, <a href={`${DOCS_ROOT_URL}terms-and-conditions`} target="_blank" style={{textDecoration: 'underline', color: '#5463FF'}}>Terms & Conditions</a> while creating Profile</label> 

        <br />
        <br/>
        {
          verifyView ?
          <><TextField fullWidth label="Verification Code" value={verificationCode} onChange={(e) => {setVerificationCode(e.target.value)}} /><br/></>:null
        }
        <br/>

        <LoadingButton loading={loading} disabled={buttonDisabled} onClick={!isVerified ? verifyView ? disableVerifyView : enableVerifyView : handleSubmit} fullWidth variant="contained" sx={{height: '3rem', borderRadius: '10px', backgroundColor: '#5463FF', textTransform: 'initial', fontWeight: '600'}}>{!isVerified ? actionButtonText : "Finally, Submit"}</LoadingButton>
        <div style={{marginLeft: '5%', width: '32.5%', display: 'grid', placeItems: 'center', fontFamily: 'Changa'}}>

        {/* <p>Already have a profile? <a href="https://www.google.com" style={{textDecoration: 'underline', color: '#5463FF'}}>Sign In</a></p> */}
        </div>


    </div>
    </center>
  )
}

export default CreateAccount