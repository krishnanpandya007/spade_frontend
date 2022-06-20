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
import { Avatar, Badge, Button, Divider, IconButton, Modal, Popover, Tooltip, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { ArrowBackIosOutlined, BookmarkBorderOutlined, CancelOutlined, CommentOutlined, FacebookOutlined, LocalOfferOutlined, PhotoOutlined, ShareOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
import { FRONTEND_ROOT_URL } from "../../config";
import { bookmark_post, unbookmark_post } from "./apis/bookmar_post";
import SnackbarContext from "./contexts/snackbar_context";

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
function PostModal() {
// {username, title, descr, likes, dislikes, is_bookmarked, is_liked, is_disliked, tags, images, post_id,onFormSubmit, CreateMode, isOpen, _onClose, comments, handleParentLiked, handleParentDisliked}
    const auth = useContext(authContext)
    const snackbarContext = useContext(SnackbarContext)
    const postModalContext = useContext(PostModalContext)

    // Friend To PostModalContext Commit
    const [currentMode, setCurrentMode] = useState('main') // Any of ['main', 'images', 'comments']
    const [modal_title, setModalTitle] = useState({main: postModalContext.title, image: "Attached Images", comment: "Comments"})

    // Friend To PostModalContext Commit

    // postmodal args. changed and postModalContext.open needs to be changed

    console.log("Rendered")

    useEffect(() => {
        console.log("POST_MODAL",postModalContext)
    }, [])

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
        <Modal
        aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={postModalContext.open}
            onClose={() => {postModalContext.set_open(false)}}
            // BackdropComponent={Backdrop}/
            style={{border: 'none', display: 'grid', placeItems: 'center'}}
        >
            {/* <ShareModal }/> */}
            {/* <Modal></Modal> */}
            {/* <Popover open={shareOpen} onClose={() => {setShareOpen(false)}}>
                <FacebookOutlined />
            </Popover> */}
            <Box sx={{backgroundColor: '#f5f5f5', padding: '0.8% 1%', borderRadius: '8px', outline: 'none', width: '1300px', height: '900px'}}>
            
                <div style={{flex: '1', display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                        <div style={{width: '60%', display: 'flex', textAlign: 'center'}}>
                            <Avatar alt={"DP"} style={{marginRight: '1.2%'}} src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
                            <Link href="/" >
                                <a style={{fontWeight: '400', fontFamily: 'Roboto', display: 'grid', placeItems: 'center'}}>{postModalContext.username}</a>
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
                                    <ImageBody createMode={false} images={postModalContext.images} />:
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
                                    <Button variant="contained" color="primary" onClick={onFormSubmit}>Publish</Button>
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