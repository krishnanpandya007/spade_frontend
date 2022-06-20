// import { Button, Container} from '@material-ui/core'

import { Button, Container, Stack } from '@mui/material'
import TemporaryDrawer from './LoginDrawer';
// import { StayCurrentLandscape } from '@material-ui/icons'
// import { Button } from '@material-ui/core/'
// Button
// import Stack from '@material-ui/core/Stack';
// Sta
// import './HeaderAppMenuAnonymous.css'
import React from 'react'

function HeaderAppMenuAnonymous({handleDrawerOpen, drawerOpen}) {

    // Stack
    // StayCurrentLandscape
    

    return (
        <div>
            <Stack spacing={2} direction="row" >
                <Button variant="outlined" className="btn" onClick={handleDrawerOpen}> Log In </Button>
                <Button variant="contained" className="btn">Sign Up</Button> 
            </Stack>
            
        </div>
    )
}

export default HeaderAppMenuAnonymous
