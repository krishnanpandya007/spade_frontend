import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton, SwipeableDrawer } from '@mui/material';

const ProfileMenuContent = dynamic(() => import("./ProfileMenuContent"), {loading: () => <div style={{display: 'flex', justifyContent: 'space-around', gap: '5%', margin: '5%'}}><Skeleton variant="circular" height={40} width={40} /><Skeleton width={200} /></div>, ssr:false })
// ? SSSR: false => we gonna user ContextAPI which enables while _app called (CLIENT_SIDE)

function ProfileMenu({ open , handleClose, handleOpen}) {

  return (
        <SwipeableDrawer
            style={{width: '40vw'}}
            anchor={'right'}
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
        >
            <ProfileMenuContent />
        </SwipeableDrawer>
  )
}



export default ProfileMenu