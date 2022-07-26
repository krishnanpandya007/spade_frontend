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
import { Avatar, Badge, Button, Divider, IconButton, Modal, Popover, SwipeableDrawer, Tooltip, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { ArrowBackIosOutlined, BookmarkBorderOutlined, CancelOutlined, Close, CommentOutlined, FacebookOutlined, KeyboardArrowDown, LocalOfferOutlined, PhotoOutlined, Send, ShareOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { FRONTEND_ROOT_URL } from "../../config";
import { bookmark_post, unbookmark_post } from "./apis/bookmar_post";
import SnackbarContext from "./contexts/snackbar_context";
import { handle_action_comment, handle_action_create_comment } from "./handle_action";

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

function MobileModal({ postContextInstance, current_mode, changeCurrentMode, username }) {

    const [commentText, setCommentText] = React.useState('');


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
                <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem'}}>

                    <Button disabled={postContextInstance.create_mode} onClick={() => { current_mode!=='comments'?changeCurrentMode('comments'):changeCurrentMode('main') }} variant="contained" disableElevation style={{backgroundColor: current_mode === 'comments' ? '#516BEB' : '#D9D9D9', color: current_mode === 'comments' ? '#ffffff' : '#000000', fontWeight: current_mode === 'comments' ? '500' : '400',fontFamily: 'Poppins', fontWeight: '500', borderRadius: '12px'}}>
                        Comments
                    </Button>
                    <Button onClick={() => { current_mode!=='images'?changeCurrentMode('images'):changeCurrentMode('main') }} variant="contained" disableElevation style={{backgroundColor: current_mode === 'images' ? '#516BEB' : '#D9D9D9', color: current_mode === 'images' ? '#ffffff' : '#000000', fontFamily: 'Poppins', fontWeight: '500', borderRadius: '12px'}}>
                        Images
                    </Button>
                </div>
                {/* OH YEAH HEIGHT OF 69 BABY  XD*/}
                <div style={{height: '75%', overflow: 'auto'}}> 
                    {current_mode === 'main' ? <><h2 style={{padding: '1rem 0.5rem', fontFamily: 'Poppins', color: '#516BEB', marginBottom: '2px', fontWeight: '600'}}>{postContextInstance.title}</h2>

                    <div style={{height: '100%', overflowY: 'auto'}}>
                        <div dangerouslySetInnerHTML={{__html: postContextInstance.descr}} style={{padding: '0.5rem', color: '#2C3333', lineHeight:'2.5ch',margin: '0', fontSize:'14px', fontWeight: '400', fontFamily: 'Poppins'}}></div>

                    </div></>: current_mode === 'comments' ? <CommentBody comments={postContextInstance.comments} username={'krishnan'} /> : <ImageBody createMode={postContextInstance.create_mode} images={[postContextInstance.image_1, postContextInstance.image_2, postContextInstance.image_3, postContextInstance.image_4]} />}

                </div>
                <div style={{ display: 'flex', margin: '0rem 0.5rem', alignItems: 'center', gap: '1rem'}}>
                    <strong style={{width: '5ch'}}>Tags:</strong>
                    <div style={{display: 'flex',justifyContent: 'flex-start', alignItems: 'center', gap: '0.8rem', overflowX: 'auto', width: '300px', flexWrap: 'nowrap', flexDirection: 'row'}}>
                        {
                            postContextInstance.tags?.length ? 
                                postContextInstance.tags.map((val, idx) => (
                                    <Link key={idx} href={`/explore/tag/${val}`}><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0', backgroundColor: '#516BEB',letterSpacing: '2px', fontFamily: 'Poppins', textTransform: 'uppercase'}}>Pubg</a></Link>
                                ))
                            :<div style={{padding: '0.3rem 1rem', color: 'black', border: '1px solid #c4c4c4',fontWeight: '200', borderRadius: '10px', flexShrink: '0', fontFamily: 'Roboto', fontSize: '0.88rem'}}>No Tags Included</div>
                        }
                        {/* <Link href="/"><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0', backgroundColor: '#516BEB', minWidth: 'auto',letterSpacing: '2px', fontFamily: 'Poppins', textTransform: 'uppercase'}}>Call of Duty</a></Link>
                        <Link href="/"><a style={{padding: '0.45rem 1.5rem', color: 'white', fontWeight: '500', borderRadius: '10px', flexShrink: '0',backgroundColor: '#516BEB', letterSpacing: '2px', fontFamily: 'Poppins', textTransform: 'uppercase'}}>Call of Duty</a></Link> */}

                    </div>
                </div>

                <div style={{ display: 'flex',justifyContent: 'space-between', alignItems: 'center',width: 'calc(100vw - 2rem)', position: 'absolute', bottom: '1vh', height: '3.8rem', backgroundColor: 'white', padding: '0 1rem'}}>
                    <input value={commentText} onChange={(e) => {setCommentText(e.target.value)}} placeholder="Quick Comment..." style={{ width: '80%', height: "80%", outline: 'none', border: '1px solid #A4A4A4', borderRadius: '10px', paddingLeft: '0.9rem', fontFamily: 'Poppins', fontSize: '1rem' }}/>
                    <IconButton disabled={postContextInstance.create_mode} onClick={handleCommentSubmit}>
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


    const HandleDislike = ()=> {


        if(!auth.is_authenticated) {
            auth.set_open_drawer(true, "Login Required !")
            return;
        }

        postModalContext.dislike();

    }


    return (
        auth.is_on_mobile ? <MobileModal current_mode={currentMode} changeCurrentMode={setCurrentMode} postContextInstance={postModalContext} username={auth.user_data.username} />:
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
            <Box sx={{backgroundColor: '#f5f5f5', padding: '0.8% 1%', borderRadius: '8px', outline: 'none', width: 'clamp(500px,65vw,1300px)', height: 'clamp(400px, 80vh, 900px)', marginTop: '10vh'}}>
            
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