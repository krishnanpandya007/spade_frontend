import { CircularProgress } from '@mui/material'
import React from 'react'
import { FRONTEND_ROOT_URL } from '../config'
import styles from './CreateAccount.module.css'

function CreateAccount({t_and_c_ref,handleOnChange, handleSubmit, loading, setLoading, profileCreated}) {
  return (
    <div className={styles.main} style={{ backgroundImage: `url(${FRONTEND_ROOT_URL}create_account_bg.jpg)` }}>
        <h2 className={styles.main_header}>Create Profile</h2>
        <input type="text" placeholder="First Name" className={styles.text_input} onChange={(e) => {handleOnChange(e, 'first_name')}} /> 
        <input type="text" placeholder="Last Name" className={styles.text_input} style={{marginLeft: '2%'}}  onChange={(e) => {handleOnChange(e, 'last_name')}}/> 
        <br style={{display: 'block', margin: '2px 0'}} />
        <input type="text" placeholder="Username" className={styles.text_input} style={{width: '32.5%', marginTop: '0'}}  onChange={(e) => {handleOnChange(e, 'username')}}/> 
        <br />
        <input type="email" placeholder="Email" className={styles.text_input} style={{width: '32.5%', marginTop: '0'}}  onChange={(e) => {handleOnChange(e, 'email')}}/> 
        <br/>
        <input type="password" placeholder="Password" className={styles.text_input} style={{marginTop: '0'}} onChange={(e) => {handleOnChange(e, 'password')}} /> 
        <input type="password" placeholder="Confirm Password" className={styles.text_input} style={{marginLeft: '2%', marginTop: '0'}} onChange={(e) => {handleOnChange(e, 're_password')}}/> 
        <br />
        <input ref={t_and_c_ref}  type="checkbox"  style={{marginLeft: '5%', content: 'hello'}} id="agree-terms-n-conditions" value="agree-terms-n-conditions" /><label style={{fontFamily: 'Changa'}} htmlFor="agree-terms-n-conditions">I Agree, <a href="https://www.google.com/" style={{textDecoration: 'underline', color: '#5463FF'}}>Terms & Conditions</a> for creating Profile</label> 

        <br />

        <button className={styles.create_account_submit_button} style={{display: 'grid', placeItems: 'center', backgroundColor: profileCreated ? '#019267' : '#5463FF'}} onClick={!loading ? () => {handleSubmit()}:null }>{profileCreated ? "Profile Created SuccessFully" :(loading ? <CircularProgress style={{color: 'white', transform: 'scale(0.2)'}} /> : "Create Profile")}</button>
        <div style={{marginLeft: '5%', width: '32.5%', display: 'grid', placeItems: 'center', fontFamily: 'Changa'}}>

        {/* <p>Already have a profile? <a href="https://www.google.com" style={{textDecoration: 'underline', color: '#5463FF'}}>Sign In</a></p> */}
        </div>


    </div>
  )
}

export default CreateAccount