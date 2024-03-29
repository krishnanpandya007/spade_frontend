import { Button } from '@mui/material'
import React, { useContext } from 'react'
import styles from './rules.module.css'
import EditShareReccomendation from '../EditShareReccomendation'
import authContext from '../basic/contexts/layout_auth_context'
import NotificationRequestModal from '../NotificationRequestModal'
// Remaining to show pre-first_name and pre-last_name



// const EditShareReccomendation = dynamic(() => import("../EditShareReccomendation"), {loading: () => <CenteredDiv><CircularProgress /></CenteredDiv>, ssr:false })


export default function EditCustomization({styl}) {

    const [openChangeRecommendation, setOpenChangeRecommendation] = React.useState(false)
    const [notificationModalOpen,setNotificationModalOpen] = React.useState(false);

    const auth = useContext(authContext)

  return (
    <div style={{ ...styl,width: auth.is_on_mobile ? '100%' : '40%', padding: '0 3%', position: 'relative'}}>

    {notificationModalOpen && <NotificationRequestModal />}

    {!auth.is_on_mobile && <h3>Edit Recommendations:</h3>}
    <p>You can edit/change your recommendations for your account to other account&apos;s recommendations!</p> 
    <h4 style={{marginTop: '10%'}}>Purpose:</h4>
    <ul className={styles.UL}>
        <li>Create diversity to your intrests, can be interestfull to you</li>
        

    </ul>
    

    {
        openChangeRecommendation ? <EditShareReccomendation isOpen={openChangeRecommendation} _onClose={() => {setOpenChangeRecommendation(false)}} />:
<Button variant="contained" style={{position: 'absolute', bottom: auth.is_on_mobile ? '-3rem':'-1.2rem', right: '1rem', borderRadius :'100px'}} onClick={() => {setOpenChangeRecommendation(true) }} >Change Recommendations</Button>
    }
    <br/>
    <br/>
    <p onClick={() => {setNotificationModalOpen(true)}} style={{textDecoration: 'underline', color: 'Background'}}>Manage Notifications</p>
</div>
  )
}
