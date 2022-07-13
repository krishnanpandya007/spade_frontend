// import {Grid} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
// stepConnectorClasses
// import Box from '@material-ui/core/Box';

// import Stepper from '@material-ui/core/Stepper';
// Typography
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import CreatePostForm from '../../components/CreatePostForm';
import CreatePostWidgetMenu from '../../components/CreatePostWidgetMenu';
import Layout from '../../components/basic/layout';
import { Grid } from '@mui/material';
import { validate_user } from '../../components/authenticate_user';

// Stack
// styled
function Post({is_authenticated, user_info}) {

    const [chipData, setChipData] = React.useState([])
//    const [formChipData, setFormChipData] = React.useState([]);
//    const [widgetChipData, setWidgetChipData] = React.useState([]);

    const onChangeChipData = (data) => {
      // alert(data)
      console.log("CHANGE CHIP_DATA: ",data)
      setChipData(data)
    }


    const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth: 0);
  
    const updateWidth = () => {
      setWidth(typeof window !== "undefined" ? window.innerWidth : 0);
    };
  
    useEffect(()=> {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }, typeof window !== "undefined" ? window.innerWidth : 0);

    return (
        <Layout title={"Add Post | Spade"} content="create post spade" userMustAuthenticated={true} includesPostModal isAuthenticated={is_authenticated} userInfo={user_info}>
          {/* <h2 style={{marginLeft: '10%'}}>Create Post</h2> */}
          {/* <br /> */}
        <hr />
        <Grid container alignItems="center" justifyContent="center" padding="1.5%" minHeight="80vh" spacing={10}>

          {/* <Grid item xs={1} height="80vh">
            White Space
          </Grid> */}
          {/* <PostModal /> */}
          <Grid item xs={6.5} style={{height: '90vh', overflowY: 'hidden', overflowX: 'hidden', marginTop: '2%'}} className="Create-post-form-section">
            <CreatePostForm ChangeChipData={(e) => {onChangeChipData(e)} } chip_data={chipData} />
          </Grid>

          <Grid item xs={3}  style={{height: '80vh'}}>
            {/* I Am Widget Menu */}
            <CreatePostWidgetMenu style={{height: '100%'}} ChangeChipData={(e) => {onChangeChipData(e)}} chip_data={chipData} top_tags={['call-of-duty', 'free-fire', 'valorant', 'kill-campers']} />
          </Grid>

        </Grid>
        
        </Layout>
    )
}

export async function getServerSideProps(context) {

    
    
  const response = await validate_user(context);
  



  return {
      props: {is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null}
  }


}

export default Post
