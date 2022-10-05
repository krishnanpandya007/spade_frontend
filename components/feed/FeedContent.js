// import { Alert, Avatar, Button, Chip, Divider, Fade, FormControl, Grid, IconButton, OutlinedInput, Slide, Snackbar,  Tooltip, Typography } from '@material-ui/core'

import React, {useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
// import InsertPhotoRoundedIcon from '@material-ui/icons/InsertPhotoRounded';

// import Lottie from 'react-lottie'
// import Lottie from 'react-lottie'
// import LikeAnimationData from './like-anim-final'
// import { BookmarkBorderRounded, Search, Send, SendOutlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';


// import ModalUnstyled from '@mui/base/ModalUnstyled';
// import { Box, styled } from '@material-ui/system';
import { styled, Box, useTheme } from '@mui/system';
import {Chip, Fade, IconButton, Modal, Slide, Snackbar, Tooltip} from '@mui/material';
// import { ModalUnstyled } from '@material-ui/unstyled';
// import avatar_pic from './avatar_1.jpg'
// import { Fade, Snackbar, Tooltip } from '@material-ui/core';


import { defaultBorderColor, FRONTEND_ROOT_URL } from '../../config';
import PostModal from '../basic/PostModal';
import { handle_action_create_comment, handle_action_post } from '../basic/handle_action';
import { ContentCopyOutlined, InsertPhotoRounded, Send, ShareOutlined,ThumbDownAltOutlined, ThumbUpAltOutlined } from '@mui/icons-material';
import SnackbarContext from '../basic/contexts/snackbar_context';

import emotion_styled from '@emotion/styled'
// import { red } from '@material-ui/core/colors';
// import { createTheme } from '@material-ui/system';

import {
    FacebookShareButton,
    FacebookIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    WhatsappShareButton,
    WhatsappIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterShareButton,
    TwitterIcon
  } from 'next-share';
import PostModalContext from '../basic/contexts/post_modal_context';
import { blue, grey } from '@mui/material/colors';



//////////////// CSS  //////////////////////



const StyledIconButton = styled(IconButton)`

&:after{
    color: blue;
}

`

const StyledCommentInput = emotion_styled.input`

    outline: none;
    border: none;
    
    border-radius: 5px;
    font-size: 0.93rem;
    padding: 0.9rem 0.7rem;
    transition: 0.25s ease-in-out;
    width: 25ch;

    &:focus{
        box-shadow: 0px 0px 0px 2px ${blue[400]};

        width: 30ch;
    }

`


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }

var initial=0;
function FeedContent({profile_pic,len_tags,title, descr, likes_count, is_bookmarked, is_liked, dislikes_count, is_disliked, images, post_id, username, comments, autoOpenMarked}) {

    const [likesCount, setLikesCount] = React.useState(likes_count ?? 0);
    const postModalContext = useContext(PostModalContext)
    const [dislikesCount, setDislikeCount] = React.useState(dislikes_count ?? 0)

    const [isLiked, setIsLiked] = React.useState(is_liked)
    const [isDisliked, setIsDisliked] = React.useState(is_disliked)
    const theme = useTheme();
    
    const[doBookmark, setDoBookmark] = React.useState(false)

    const [initialLiked, setInitialLiked] = React.useState(is_liked)
    const [initialDisliked, setInitialDisliked] = React.useState(is_disliked)
    const [shareOpen, setShareOpen] = React.useState(false);

    const snackbarContext = useContext(SnackbarContext)

    useEffect(() => {

        // alert("Curr(ModalId): "+ String(postModalContext.post_id) + " (Static): "+ String(post_id))
        if(postModalContext.post_id === post_id && !postModalContext.open){
            // TargetPost
            setInitialDisliked(postModalContext.is_disliked)
            setIsDisliked(postModalContext.is_disliked)
            setIsLiked(postModalContext.is_liked)
            setInitialLiked(postModalContext.is_liked)
            setLikesCount(postModalContext.likes_count)
            setDislikeCount(postModalContext.dislikes_count)

        }

    }, [postModalContext.open])


    const [commentText, setCommentText] = React.useState('');
    // Snakbar
    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
      });


    
    const handleOpen = () => {
        // postModalContext.set_open(true);
        postModalContext.set_data({
        
            open:true,
            post_id: post_id,
            title: title,
            author: username,
            profile_pic: profile_pic, // CHANGED
            descr:descr,
            images: images,
            comments: comments,
            likes_count: likes_count, 
            dislikes_count: dislikes_count, 
            is_liked: is_liked,
            is_disliked: is_disliked,
            is_bookmarked: is_bookmarked,
            len_tags: len_tags, // CHANGED
            create_mode: false,

        })
        
    };

    useEffect(() => {
        if( autoOpenMarked){
            handleOpen();
        }
    }, [])
    // const handleClose = () => setOpen(false);

    const handleCommentInputChange = (e) => setCommentText(e.target.value)


    const handleCommentSubmit = async () => {

        // Comment
        if(commentText.replaceAll(' ', '') === ""){
            return;
        }

            const success = await handle_action_create_comment(commentText, username, post_id);

        if (success){
            console.log('Comment Added SuccessFully')
            comments.push({likes: [], author_username: username, descr: commentText, time_since: 'Just Now'})
            setCommentText('');

        }
        else{
            console.log("Comment isn't added")
        }

        

    }
    

    const HandleNullAction = () => {
        return
    }

    useEffect(() => {

        // setIsDisliked(is_disliked)
        // setIsLiked(is_liked)
        setInitialDisliked(is_disliked)
        setInitialLiked(is_liked)

        console.log("asdsad", is_liked)

    }, [is_liked, is_disliked])

    // Below operations is too expensieve as they get from 2 req. each action we must add some smartness
    // 1. solution for that is a threshold timer of x seconds (ex.. x=2sec.)
        // if user reacts to same post multiple times within x seconds we gonna reset threshold timer
        // After the threshold timer gets off we finally send api-call to server to do actions accordingly

        // maybe we can use setTimeOut function and clearTimeOut
    // 2. solution is wait untill the first action api-call gets terminated or gets finished
        // finished in the sense, we got a valid response from the server , then we do further actions


        // Using 1. solution
    // url: apio/handle_action/post/ 'POST'

    



    useEffect(() => {

        // console.log("Like: ", isLiked, " IsDisliked: ", isDisliked);
        // console.log("InitialLiked: ", initialLiked, " initialDisliked: ", initialDisliked);

        // // invocation();
        // initial = setTimeout(() => {
        //     console.log('Something needs to be updated!');
        console.log(isLiked)

        // }, 2000)

        async function doUpdate(){

        if(initialDisliked ^ isDisliked || isLiked ^ initialLiked){
            initial = setTimeout(async () => {

                let actions = []; // add / remove
                let choices = [];// like / Dislike

                if(initialDisliked && !isDisliked){
                    // Remove Dislike
                    // console.log("remove Dislike")
                    actions.push('remove');
                    choices.push('dislike');
                }
    
                if(initialLiked && !isLiked){
                    // console.log("remove like");
                    actions.push('remove');
                    choices.push('like');
                }
    
                if(isLiked &&  !initialLiked){
                    // console.log("add like");
                    actions.push('add');
                    choices.push('like');
                }
                 
                if(isDisliked && !initialDisliked){
                    // console.log("add dislike")
                    actions.push('add');
                    choices.push('dislike');
                }

                // async function getResult(){
                    const result = await handle_action_post(username, post_id, choices, actions);
                    // alert("action Called")
                    // return result
                // }


                // const result = await getResult();

                if (!result){
                    return;
                    // Can't update action
                }
                console.log("Successfull Updation")

                setInitialDisliked(isDisliked)
                setInitialLiked(isLiked)

            }, 2000);





        }
    }

    doUpdate();
        

    }, [isLiked, isDisliked])


    // useEffect(() => {
    //     console.log("isDisliked: ", isDisliked);
    // }, [isDisliked])



    const sharePost = () => {
        if (typeof navigator !== 'undefined'){
            
            if(navigator.canShare){
                navigator.share({
                    url: `${FRONTEND_ROOT_URL}explore/post/${post_id}`,
                    title: 'Spade',
                    text: 'Share hacks, gain hacks!'
                })
            }else{

                setShareOpen(true)

            }

        }else{

            setShareOpen(true)
        }

    }


    // Just update like_dislike initial state at first page load by taking hekp of backend









// FRONTEND make sure actions and choices are sent in array format to backend and in valid form












    const clearTimOUT = (initial) => {
        clearTimeout(initial);
    }
    

    const HandleLike = ()=> {


        
        // Already disliked the post
        if(isDisliked){
            setIsDisliked(false);
            setDislikeCount(dislikesCount - 1);

      
            // remove user from dislikes list
        }

        // Checking for current like button state
        if(isLiked){
            setIsLiked(false);
            setLikesCount(likesCount - 1);
            // Remove Like
       
            // remove user from likes list
        }else{
            // setIsLiked(true);
            setIsLiked(true);
           
            setLikesCount(likesCount+1)

   
            // add user to likes list
        }

   

    }

    


    const HandleDislike = ()=> {

        // setDislikeCount(dislikesCount + 1)
        
        // Already liked the post
        if(isLiked){
            setIsLiked(false);
            setLikesCount(likesCount - 1);
            // remove user from likes list

          
        }


        if(isDisliked){
            
            setIsDisliked(!isDisliked);
            setDislikeCount(dislikesCount - 1);
            

       

            // remove user from dislikes list
        }else{
            

            setIsDisliked(!isDisliked);
            setDislikeCount(dislikesCount+1)
            

            
            // add user to dislikes list
        }


    }

    const handleCloseSnakbar = () => {
        setState({
          ...state,
          open: false,
        });
      };

    return (
        <React.Fragment>
                <Snackbar
                    open={doBookmark}
                    onClose={handleCloseSnakbar}
                    TransitionComponent={SlideTransition}
                    message="Bookmark added succesfully"
                    key={state.Transition.name}
                    className='anchorOriginBottomRight'
                />
                <Modal
                    open={shareOpen}
                    onClose={() => {setShareOpen(false)}}
                >
                    
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'max(350px, 30vw)',
                        backgroundColor: '#f4f4f4',
                        borderRadius: '5px',
                        boxShadow: 24,
                        padding: '0px 5px 1rem 5px',
                    }}>
                        <center><h2>Share With</h2></center>
                        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <Tooltip title="Copy URL">
                                <StyledIconButton onClick={() => {navigator.clipboard.writeText(`${FRONTEND_ROOT_URL}explore/post/${post_id}`);snackbarContext.open('simple', "Copied to clipboard!")}}>
                                    <ContentCopyOutlined />
                                    
                                </StyledIconButton>
                                
                            </Tooltip>
                            <FacebookShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <PinterestShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <RedditShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <RedditIcon size={32} round />
                            </RedditShareButton>
                            <WhatsappShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <LinkedinShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <TwitterShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${post_id}`} >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>
                    </Box>
                </Modal>

            <h2 style={{margin: '0', fontFamily: 'Roboto', fontWeight: 'bold', color: blue[500]}}>{title}</h2>
            
            <div style={{ fontWeight: '400', opacity: '0.9', paddingTop: '1rem', lineHeight: '1.4rem', fontFamily: 'Roboto', fontSize: '0.9rem', overflow: 'hidden', maxHeight: '70%'}} dangerouslySetInnerHTML={{__html: (descr.length > 800 ? descr.substring(0,800): descr)}}/>
            <Chip
            
                icon={<InsertPhotoRounded />}
                label="view post"
                variant="outlined"
                style={{borderRadius: '7px', border: `1px solid ${defaultBorderColor}`, position: 'absolute', top: '0', right: '0', minHeight: '24px'}} // 24px is  height of <h2/> 
                onClick={handleOpen}
            />


            {/* <PostModal post_id={post_id} handleParentLiked={HandleLike} handleParentDisliked={HandleDislike} comments={comments} is_liked={isLiked} is_disliked={isDisliked} is_bookmarked={doBookmark} username={'krishnan_pandya'} title = {title} descr={descr} likes={likesCount} dislikes={dislikesCount} tags={Array()} isOpen={open} _onClose={() => {setOpen(false)}} images={images} /> */}

            <div style={{width: '100%', bottom: '0', position: 'absolute', display: 'flex', justifyContent: 'space-between'}}>
                {/* Bottom Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '20%' }}>
                    {/* Like, Dislike, Share */}
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        {/* Like */}
                        <IconButton onClick={() => {HandleLike();clearTimOUT(initial);}}>
                            <ThumbUpAltOutlined color={isLiked ? 'primary' : 'default'} sx={{color: theme.palette.mode === 'dark' && !isLiked ? '#A4B1B8' : ''}} />
                        </IconButton>
                        <p style={{margin: '0', color: grey[600]}}>{likesCount}</p>
                    </div>
                    <div style={{display: 'grid', placeItems: 'center'}}>
                        {/* Like */}
                        <IconButton onClick={() => {HandleDislike();clearTimOUT(initial);}}>

                            <ThumbDownAltOutlined color={isDisliked ? "error": 'default'} sx={{color: theme.palette.mode === 'dark' && !isDisliked ? '#A4B1B8' : ''}}/>
                        </IconButton>
                        <p style={{margin: '0', color: grey[600]}}>{dislikesCount}</p>
                    </div>
                    <IconButton onClick={sharePost}>

                        <ShareOutlined sx={{color: theme.palette.mode === 'dark'  ? '#A4B1B8' : ''}} />
                    </IconButton>
                </div>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', opacity: '0.9'}}>
                    <StyledCommentInput style={{ backgroundColor: theme.palette.mode === 'dark' ? '#1D3C4F' : 'white', color: theme.palette.mode === 'dark' ? 'white' : 'black' }} placeholder="Quick Comment..." onChange={handleCommentInputChange} />
                    <IconButton style={{height: '100%', aspectRatio: '1', borderRadius: '5px'}} onClick={handleCommentSubmit}>
                        <Send sx={{color: blue[300]}} />
                    </IconButton>
                </div>
            </div>
            
        </React.Fragment>
    )
}

export default FeedContent

FeedContent.propTypes = {
    title: PropTypes.string.isRequired,
    descr: PropTypes.string.isRequired,
    likes_count: PropTypes.number,
    is_liked: PropTypes.bool,
    is_disliked: PropTypes.bool,
    is_bookmarked: PropTypes.bool,
    dislikes_count: PropTypes.number,
    username: PropTypes.string.isRequired

}

FeedContent.defaultProps = {

    is_liked: false,
    is_disliked: false,
    is_bookmarked: false

}