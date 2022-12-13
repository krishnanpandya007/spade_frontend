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
import { Modal, Slider, SwipeableDrawer, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import emotion_styled from '@emotion/styled'
import { useContext } from 'react';
import SnackbarContext from '../../components/basic/contexts/snackbar_context';
import authContext from '../../components/basic/contexts/layout_auth_context';
import CreatePostTagManager from '../../components/CreatePostTagManager';
import CreatePostFormImageManager from '../../components/CreatePostFormImageManager';
import { Box } from '@mui/system';
import { FRONTEND_ROOT_URL } from '../../config';
// import ImageCompressor from '../../components/basic/ImageCompressor';
import dynamic from 'next/dynamic';
import { styled }  from '@mui/styles';

const ImageCompressor = dynamic(() => import("../../components/basic/ImageCompressor"), {ssr: false})

const StyledButton = emotion_styled('button')`
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

const CustomInput = emotion_styled(`input`)`

&:invalid{

  border: 3px solid blue;

}

`

const CustomSlider = styled(Slider)(({ theme }) => ({
  
  width: '150px',
  "& .MuiSlider-thumb": {
    padding: '30px',
    
    border: '2px solid #516BEB',
    backgroundColor: '#DDE1F2'
    // paddingLeft: '40px'
  },
  "& .MuiSlider-mark": {
  },
  "& .MuiSlider-rail": {
    height: '40px',
    background: 'none'
  }
}));

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
  const [compressing, setCompressing] = React.useState(false);
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
  React.useEffect(async () => {
    // Load Success Audio
    audioRef.current = new Audio('/spack_success.m4a');

  }, [])

  const handleSpackSubmit = async (force=false) => {

    
    
    if(!titleRef.current.value || titleRef.current.value.length < 6){
      
      snackbar.open("info", "Title with 6 or more chars. suits perfetly")
      titleRef.current.focus();
      return;
    }

    if(!descrRef.current.value){
      snackbar.open("info", "Spack without content? 🤨")

      descrRef.current.focus();
      return;
    }
    // titleRef  
    
    if(!auth.is_authenticated){
      
      // Can;t open signinDrawer
      auth.set_open_drawer(true, "Login Required!");
      return;
    }

    if(!force && (Object.keys(formData.images).length > 0)){
      setCompressing(true);
      return;
    }
    setLoading(true);
    
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

      setLoading("success")
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

    setFormData(currFormData => ({...currFormData, tags: [...currFormData.tags, tag_name]}));

  }

  const removeTag = (remove_tag) => {

    setFormData(currFormData => ({...currFormData, tags: currFormData.tags.filter((tag) => tag!== remove_tag)}));

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
        {!compressing && (auth.is_on_mobile ? <SwipeableDrawer onOpen={() => {setFocusModal('images')}} open={focusModal === 'images'} onClose={() => {setFocusModal(null)}} anchor="bottom" PaperProps={{ square: false , style: {padding: '0.8rem 1.2rem'}}} >
          <center><div style={{backgroundColor: '#516BEB', borderRadius: '100px', width: 'min(20%, 100px)', height: '4px', margin: '5px 0 20px 0'}} /></center>
          <CreatePostFormImageManager images={formData.images} handleImages={(new_imgs) => {setFormData(curr => ({...curr, images: new_imgs}))}} />
        </SwipeableDrawer> : 
        <Modal onOpen={() => {setFocusModal('images')}} open={focusModal === 'images'} onClose={() => {setFocusModal(null)}} style={{display: 'grid', placeItems: 'center'}}>
          <Box style={{display: 'grid', placeItems: 'center', backgroundColor: '#ffffff', padding: '1.7rem', borderRadius: '10px', minWidth: '300px'}}>
          <CreatePostFormImageManager images={formData.images} handleImages={(new_imgs) => {setFormData(curr => ({...curr, images: new_imgs}))}} />
          

          </Box>

        </Modal>)
        }

        <StyledButton onClick={() => {setFocusModal('tags')}} style={{ outline: 'none', position: 'relative', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '0.9rem 0.5rem', flex: '1', background: 'none' }}>

          <Image src="/add_tags.png" width="20" height="20" />    
          <p style={{fontFamily: 'Poppins', marginBlock: '0', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Add Tags</p>
          {
            formData.tags.length > 0 &&
          <p style={{position: 'absolute', top: '-25%', right: '-5%', fontSize: '0.8rem', backgroundColor: '#516BEB', color: 'white', marginBlock: '0', padding: '0.2rem 0.5rem', aspectRatio: '1', borderRadius: '5px'}}>{formData.tags.length}</p>
          }

        </StyledButton>

        <StyledButton disabled={compressing} onClick={() => {setFocusModal('images')}} style={{ outline: 'none', border: '1px dashed #516BEB99', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', padding: '0.9rem 0.5rem', flex: '1', background: 'none' }}>

          <Image src="/attach_images.png" width="20" height="20" />    

          <p style={{fontFamily: 'Poppins', marginBlock: '0', color: theme.palette.mode === 'dark' ? 'white' : 'black'}}>Attach Images</p>

        </StyledButton>

      </div>

      <br/>
      {
        compressing &&
          <ImageCompressor imgs={formData.images} setImgs={(new_imgs) => {setFormData(curr => ({...curr, images: new_imgs}))}} success_cb={handleSpackSubmit} />
      }
  <div style={{border: '1px solid #516BEB', width: '210px', padding: '8px -5px 5px 25px', borderRadius: '100px', transform: 'scale(0.8)', position: 'relative'}}>
      {/* Do actions only when user left up thumb from slider */}
      {/* onChangeCommited = reset_position */}
      <CustomSlider track={false} step={10} min={20} max={50} defaultValue={20} onChangeCommitted={(e) => {alert("Doing Actions")}} />
      
      
      <svg style={{position: 'absolute', left: '1.6rem', transform: 'translateY(30%)'}} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_301_251)">
      <path d="M10.6668 10.1734C10.6668 10.4917 10.5529 10.7995 10.3458 11.0412L7.15185 14.7674C6.86677 15.1 6.39191 15.1959 6.00011 15C5.61758 14.8087 5.4339 14.3653 5.56914 13.9596L6.66677 10.6667H3.59772C3.51774 10.6667 3.43791 10.6595 3.35921 10.6452C2.63471 10.5134 2.15417 9.81932 2.2859 9.09482L3.13438 4.42815C3.24965 3.79417 3.80183 3.33333 4.44621 3.33333H9.33344C10.0698 3.33333 10.6668 3.93029 10.6668 4.66667V10.1734Z" stroke="#9AA9F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.3335 10V4" stroke="#9AA9F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
      <clipPath id="clip0_301_251">
      <rect width="16" height="16" fill="white"/>
      </clipPath>
      </defs>
      </svg>

      <p style={{position: 'absolute', left: '1.6rem', bottom: '0', transform: 'translateY(190%)'}}>3</p>

      <svg style={{position: 'absolute', left: '60%', transform: 'translateY(30%)'}} width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_301_211)">
        <path d="M5.3335 5.82657C5.3335 5.50828 5.44735 5.2005 5.65449 4.95884L8.84843 1.23258C9.13351 0.89999 9.60836 0.804098 10.0002 1C10.3827 1.19127 10.5664 1.63471 10.4311 2.04044L9.3335 5.33333H12.4025C12.4825 5.33333 12.5624 5.34053 12.6411 5.35484C13.3656 5.48657 13.8461 6.18068 13.7144 6.90518L12.8659 11.5718C12.7506 12.2058 12.1984 12.6667 11.5541 12.6667H6.66683C5.93045 12.6667 5.3335 12.0697 5.3335 11.3333V5.82657Z" stroke="#9AA9F1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2.6665 12V6" stroke="#9AA9F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>
        <defs>
        <clipPath id="clip0_301_211">
        <rect width="16" height="16" fill="white"/>
        </clipPath>
        </defs>
      </svg>
      <p style={{position: 'absolute', left: '60%', bottom: '0', transform: 'translateY(190%)'}}>12</p>

      <svg style={{position: 'absolute', right: '9%', transform: 'translateY(30%)'}} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 7.50003C5 8.32845 4.32843 9.00003 3.5 9.00003C2.67157 9.00003 2 8.32845 2 7.50003C2 6.6716 2.67157 6.00003 3.5 6.00003C4.32843 6.00003 5 6.6716 5 7.50003ZM5.71313 8.66388C5.29445 9.45838 4.46048 10 3.5 10C2.11929 10 1 8.88074 1 7.50003C1 6.11931 2.11929 5.00003 3.5 5.00003C4.46048 5.00003 5.29445 5.54167 5.71313 6.33616L9.10424 4.21671C9.03643 3.98968 9 3.74911 9 3.50003C9 2.11932 10.1193 1.00003 11.5 1.00003C12.8807 1.00003 14 2.11932 14 3.50003C14 4.88074 12.8807 6.00003 11.5 6.00003C10.6915 6.00003 9.97264 5.61624 9.51566 5.0209L5.9853 7.22738C5.99502 7.31692 6 7.40789 6 7.50003C6 7.59216 5.99502 7.68312 5.9853 7.77267L9.51567 9.97915C9.97265 9.38382 10.6915 9.00003 11.5 9.00003C12.8807 9.00003 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5C9 11.2509 9.03643 11.0104 9.10425 10.7833L5.71313 8.66388ZM11.5 5.00003C12.3284 5.00003 13 4.32846 13 3.50003C13 2.6716 12.3284 2.00003 11.5 2.00003C10.6716 2.00003 10 2.6716 10 3.50003C10 4.32846 10.6716 5.00003 11.5 5.00003ZM13 11.5C13 12.3285 12.3284 13 11.5 13C10.6716 13 10 12.3285 10 11.5C10 10.6716 10.6716 10 11.5 10C12.3284 10 13 10.6716 13 11.5Z" fill="#9AA9F1"/>
      </svg>



  </div>

      <br/>
      <br/>
      <br/>
      <br/>

      <LoadingButton loading={loading === true} disabled={compressing || loading==='success'} onClick={(e) => {handleSpackSubmit()}}  fullWidth variant='contained' sx={{backgroundColor: '#516BEB', fontFamily: 'Poppins', borderRadius: '8px', padding: '0.8rem 0', fontWeight: '600', letterSpacing: '2px'}}> Done </LoadingButton>

    </div>

  )

}

export default Post
