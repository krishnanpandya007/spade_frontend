// import {Grid} from '@material-ui/core';
import React, { useState } from 'react'
// stepConnectorClasses
// import Box from '@material-ui/core/Box';
import Image from 'next/image'
// import Stepper from '@material-ui/core/Stepper';
// Typography
// import Step from '@material-ui/core/Step';
// import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
// import CreatePostForm from '../../components/CreatePostForm';
import CreatePostWidgetMenu from '../../components/CreatePostWidgetMenu';
import Layout from '../../components/basic/layout';
import { Modal, SwipeableDrawer, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import styled from '@emotion/styled'
import { useContext } from 'react';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import authContext from '../../components/basic/contexts/layout_auth_context';
import CreatePostTagManager from '../../components/CreatePostTagManager';
import CreatePostFormImageManager from '../../components/CreatePostFormImageManager';
import { Box } from '@mui/system';
import { FRONTEND_ROOT_URL } from '../../config';

const StyledButton = styled('button')`
border: 1px dashed #516BEB99;
transition: 0.15s ease-in;

&:hover{
  transform: translateY(-2px);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;

}

&:focus{

  box-shadow: 0 0 0 3px #516BEB99;

}

`

const CustomInput = styled(`input`)`

&:invalid{

  border: 3px solid blue;

}

`

function getExtention(fileName){

  return fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);

}

// Stack
// styled
function Post() {


    return (
        <Layout title={"Add Post | Spade"} content="create post spade"  >
          {/* <br /> */}
          {/* <center style={{backgroundColor: '#c4c4c490'}}><h3 style={{fontFamily: 'Poppins', fontWeight: '400'}}>Hmm, another cool hack?</h3></center>         */}

          {/* <Grid container alignItems="center" justifyContent="center" padding="1.5%" minHeight="80vh" spacing={10}> */}
          {/* <div style={{display: 'grid', justifyContent: 'center', width: '100vw'}}> */}

          <h1 style={{ fontFamily: 'Chivo', fontWeight: 'bolder', margin: '3% 5%', borderBottom: '2px dashed #516BEB40', paddingBottom: '1rem' }}>Drop <span style={{ color: '#516BEB' }}>Sp</span><span style={{ opacity: '0.82' }}>ack</span>,</h1>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
              {/* <CreatePostForm ChangeChipData={(e) => {onChangeChipData(e)} } chip_data={chipData} /> */}
              <CreatePostForm />
            {/* </Grid> */}



              <div className="tips-main">
                <h2 style={{color: '#8267BE', fontFamily: 'sans-serif'}}>Tips to improve Your Post</h2>
                <ul>
                  <li>Make your topic &apos; Title &apos; more reliable and short </li>
                  <li>Make your content to the point as much possible</li>
                  <li>Add tags (which helps to identify your content and make reachable to relevant users)</li>
                  <li>(optional) For better understanding add images, if needed!</li>
                  <li>(Recommended) Always prefer to review your content before publishing it!</li>

                </ul>
              </div>
            </div>
          {/* </div> */}
            {/* <Grid item xs={1} height="80vh">
              White Space
            </Grid> */}
            {/* <PostModal /> */}
            {/* <Grid item xs={6.5} style={{ overflowY: 'hidden', overflowX: 'hidden', marginTop: '2%'}} className="Create-post-form-section"> */}

{/* </Grid> */}

</Layout>
)
}

function CreatePostForm() {

  const theme = useTheme();
  const snackbar = useContext(SnackbarContext);
  const auth = useContext(authContext);

  const [loading, setLoading] = React.useState(false);
  const [focusModal, setFocusModal] = React.useState(null); // 'tags' | 'images' | null
  const audioRef = React.useRef(null);
  
  const titleRef = React.useRef(null);
  const descrRef = React.useRef(null);
  const [descrLen, setDescrLen] = React.useState(0);

  const [formData, setFormData] = useState({
    tags: [],
    images: {}, //{image_1: {content: null, name: 'abc.jpg', blob_url: 'blob:///.../'}, ...}
  })


  /*
  
  IMP: On successfull submit, ring a tone! (ex. https://flatuicolors.com/)
  
  */
  React.useEffect(() => {
    // Load Success Audio
    audioRef.current = new Audio('/spack_success.m4a');

  }, [])

  const handleSpackSubmit = async () => {

    setLoading(true);

    if(!titleRef.current.value || titleRef.current.value.length < 6){

      titleRef.current.reportValidity("Provide Valid title");
      setLoading(false);
      return;
    }

    if(!descrRef.current.value){
      descrRef.current.reportValidity("Please provide Descr.")
      setLoading(false);
      return;
    }
    // titleRef  

    if(!auth.is_authenticated){

      // Can;t open signinDrawer
      console.log("trying to opening")
      auth.set_open_drawer(true, "Login Required!");
      setLoading(false);
      return;
    }

    let form_data = new FormData();

    form_data.append('title', titleRef.current.value);
    form_data.append('descr', descrRef.current.value);
    form_data.append('tags', formData.tags.join(','));

    //appending images
    for(const image of Object.keys(formData.images)){

      form_data.append(image, formData.images[image].content, `${image}.${getExtention(formData.images[image].name)}`);

    }

    const response = await fetch(`${FRONTEND_ROOT_URL}api/create/post/`, {
      method: 'POST',
      headers: {
          // 'Content-Type': 'multipart/form-data; boundary=98feb59a8abe4bfb95a7321f536ed800',
          'Accept': 'application/json',
          // 'X-CSRFToken': csrftoken
      },
      body: form_data
  })

  const data = await response.json();
    if(response.status === 201){

      audioRef.current.play();

      window.location.href = `${FRONTEND_ROOT_URL}explore/post/${data.created_post_id}`
    }

    setLoading(false)

  }


  const addTag = (tag_name) => {

    if(!tag_name){
      return;
    }

    if(formData.tags.length > 9){
      snackbar.open("info", "Maximum 10 tags are addable");
      return;
    }
    
    if(formData.tags.includes(tag_name)){

      snackbar.open("info", "It's already included 🙂")
      return;

    }

    setFormData(currFormData => ({tags: [...currFormData.tags, tag_name]}));

  }

  const removeTag = (remove_tag) => {

    setFormData(currFormData => ({tags: currFormData.tags.filter((tag) => tag!== remove_tag)}));

  }

  return (
    <div style={{ margin: `${auth.is_on_mobile ? '5%' : '0%'} 5% 5% 5%`, width: '100%', maxWidth: '500px'}}>

      <label style={{fontFamily: 'Chivo'}}>Title</label>
      <br/>
      <CustomInput ref={titleRef} type="text" name="title" id="title" style={{ padding: '1rem', outline: 'none', width: '100%', border: 'none', borderBottom: '1px solid #516BEB', borderRadius: '5px 5px 0 0', backgroundColor: '#516BEB20', fontFamily: 'Chivo' }} placeholder="Best way to..." />

      

      <label style={{fontFamily: 'Chivo', width: '100%', display: 'flex', justifyContent: 'space-between', margin: '0', marginTop: '10%'}}><span>Crack up hack!</span><span style={{color: `${descrLen < 150 ? '#b7b7b7' : descrLen < 250 ? '#ffa502': '#ff4757' }`}}>{300 - descrLen}</span></label>
      <textarea placeholder="Keep it Short & Stylish, " maxLength={300} onChange={(e) => {setDescrLen(e.target.value?.length)}} ref={descrRef}  name="descr" style={{ border: '1px solid #516BEB', padding: '0.8rem', fontFamily: 'Poppins', color: theme.palette.mode === 'dark' ? '#EFF2FD' : '#070A15', borderRadius: '5px', width: '100%', resize: 'vertical', backgroundColor: 'transparent' }} rows="15"/>

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '7%', marginTop: '5%' }}>


        {/* TAG_MANAGER_DRAWER */}
        {auth.is_on_mobile ? <SwipeableDrawer onOpen={() => {setFocusModal('tags')}} open={focusModal === 'tags'} onClose={() => {setFocusModal(null)}} anchor="bottom" PaperProps={{ square: false , style: {padding: '0.8rem', backgroundColor: '#516BEB'}}} >
          <center><div style={{backgroundColor: 'white', borderRadius: '100px', width: 'min(20%, 100px)', height: '4px', margin: '5px 0 20px 0'}} /></center>
          <CreatePostTagManager tags={formData.tags} addTag={addTag} removeTag={removeTag} />
        </SwipeableDrawer> : 
        <Modal open={focusModal === 'tags'} onClose={() => {setFocusModal(null)}} style={{display: 'grid', placeItems: 'center'}}>
          <Box style={{display: 'grid', placeItems: 'center', backgroundColor: '#516BEB', padding: '1.7rem', borderRadius: '10px', maxWidth: '500px'}}>
          <CreatePostTagManager tags={formData.tags} addTag={addTag} removeTag={removeTag} />

          </Box>

        </Modal>
        }


        {/* IMAGE_MANAGER_DRAWER */}
        {auth.is_on_mobile ? <SwipeableDrawer onOpen={() => {setFocusModal('images')}} open={focusModal === 'images'} onClose={() => {setFocusModal(null)}} anchor="bottom" PaperProps={{ square: false , style: {padding: '0.8rem 1.2rem'}}} >
          <center><div style={{backgroundColor: '#516BEB', borderRadius: '100px', width: 'min(20%, 100px)', height: '4px', margin: '5px 0 20px 0'}} /></center>
          <CreatePostFormImageManager images={formData.images} handleImages={(new_imgs) => {setFormData(curr => ({...curr, images: new_imgs}))}} />
        </SwipeableDrawer> : 
        <Modal onOpen={() => {setFocusModal('images')}} open={focusModal === 'images'} onClose={() => {setFocusModal(null)}} style={{display: 'grid', placeItems: 'center'}}>
          <Box style={{display: 'grid', placeItems: 'center', backgroundColor: '#ffffff', padding: '1.7rem', borderRadius: '10px', minWidth: '300px'}}>
          <CreatePostFormImageManager images={formData.images} handleImages={(new_imgs) => {setFormData(curr => ({...curr, images: new_imgs}))}} />
          

          </Box>

        </Modal>
        }

        <StyledButton onClick={() => {setFocusModal('tags')}} style={{ outline: 'none', position: 'relative', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '0.9rem 0.5rem', flex: '1', background: 'none' }}>

          <Image src="/add_tags.png" width="20" height="20" />    
          <p style={{fontFamily: 'Poppins', marginBlock: '0', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Add Tags</p>
          {
            formData.tags.length > 0 &&
          <p style={{position: 'absolute', top: '-25%', right: '-5%', fontSize: '0.8rem', backgroundColor: '#516BEB', color: 'white', marginBlock: '0', padding: '0.2rem 0.5rem', aspectRatio: '1', borderRadius: '5px'}}>{formData.tags.length}</p>
          }

        </StyledButton>

        <StyledButton onClick={() => {setFocusModal('images')}} style={{ outline: 'none', border: '1px dashed #516BEB99', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '0.9rem 0.5rem', flex: '1', background: 'none' }}>

          <Image src="/attach_images.png" width="20" height="20" />    

          <p style={{fontFamily: 'Poppins', marginBlock: '0', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Attach Images</p>

        </StyledButton>

      </div>

      <br/>
      <br/>

      <LoadingButton loading={loading} onClick={handleSpackSubmit}  fullWidth variant='contained' sx={{backgroundColor: '#516BEB', fontFamily: 'Poppins', borderRadius: '8px', padding: '0.8rem 0', fontWeight: '600', letterSpacing: '2px'}}> Done </LoadingButton>

    </div>

  )

}

export default Post
