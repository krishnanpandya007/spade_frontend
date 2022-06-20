import { Button, CircularProgress, TextField } from '@mui/material'
import React from 'react'
import styles from './rules.module.css'
import dynamic from 'next/dynamic'
import { blue, red } from '@mui/material/colors'
import styled from '@emotion/styled'
import EditShareReccomendation from '../EditShareReccomendation'
// Remaining to show pre-first_name and pre-last_name

const CenteredDiv = styled.div`
  
  position: absolute;
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  

`

// const EditShareReccomendation = dynamic(() => import("../EditShareReccomendation"), {loading: () => <CenteredDiv><CircularProgress /></CenteredDiv>, ssr:false })


export default function EditCustomization() {

    const [openChangeRecommendation, setOpenChangeRecommendation] = React.useState(false)

  return (
    <div style={{ width: '40%', padding: '0 3%', position: 'relative'}}>



    <h3>Edit Recommendations:</h3>
    <p>You can edit/change your recommendations for your account to other account&apos;s recommendations!</p> 
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>Create diversity to your intrests, can be interestfull to you</li>
        

    </ul>

    {
        openChangeRecommendation ? <EditShareReccomendation isOpen={openChangeRecommendation} _onClose={() => {setOpenChangeRecommendation(false)}} />:
<Button variant="contained" style={{transform: 'scale(1.1)',position: 'absolute', bottom: '0', right: '0', backgroundColor: blue[600]}} onClick={() => {setOpenChangeRecommendation(true) }} >Change Recommendations</Button>
    }
</div>
  )
}
