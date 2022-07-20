import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
// import LoginDrawerContent from './LoginDrawerContent';
import dynamic from 'next/dynamic';
import { CircularProgress } from '@mui/material';
import styled from '@emotion/styled'
import { Login } from '@mui/icons-material';
import authContext from './contexts/layout_auth_context';

const CenteredDiv = styled.div`
  
  position: absolute;
  
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  

`
const LoginDrawerContent = dynamic(() => import("./LoginDrawerContent"), {loading: () => <CenteredDiv><CircularProgress /></CenteredDiv>, ssr:false })

export default function TemporaryDrawer() {

  const auth = React.useContext(authContext);

  return ((!auth.is_authenticated) && 
    <div>
        <React.Fragment >
          <Drawer
            anchor={'right'}
            open={auth.open_drawer}
            onClose={() => {auth.set_open_drawer(false)}}
          >

          <Box
                sx={{ width: 'max(30vw, 400px)', height: '100%'}}
                style={{position: 'relative'}}
                // onClick={onClose}
                // onKeyDown={onClose}
              >
            
            <LoginDrawerContent handleClose={() => {auth.set_open_drawer(false)}} />

          </Box>
          </Drawer>
        </React.Fragment>
    </div>
  );
}
