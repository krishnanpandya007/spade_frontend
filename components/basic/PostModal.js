// import { Avatar, Badge, Box, Button, Divider, Grid, IconButton, Modal, Tooltip, Typography } from "@material-ui/core";

import PropTypes from "prop-types";
import Link from 'next/link';
// import { ArrowBackIosOutlined, BookmarkBorderOutlined, CancelOutlined, CommentOutlined, LocalOfferOutlined, Photo, PhotoOutlined, ShareOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@material-ui/icons";

import { useContext, useEffect, useState } from "react";
import MainBody from "./postModalComponents/MainBody";
import CommentBody from "./postModalComponents/CommentBody";
import ImageBody from "./postModalComponents/ImageBody";
// import { styled } from "@material-ui/styles";
import authContext from "./contexts/layout_auth_context";
import PostModalContext from "./contexts/post_modal_context";

import React from "react";
import { Avatar, Badge, Button, DialogContent, DialogTitle, Divider, IconButton, Modal, Popover, SwipeableDrawer, Tooltip, Typography, useTheme } from "@mui/material";
import { Box, styled } from "@mui/system";
import { ArrowBackIosOutlined, BookmarkBorderOutlined, CancelOutlined, Close, CommentOutlined, FacebookOutlined, KeyboardArrowDown, LocalOfferOutlined, PhotoOutlined, Send, ShareOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { FRONTEND_ROOT_URL } from "../../config";
import { bookmark_post, unbookmark_post } from "./apis/bookmar_post";
import SnackbarContext from "./contexts/snackbar_context";
import { handle_action_comment, handle_action_create_comment } from "./handle_action";
import { LoadingButton } from "@mui/lab";
import { delink_post } from "./apis/delink_post";

// import { styled } from '@mui/material/styles';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -2,
      top: 4,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

function ShareModal({share_url, open, _onClose}){

    return (

        <Modal
        open={open}
        onClose={_onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={{p: 1, borderRadius: '5px'}}>
                Hi
            </Box>
        </Modal>

    )

}

function MobileModal({ enableDeLink,openDelink,postContextInstance, is_authenticated, current_mode, changeCurrentMode, username, openSignInDrawer }) {

    const [commentText, setCommentText] = React.useState('');

    console.log("HERERERERERER",postContextInstance)

    const theme = useTheme()
    

    const handleCommentSubmit = async () => {

        // Comment
        if(commentText.replaceAll(' ', '') === ""){
            return;
        }

            const success = await handle_action_create_comment(commentText, username, postContextInstance.post_id);

        if (success){
            // console.log('Comment Added SuccessFully')
            postContextInstance.set_data({

                ...postContextInstance,
                comments: [...postContextInstance.comments, {likes: [], author_username: username, descr: commentText, time_since: 'Just Now'}]

            })
            // comments.push({likes: [], author_username: username, descr: commentText, time_since: 'Just Now'})
            setCommentText('');

        }
        else{
            console.log("Oh no")
            // console.log("Comment isn't added")
        }

        

    }

    return (

        <SwipeableDrawer
            PaperProps={{ square: false , style: {height: '90vh', width: '100vw', padding: '0.8rem'}}}
            
            // style={{ width: '100vw', height: '90vh'}}
            // sx={{borderRadius: '20px 20px 0 0'}}
            anchor={"bottom"}
            open={postContextInstance.open}
            onClose={() => {postContextInstance.set_open(false)}}
            onOpen={() => {postContextInstance.set_open(true)}}
        >
            {/* <div style={{width: '100vw'}}> */}
                    <IconButton onClick={() => {postContextInstance.set_open(false)}} style={{position: 'absolute', top: '0', right: '0'}}>
                        <KeyboardArrowDown />
                    </IconButton>
                <br />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                    <div style={{display: 'flex', gap: '0.8rem'}}>
                    <Button disabled={postContextInstance.create_mode} onClick={() => { current_mode!=='comments'?changeCurrentMode('comments'):changeCurrentMode('main') }} variant="contained" disableElevation style={{backgroundColor: current_mode === 'comments' ? '#516BEB' : '#D9D9D9', color: current_mode === 'comments' ? '#ffffff' : '#000000', fontWeight: current_mode === 'comments' ? '500' : '400',fontFamily: 'Poppins', fontWeight: '500', borderRadius: '12px'}}>
                        Comments
                    </Button>
                    <Button onClick={() => { current_mode!=='images'?changeCurrentMode('images'):changeCurrentMode('main') }} variant="contained" disableElevation style={{backgroundColor: current_mode === 'images' ? '#516BEB' : '#D9D9D9', color: current_mode === 'images' ? '#ffffff' : '#000000', fontFamily: 'Poppins', fontWeight: '500', borderRadius: '12px'}}>
                        Images
                    </Button>
                    </div>
                    {
                    enableDeLink && 
                    <Tooltip title="De-link">
                        <IconButton onClick={openDelink}>
                            {/* <svg width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L13.3536 2.35355ZM2.03735 8.46678C2.17398 9.12619 2.66918 9.67103 3.33886 9.89338L2.57833 10.6539C1.80843 10.2534 1.23784 9.53693 1.05815 8.66967C0.999538 8.38681 0.999604 8.06004 0.999703 7.56313L0.999711 7.50001L0.999703 7.43689C0.999604 6.93998 0.999538 6.61321 1.05815 6.33035C1.29846 5.17053 2.2379 4.28039 3.4182 4.055C3.70687 3.99988 4.04134 3.99993 4.56402 4.00001L4.62471 4.00001H5.49971C5.77585 4.00001 5.99971 4.22387 5.99971 4.50001C5.99971 4.77615 5.77585 5.00001 5.49971 5.00001H4.62471C4.02084 5.00001 3.78907 5.00225 3.60577 5.03725C2.80262 5.19062 2.19157 5.78895 2.03735 6.53324C2.00233 6.70225 1.99971 6.91752 1.99971 7.50001C1.99971 8.08251 2.00233 8.29778 2.03735 8.46678ZM12.9621 6.53324C12.8255 5.87397 12.3304 5.32922 11.661 5.10679L12.4215 4.34631C13.1912 4.74686 13.7616 5.46323 13.9413 6.33035C13.9999 6.61321 13.9998 6.93998 13.9997 7.43688L13.9997 7.50001L13.9997 7.56314C13.9998 8.06005 13.9999 8.38681 13.9413 8.66967C13.701 9.8295 12.7615 10.7196 11.5812 10.945C11.2925 11.0001 10.9581 11.0001 10.4354 11L10.3747 11H9.49971C9.22357 11 8.99971 10.7762 8.99971 10.5C8.99971 10.2239 9.22357 10 9.49971 10H10.3747C10.9786 10 11.2104 9.99777 11.3937 9.96277C12.1968 9.8094 12.8079 9.21108 12.9621 8.46678C12.9971 8.29778 12.9997 8.08251 12.9997 7.50001C12.9997 6.91752 12.9971 6.70225 12.9621 6.53324Z" fill="#FF515190" fillRule="evenodd" clipRule="evenodd"></path></svg> */}
                        <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.50021 0C4.77635 0 5.0002 0.223853 5.0002 0.49999V2.49995C5.0002 2.77609 4.77635 2.99994 4.50021 2.99994C4.22408 2.99994 4.00022 2.77609 4.00022 2.49995V0.49999C4.00022 0.223853 4.22408 0 4.50021 0ZM0.646451 0.64647C0.84171 0.451212 1.15829 0.451212 1.35354 0.64647L2.85351 2.14644C3.04877 2.3417 3.04877 2.65827 2.85351 2.85353C2.65826 3.04879 2.34168 3.04879 2.14642 2.85353L0.646452 1.35356C0.451193 1.1583 0.451193 0.841728 0.646451 0.64647ZM0.00030517 4.49991C0.00030517 4.22377 0.224158 3.99992 0.500295 3.99992H2.50025C2.77639 3.99992 3.00024 4.22377 3.00024 4.49991C3.00024 4.77605 2.77639 4.9999 2.50025 4.9999H0.500295C0.224158 4.9999 0.00030517 4.77605 0.00030517 4.49991ZM12.0001 10.4998C12.0001 10.2236 12.2239 9.9998 12.5001 9.9998H14.5C14.7761 9.9998 15 10.2236 15 10.4998C15 10.7759 14.7761 10.9998 14.5 10.9998H12.5001C12.2239 10.9998 12.0001 10.7759 12.0001 10.4998ZM10.5001 11.9998C10.7762 11.9998 11.0001 12.2236 11.0001 12.4997V14.4997C11.0001 14.7758 10.7762 14.9997 10.5001 14.9997C10.224 14.9997 10.0001 14.7758 10.0001 14.4997V12.4997C10.0001 12.2236 10.224 11.9998 10.5001 11.9998ZM12.1462 12.1462C12.3415 11.951 12.658 11.951 12.8533 12.1462L14.3533 13.6462C14.5485 13.8415 14.5485 14.158 14.3533 14.3533C14.158 14.5485 13.8414 14.5485 13.6462 14.3533L12.1462 12.8533C11.951 12.6581 11.951 12.3415 12.1462 12.1462ZM7.76478 3.69938C8.19177 3.27238 8.35724 3.11008 8.5116 3.00522C9.18794 2.54577 10.0431 2.53677 10.6784 2.95401C10.8227 3.04875 10.9767 3.19911 11.3886 3.61099C11.8005 4.02287 11.9509 4.17694 12.0456 4.3212C12.4628 4.95653 12.4539 5.81168 11.9944 6.48802C11.8895 6.64238 11.7272 6.80785 11.3002 7.23484L10.6815 7.85354C10.4863 8.0488 10.4863 8.36538 10.6815 8.56064C10.8768 8.75589 11.1934 8.75589 11.3886 8.56064L12.0073 7.94193L12.0502 7.89903C12.4199 7.5295 12.6564 7.29303 12.8216 7.04993C13.4968 6.05598 13.5316 4.7623 12.8815 3.77228C12.7229 3.53083 12.4918 3.29982 12.1404 2.94853L12.0957 2.9039L12.0511 2.85925C11.6998 2.50782 11.4688 2.27672 11.2273 2.11816C10.2373 1.46798 8.94364 1.50284 7.94968 2.17805C7.70659 2.34319 7.47012 2.57973 7.1006 2.94936L7.1006 2.94937L7.05769 2.99228L6.43898 3.61099C6.24372 3.80625 6.24372 4.12282 6.43898 4.31808C6.63424 4.51334 6.95081 4.51334 7.14607 4.31808L7.76478 3.69938ZM2.99191 7.05807L2.94899 7.10097C2.57935 7.4705 2.34282 7.70697 2.17767 7.95006C1.50246 8.94401 1.4676 10.2377 2.11778 11.2277C2.27634 11.4692 2.50744 11.7002 2.85886 12.0515L2.85888 12.0515L2.90352 12.0961L2.94815 12.1407L2.94815 12.1407L2.94817 12.1408C3.29945 12.4922 3.53045 12.7233 3.7719 12.8818C4.76193 13.532 6.0556 13.4972 7.04956 12.8219C7.29265 12.6568 7.52912 12.4203 7.89865 12.0506L7.94155 12.0077L8.56026 11.389C8.75552 11.1937 8.75552 10.8772 8.56026 10.6819C8.365 10.4867 8.04842 10.4867 7.85317 10.6819L7.23446 11.3006C6.80747 11.7276 6.642 11.8899 6.48764 11.9948C5.8113 12.4542 4.95615 12.4632 4.32082 12.046C4.17656 11.9512 4.02249 11.8009 3.61061 11.389C3.19873 10.9771 3.04837 10.8231 2.95363 10.6788C2.53639 10.0435 2.54539 9.18832 3.00484 8.51198C3.10971 8.35761 3.27201 8.19215 3.699 7.76516L4.3177 7.14645C4.51296 6.95119 4.51296 6.63462 4.3177 6.43936C4.12245 6.2441 3.80587 6.2441 3.61061 6.43936L2.99191 7.05807Z" fill="#FF5151" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </IconButton>
                    </Tooltip>
                    }
                </div>
                {/* OH YEAH HEIGHT OF 69 BABY  XD*/}
                <div style={{height: '75%', overflow: 'auto'}}> 
                    {current_mode === 'main' ? <><h2 style={{padding: '1rem 0.5rem', fontFamily: 'Poppins', color: '#516BEB', marginBottom: '2px', fontWeight: '600'}}>{postContextInstance.title}</h2>

                    <div style={{height: '100%', overflowY: 'auto'}}>
                        <div dangerouslySetInnerHTML={{__html: postContextInstance.descr}} style={{padding: '0.5rem', color: theme.palette.mode !== 'dark' && '#2C3333', lineHeight:'2.5ch',margin: '0', fontSize:'14px', fontWeight: '400', fontFamily: 'Poppins'}}></div>

                    </div></>: current_mode === 'comments' ? <CommentBody comments={postContextInstance.comments} username={'krishnan'} /> : <ImageBody createMode={postContextInstance.create_mode} images={[postContextInstance.image_1, postContextInstance.image_2, postContextInstance.image_3, postContextInstance.image_4]} />}

                </div>
                <div style={{ display: 'flex', margin: '0rem 0.5rem', alignItems: 'center', gap: '1rem'}}>
                    <strong style={{width: '5ch'}}>Tags:</strong>
                    <div style={{display: 'flex',justifyContent: 'flex-start', alignItems: 'center', gap: '0.8rem', overflowX: 'auto', width: '300px', flexWrap: 'nowrap', flexDirection: 'row'}}>
                        {
                            postContextInstance.tags?.length ? 
                                postContextInstance.tags.map((val, idx) => (
                                    <Link key={idx} href={`/explore/tag/${val}`}><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0', backgroundColor: '#516BEB',letterSpacing: '2px', fontFamily: 'Roboto', textTransform: 'uppercase', fontSize: '0.89rem'}}>{val}</a></Link>
                                ))
                            :<div style={{padding: '0.3rem 1rem', color: 'black', border: '1px solid #c4c4c4',fontWeight: '200', borderRadius: '10px', flexShrink: '0', fontFamily: 'Roboto', fontSize: '0.88rem'}}>No Tags Included</div>
                        }
                        {/* <Link href="/"><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0', backgroundColor: '#516BEB', minWidth: 'auto',letterSpacing: '2px', fontFamily: 'Poppins', textTransform: 'uppercase'}}>Call of Duty</a></Link>
                        <Link href="/"><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0',backgroundColor: '#516BEB', letterSpacing: '2px', fontFamily: 'Poppins', textTransform: 'uppercase'}}>Call of Duty</a></Link> */}

                    </div>
                </div>
                <div style={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center',width: 'calc(100vw - 2rem)', position: 'absolute', bottom: '1vh', height: '3.8rem', backgroundColor: 'white', padding: '0 1rem'}}>
                    <input disabled={!is_authenticated} value={commentText} onChange={(e) => {setCommentText(e.target.value)}} placeholder="Quick Comment..." style={{ width: '80%', height: "80%", outline: 'none', border: '1px solid #A4A4A4', borderRadius: '10px', paddingLeft: '0.9rem', fontFamily: 'Poppins', fontSize: '1rem' }}/>
                    <IconButton disabled={postContextInstance.create_mode} onClick={is_authenticated?handleCommentSubmit:openSignInDrawer}>
                        <Send style={{color: '#516BEB'}} fontSize='large' />
                    </IconButton>
                </div>

            {/* </div> */}
      </SwipeableDrawer> 

    )

}

function PostModal() {
// {username, title, descr, likes, dislikes, is_bookmarked, is_liked, is_disliked, tags, images, post_id,onFormSubmit, CreateMode, isOpen, _onClose, comments, handleParentLiked, handleParentDisliked}
    const auth = useContext(authContext)
    const snackbarContext = useContext(SnackbarContext)
    const postModalContext = useContext(PostModalContext)
    console.log(postModalContext)
    // Friend To PostModalContext Commit
    const [currentMode, setCurrentMode] = useState('main') // Any of ['main', 'images', 'comments']
    const [modal_title, setModalTitle] = useState({main: postModalContext.title, image: "Attached Images", comment: "Comments"})

    const [delinkOpen, setDelinkOpen] = React.useState(false);
    const [delinking, setDelinking] = React.useState(false)
    const theme = useTheme();

    // Friend To PostModalContext Commit

    // postmodal args. changed and postModalContext.open needs to be changed

    const unBookmark =  () => {
        const success = unbookmark_post(postModalContext.post_id);

        if(!success){
            alert("Error while adding Bookmark")
        }
        else{

            snackbarContext.close()
        }

    }

    // Friend To PostModalContext Commit
    const handleAddBookmark = async () => {

        const success = await bookmark_post(postModalContext.post_id);

        if(success) {
            // snackbarContext.undo_action(unBookmark)
            snackbarContext.open('simple', "Bookmark Added!", true, unBookmark);


        }

    }


    const HandleLike = ()=> {

        if(!auth.is_authenticated) {
            auth.set_open_drawer(true, "Login Required !")
            return;
        }
        
        postModalContext.like();
   

    }


    const delinkPost = async () => {

        setDelinking(true)

        const success = await delink_post(postModalContext.post_id)
        
        if (success){
                window.location.reload()
                snackbarContext.open('success', "Post De-linked Successfully")
        }else{
            snackbarContext.open('error', "Please try again later")
        }
            
        setDelinking(false)

    }

    const HandleDislike = ()=> {


        if(!auth.is_authenticated) {
            auth.set_open_drawer(true, "Login Required !")
            return;
        }

        postModalContext.dislike();

    }


    return (
        <>
        
        <Modal
            open={delinkOpen}
            onClose={() => {setDelinkOpen(false)}}
        >

            <Box style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'max(350px, 30vw)',
                backgroundColor: theme.palette.mode === 'light' ? '#f4f4f4' : '#2C3333',
                borderRadius: '5px',
                boxShadow: 24,
                padding: '0px 5px 1rem 5px',
            }}>
                <DialogTitle sx={{fontSize: '1.4rem', fontWeight: '900',color: '#FF4949', fontFamily: 'Poppins'}}>Are You sure?</DialogTitle>
                <Divider variant="middle" />
                <DialogContent style={{fontWeight: '400', fontFamily: 'Poppins', color :theme.palette.text.default}}><b>This action is not reversable!</b> De-link this post from your profile?<br/><a style={{color: '#5800FF', textDecoration: 'underline', fontSize: '0.8rem'}} href="https://docs.spadebeta.in/feature-delink-post">...</a></DialogContent>
                {/* <p>By <b><i>De-Link</i></b> ing the post</p> */}
                <DialogContent>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Button onClick={() => {setDelinkOpen(false)}}>Cancel</Button>
                    <LoadingButton onClick={delinkPost} loading={delinking} color="error" sx={{fontWeight: '600', fontFamily:'Poppins', textTransform: 'initial' }} disableElevation variant="contained">I Agree, De-link</LoadingButton>
                </div>
                </DialogContent>
            </Box>
        </Modal>

        {
        auth.is_on_mobile ? <MobileModal enableDeLink={auth.user_data.username === postModalContext.author}  openDelink={() => {setDelinkOpen(true)}} openSignInDrawer={() => {auth.set_open_drawer(true, "Login Required!")}} current_mode={currentMode} changeCurrentMode={setCurrentMode} postContextInstance={postModalContext} is_authenticated={auth.is_authenticated} username={auth.user_data.username} />:
        <Modal
        aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={postModalContext.open}
            onClose={() => {postModalContext.set_open(false)}}
            // BackdropComponent={Backdrop}/
            style={{border: 'none', display: 'grid', placeItems: 'center', height: 'clamp(400px, 80vh, 900px)'}}
        >
            {/* <ShareModal }/> */}
            {/* <Modal></Modal> */}
            {/* <Popover open={shareOpen} onClose={() => {setShareOpen(false)}}>
                <FacebookOutlined />
            </Popover> */}
            <Box sx={{backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#1B2430', padding: '0.8% 1%', borderRadius: '8px', outline: 'none', width: 'clamp(500px,65vw,1300px)', height: 'clamp(400px, 80vh, 900px)', marginTop: '10vh'}}>
            
                <div style={{flex: '1', display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <div style={{width: '60%', display: 'flex', textAlign: 'center'}}>
                            <Avatar alt={"DP"} style={{marginRight: '1.2%'}} src={postModalContext.profile_pic} />
                            <Link href={`/view_profile/${postModalContext.author}`} >
                                <a style={{fontWeight: '400', fontFamily: 'Roboto', display: 'grid', placeItems: 'center'}}>{postModalContext.author}</a>
                            </Link>
                        </div>
                        {
                            currentMode !== "image"?
                            <Button variant="outlined" onClick={() => {setCurrentMode('image')}} style={{textTransform: 'capitalize'}} endIcon={<PhotoOutlined />} >View Images</Button>
                            :
                            <Button variant="outlined" onClick={() => {setCurrentMode('main')}} endIcon={<CancelOutlined />} >cancel</Button>

                        }

                    </div>
                    <div style={{flex: '8', padding: '1%',display: 'flex', flexDirection: 'column',width: '100%', textAlign: 'center', height: '100%'}}>
                        <div style={{flex: '0.2', width: '100%', display: 'grid', placeItems: 'center'}}>
                            <Typography variant="h5" style={{fontFamily: 'Roboto', fontWeight: '400'}}><strong>{(currentMode === "main" && postModalContext.title) || modal_title[currentMode]}</strong></Typography>
                            
                        </div>
                        <Divider variant="middle" />
                        {/* <br /> */}
                        <div style={{flex: '10', maxHeight: '80%', overflow: 'auto',width :'100%', textAlign: 'left', marginTop: '0.6%', lineHeight: '180%', fontFamily: 'Inter', scrollBehavior: 'smoooth'}}>

                            {/* <MainBody /> */}
                            {/* <CommentBody /> */}
                            {/* <ImageBody createMode={CreateMode} images={images} /> */}
                            {
                                currentMode === "main" ? 
                                <MainBody descr={postModalContext.descr} />:
                                (currentMode === "image"?
                                    <ImageBody createMode={postModalContext.create_mode} images={postModalContext.images} />:
                                    <CommentBody comments={postModalContext.comments} username={auth.user_data.username} />

                                )
                            }
                        </div>
                        <div style={{flex: '0.4', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex'}}>
                                <Button style={{marginRight: '3%'}}  variant="outlined" endIcon={<ThumbUpAltOutlined color={postModalContext.is_liked ? "primary" : "default"} />} onClick={HandleLike} >{postModalContext.likes_count}</Button> 
                                <Button style={{marginRight: '3%'}} variant="outlined" endIcon={<ThumbDownAltOutlined color={postModalContext.is_disliked ? "secondary" : "default"} />} onClick={HandleDislike} >{postModalContext.dislikes_count}</Button>
                                { currentMode !== "comment"?
                                    <Button onClick={() => {setCurrentMode('comment')}} disabled={postModalContext.create_mode} style={{marginRight: '3%', width: '100%'}} variant="outlined"  endIcon={<CommentOutlined />} >Comment</Button>
                                    :
                                    <Button onClick={() => {setCurrentMode('main')}} style={{marginRight: '3%'}} variant="outlined" endIcon={<ArrowBackIosOutlined />} >post</Button>

                                }
                                {/* <Button style={{marginRight: '3%'}} variant="outlined" endIcon={<LocalOfferOutlined />} >Tags</Button> */}
                                <StyledBadge badgeContent={postModalContext.len_tags} color="primary">
                                    <Tooltip title="Number of tags included">
                                        <LocalOfferOutlined style={{marginLeft: '5%', transform: 'translate(15%, 15%)', display: 'grid', placeItems: 'center'}} />
                                    </Tooltip>
                                </StyledBadge>







{/* FRONTEND::: DESIGN UI MANUALLY */}








                            </div>
                            {
                            auth.user_data.username === postModalContext.author && 
                            <Tooltip title="De-Link">
                                <IconButton onClick={() => {setDelinkOpen(true)}}>
                                    <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L13.3536 2.35355ZM2.03735 8.46678C2.17398 9.12619 2.66918 9.67103 3.33886 9.89338L2.57833 10.6539C1.80843 10.2534 1.23784 9.53693 1.05815 8.66967C0.999538 8.38681 0.999604 8.06004 0.999703 7.56313L0.999711 7.50001L0.999703 7.43689C0.999604 6.93998 0.999538 6.61321 1.05815 6.33035C1.29846 5.17053 2.2379 4.28039 3.4182 4.055C3.70687 3.99988 4.04134 3.99993 4.56402 4.00001L4.62471 4.00001H5.49971C5.77585 4.00001 5.99971 4.22387 5.99971 4.50001C5.99971 4.77615 5.77585 5.00001 5.49971 5.00001H4.62471C4.02084 5.00001 3.78907 5.00225 3.60577 5.03725C2.80262 5.19062 2.19157 5.78895 2.03735 6.53324C2.00233 6.70225 1.99971 6.91752 1.99971 7.50001C1.99971 8.08251 2.00233 8.29778 2.03735 8.46678ZM12.9621 6.53324C12.8255 5.87397 12.3304 5.32922 11.661 5.10679L12.4215 4.34631C13.1912 4.74686 13.7616 5.46323 13.9413 6.33035C13.9999 6.61321 13.9998 6.93998 13.9997 7.43688L13.9997 7.50001L13.9997 7.56314C13.9998 8.06005 13.9999 8.38681 13.9413 8.66967C13.701 9.8295 12.7615 10.7196 11.5812 10.945C11.2925 11.0001 10.9581 11.0001 10.4354 11L10.3747 11H9.49971C9.22357 11 8.99971 10.7762 8.99971 10.5C8.99971 10.2239 9.22357 10 9.49971 10H10.3747C10.9786 10 11.2104 9.99777 11.3937 9.96277C12.1968 9.8094 12.8079 9.21108 12.9621 8.46678C12.9971 8.29778 12.9997 8.08251 12.9997 7.50001C12.9997 6.91752 12.9971 6.70225 12.9621 6.53324Z" fill="#FF5151" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                </IconButton>
                            </Tooltip>
                            }
                            <div style={{display: 'flex'}}>
                                {/* <Button variant="outlined" endIcon={<BookmarkBorderOutlined />} /> */}
                                {!postModalContext.create_mode?
                                    <>
                                    <Button onClick={handleAddBookmark}>Add Bookmark</Button>

                                    </>
                                    :
                                    null
                                    // <Button variant="contained" color="primary">Close</Button>
                                }
                            </div>
                            
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
}
    </>
    )
}

export default PostModal;

PostModal.propTypes = {

    username: PropTypes.string.isRequired,

    title: PropTypes.string.isRequired,

    descr: PropTypes.string.isRequired,

    likes: PropTypes.number.isRequired,

    dislikes: PropTypes.number.isRequired,

    is_bookmarked: PropTypes.bool,

    is_liked: PropTypes.bool,

    is_disliked: PropTypes.bool,

    tags: PropTypes.array.isRequired,

    images: PropTypes.array,

    CreateMode: PropTypes.bool,

    onFormSubmit: PropTypes.func,

    isOpen: PropTypes.bool,

    _onClose: PropTypes.func,

};

PostModal.defaultProps = {

    CreateMode: false,
    images: [null, null, null, null], // [path_to_image_A, path_to_image_B, ...]
    title: 'No Title',
    is_disliked: false,
    is_liked: false,
    is_bookmarked: false,
    is_open: false,
    _onClose: ()=>{console.error("No OnClose Action handler passed: (PostModal)")},

}