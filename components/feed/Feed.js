// import { Container, Divider, Grid, Paper } from '@material-ui/core'

import { Avatar, Container, Divider, Grid, IconButton, Modal, Tooltip } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import getUserInfo from '../basic/get_user_info'

import FeedAbout from './FeedAbout'
import FeedContent from './FeedContent'
import Link from 'next/link'
import styles from './Feed.module.css'
import { blue, green, grey, purple } from '@mui/material/colors'
import PostModalContext from '../basic/contexts/post_modal_context'
import { LoadingButton } from '@mui/lab'
import { ContentCopyOutlined, ExpandMoreRounded } from '@mui/icons-material'
import { BACKEND_ROOT_URL, defaultBorderColor, FRONTEND_ROOT_URL } from '../../config'
import SnackbarContext from '../basic/contexts/snackbar_context'
import _load_more_posts from '../basic/apis/load_more_posts'
import authContext from '../basic/contexts/layout_auth_context'
import Image from 'next/image'
import styled from '@emotion/styled'
import { handle_action_post } from '../basic/handle_action'
import { bookmark_post, unbookmark_post } from '../basic/apis/bookmar_post'
import useLongPress from '../../hooks/use-long-press'
import { Box } from '@mui/system'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'

const StyledIconButton = styled(IconButton)`

&:after{
    color: blue;
}

`

function Feed({data, setData, filter_by,isProfileView=false, isExploreView=false, marked=false, is_authenticated, userInfo}) {

    const postModalContext = useContext(PostModalContext)
    const auth = useContext(authContext)
    const snackbar = useContext(SnackbarContext)

    const [shareData, setShareData] = React.useState({open: false, post_id: null})

    const [loadMoreCounter, setLoadMoreCounter] = React.useState(1);

    const [isLoadMoreLoading, setIsLoadMoreLoading] = React.useState(false);

    // For non profileView
    // ? For profileView we need load_more_posts filtered by author, bookmarked, liked
    // if (!isProfileView){
        async function load_more_posts() {
            console.log("Filter by: ", filter_by, "LOADMORECOUNTER:::", loadMoreCounter)
            
            // ? filter_by can be ["trending", "relevant", "recent", "popular"]
            if((loadMoreCounter * 5) > data.length){
                snackbar.open('success', "Wohoo, you've got all of it!");
                return;
            }
    
            setIsLoadMoreLoading(true);

            const { response, more_posts_data } = await _load_more_posts(filter_by, loadMoreCounter);
    
            if (response.status !== 200){
                setIsLoadMoreLoading(false);
                snackbar.open('error', "Unable to load more posts");
                return;
            }
    
            setData([...data, ...more_posts_data])
            setLoadMoreCounter(currCounter => currCounter + 1);
    
            setIsLoadMoreLoading(false);

        }

    // }




    const handlePostModalOpen = (post) => {

        postModalContext.set_data({
            
            open:true,
            post_id: post.id,
            title: post.title,
            author: post.author_name,
            profile_pic: post.profile_pic, // CHANGED
            descr:post.descr,
            images: [post.image_1, post.image_2, post.image_3, post.image_4],
            comments: post.comments,
            likes_count: post.likes.length, 
            dislikes_count: post.dislikes.length, 
            is_liked: post.likes.includes(authContext.user_data?.username),
            is_disliked: post.dislikes.includes(authContext.user_data?.username),
            is_bookmarked: false,
            len_tags: post.tags.length, // CHANGED
            create_mode: false,

        })

    }

    const handleShareOpen = (post_id) => {


        setShareData({open: true, post_id: post_id});

    }

    return (
        <Container style={!isProfileView ? (!isExploreView ? {display: 'grid', placeItems: 'center', paddingTop: '5vh'} : {paddingLeft: '5%', paddingTop: '2%', width: '100vw',  marginLeft: '0%'}): {padding: '5%', width: '100vw', marginLeft: '0'}}>



                <Modal
                    open={shareData.open}
                    onClose={() => {setShareData({open: false, post_id: null})}}
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
                                <StyledIconButton onClick={() => {navigator.clipboard.writeText(`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`);snackbar.open('simple', "Copied to clipboard!")}}>
                                    <ContentCopyOutlined />
                                    
                                </StyledIconButton>
                                
                            </Tooltip>
                            <FacebookShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            <PinterestShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <PinterestIcon size={32} round />
                            </PinterestShareButton>
                            <RedditShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <RedditIcon size={32} round />
                            </RedditShareButton>
                            <WhatsappShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            <LinkedinShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <LinkedinIcon size={32} round />
                            </LinkedinShareButton>
                            <TwitterShareButton
                                url={`${FRONTEND_ROOT_URL}explore/post/${shareData.post_id}`} >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>
                        </div>
                    </Box>
                </Modal>



            {(isProfileView ? data.created_posts : data).map((post, idx) => {
                return (
                    // <Grid key={idx} container spacing={0} sx={{position: 'relative',width: '60vw', height: '40vh', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '3px', marginBottom: '5vh'}} alignItems='center' justifyContent='center'>
                    auth.is_on_mobile ? <MFeed snackbar_instance={snackbar} openShare = {handleShareOpen} openPostModal={() => {handlePostModalOpen(post)}} idx={idx} post={post} username={auth.user_data?.username} />:<div key={idx} style={{width: 'clamp(1000px, 60vw, 1200px)', height: 'clamp(300px, 40vh,400px)', border: '1px solid ' + defaultBorderColor, borderRadius: '5px', marginBottom: '5vh', display: 'flex'}}>
                        <div style={{height: '100%', width: '25%', borderRight: '1px solid '+ defaultBorderColor, position: 'relative'}}>
                        
                        {/* <Grid item xs={3} sx={{ height: '100%'}} > */}
                            <FeedAbout first_name={post.first_name} last_name={post.last_name} profile_pic={data.profile_pic ?? false} username={post.author_name} tags={post.tags} created_on={post.time_since} />
                        </div>
                        {
                            marked ?
                            <div style={{position: 'absolute', height: '100%', width: '8px', backgroundColor: purple[300], left: '-5vh', top: '0', borderRadius: '0 1000px 1000px 0'}} />:null
                        }
                        {/* <Divider orientation="vertical" /> */}
                        <div style={{margin: "0.7rem 1rem", width: '75%', position: 'relative'}}>
                        
                        {/* <Grid item xs={8.9} sx={{ height: '100%'}}> */}
                            {/* Add isLiked and isDisliked */}
                            <FeedContent profile_pic={post.profile_pic} len_tags={post.tags.length}  comments={post.comments} is_liked={post.likes.includes(auth.user_data?.username)} is_disliked={post.dislikes.includes(auth.user_data?.username)} username={auth.user_data?.username} post_id={post.id} images={Array(post.image_1, post.image_2, post.image_3, post.image_4)} dislikes_count={postModalContext.post_id === post.id?postModalContext.dislikes_count:post.dislikes?.length} likes_count={postModalContext.post_id === post.id?postModalContext.likes_count:post.likes?.length} title={post.title} descr={post.descr} />
                        </div>
                    </div>
                )
            })}

            {!marked ? (isProfileView ? data.created_posts : data).length>0?
                <center><LoadingButton loading={isLoadMoreLoading} onClick={load_more_posts} endIcon={<ExpandMoreRounded />} variant="outlined" size="small" >Load More</LoadingButton></center>
                :<h3 style={{color: grey[500]}}>No Posts Found!</h3>:null
            }
                
        </Container>
    )
}

function MFeed({ idx, post, username, openPostModal, openShare, snackbar_instance }){

    const {action, handlers} = useLongPress();

    useEffect(() => {

        if(action === 'click'){
            openPostModal();
        }else if(action === 'longpress') {
            openShare(post.id); 

        }
        handlers.onMouseUp();handlers.onTouchEnd();
    }, [action])

    return (
        <div key={idx} style={{width: '100%', marginBottom: '6rem'}}>
            <div className="feed_upper_section" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Link href={`${FRONTEND_ROOT_URL}view_profile/${post.author_name}`}>
                    <a href={`${FRONTEND_ROOT_URL}view_profile/${post.author_name}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>
                        {post.profile_pic ? <Avatar style={{width: '30px', height: '30px', fontWeight: '600', fontSize: '13px'}} src={BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length - 1)+post.profile_pic} /> : post.first_name && post.last_name ? <Avatar  style={{backgroundColor: '#e4704a', color: 'whitesmoke', fontWeight: '700', width: '30px', height: '30px', fontWeight: '600', fontSize: '13px'}} >{post.first_name[0]+post.last_name[0]}</Avatar>: <Avatar />}
                        <p style={{fontFamily: 'Poppins', fontWeight: '400', fontSize: '0.9rem'}}>{post.author_name}</p>
                    </a>
                </Link>
                <p style={{color: '#A7A7A7', fontSize: '12px', fontWeight: '200'}}>{post.time_since.replace(' ago', '')}</p>
            </div>
            <div className="feed_mid_section_1" style={{borderRadius: '10px 10px 0 0', backgroundColor: '#F7F7F7', padding: '0 0rem', position: 'relative'}}>
                <h3 style={{padding: '1rem 1rem', fontFamily: 'Poppins', color: '#516BEB', marginBottom: '2px', fontWeight: '600'}}>{post.title.length < 34 ?post.title : post.title.slice(0, 30) + '...'}</h3>
                <Tooltip title="Expand">

                    <IconButton {...handlers} onClick={openPostModal} style={{position: 'absolute',  right: '0.5rem', top: '0', bottom: '0'}}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 2.5C2 2.22386 2.22386 2 2.5 2H5.5C5.77614 2 6 2.22386 6 2.5C6 2.77614 5.77614 3 5.5 3H3V5.5C3 5.77614 2.77614 6 2.5 6C2.22386 6 2 5.77614 2 5.5V2.5ZM9 2.5C9 2.22386 9.22386 2 9.5 2H12.5C12.7761 2 13 2.22386 13 2.5V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3H9.5C9.22386 3 9 2.77614 9 2.5ZM2.5 9C2.77614 9 3 9.22386 3 9.5V12H5.5C5.77614 12 6 12.2239 6 12.5C6 12.7761 5.77614 13 5.5 13H2.5C2.22386 13 2 12.7761 2 12.5V9.5C2 9.22386 2.22386 9 2.5 9ZM12.5 9C12.7761 9 13 9.22386 13 9.5V12.5C13 12.7761 12.7761 13 12.5 13H9.5C9.22386 13 9 12.7761 9 12.5C9 12.2239 9.22386 12 9.5 12H12V9.5C12 9.22386 12.2239 9 12.5 9Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </IconButton>
                </Tooltip>
            </div>
            <div className="feed_mid_section_2" style={{borderRadius: '0 0 10px 10px', backgroundColor: '#F7F7F7', padding: '0 0.5rem'}}>
                <div dangerouslySetInnerHTML={{__html: post.descr.length > 300 ? post.descr.substring(0,300) +'<b style="color: #00000040"> ...</b>' : post.descr}} style={{padding: '0.5rem', color: '#3C3C3C', margin: '0', fontSize:'12px'}}></div>
            </div>

            <PostActionBar openShare={openShare} snackbar_instance={snackbar_instance} post_id={post.id} is_liked={ username ? post.likes.includes(username) : false} is_disliked={username ? post.dislikes.includes(username) : false} n_likes={post.likes?.length} n_dislikes={post.dislikes?.length}  />

        </div>
    )

}

function PostActionBar({ is_liked, is_disliked, n_likes,openShare ,n_dislikes, post_id, snackbar_instance }){

    const [isLiked, setIsLiked] = React.useState(is_liked);
    const [isDisliked, setDisliked] = React.useState(is_disliked);
    

    const unBookmark =  () => {
        const success = unbookmark_post(post_id);

        if(!success){
            alert("Error while adding Bookmark")
        }
        else{

            snackbar_instance.close()
        }

    }

    // Friend To PostModalContext Commit
    const handleAddBookmark = async () => {

        const success = await bookmark_post(post_id);

        if(success) {
            // snackbarContext.undo_action(unBookmark)
            snackbar_instance.open('simple', "Bookmark Added!", true, unBookmark);


        }

    }

    const like = async () => {

        let action = "";
        let choice = "like";
    
        if(!isLiked){
          action = "add";
        }else{
          action = "remove";
        }
        if(isDisliked){
          action += " remove"
          choice += " dislike"
        }

        const result = await handle_action_post(".this",post_id, choice, action);
        
        if(!result){
            return
        }

        if(isLiked){
            setIsLiked(false);
            setDisliked(false);
            return;
        }

        if(isDisliked){
            setIsLiked(true);
            setDisliked(false);
            return;
        }

        setIsLiked(true);
        setDisliked(false);

    }



    const dislike = async () => {
            
        let action = "";
        let choice = "dislike";
    
        if(!isLiked){
          action = "add";
        }else{
          action = "remove";
        }
        if(isDisliked){
          action += " remove";
          choice += " like";
        }

        const result = await handle_action_post(".this",post_id, choice, action);
        
        if(!result){
            return
        }

        if(isDisliked){
            setIsLiked(false);
            setDisliked(false);
            return;
        }

        if(isLiked){
            setIsLiked(false);
            setDisliked(true);
            return;
        }

        setIsLiked(false);
        setDisliked(true);

    }

    const initially_liked = React.useMemo(() => {

        return is_liked

    }, [is_liked])

    const initially_disliked = React.useMemo(() => {

        return is_disliked

    }, [is_disliked])

    const sharePost = () => {
        if (typeof navigator !== 'undefined'){
            
            if(navigator.canShare){
                navigator.share({
                    url: `${FRONTEND_ROOT_URL}explore/post/${post_id}`,
                    title: 'Spade',
                    text: 'Share hacks, gain hacks!'
                })
            }else{

                openShare(post_id);

            }

        }else{

            openShare(post_id);
        }

    }

    return (

        <div className="feed_bottom_section" style={{borderRadius: '10px', backgroundColor: '#F7F7F7', marginTop: '0.8rem', padding: '0.3rem 0.6rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <IconButton onClick={() => {alert("Single Click")}} >
                    <svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2.5C3 2.22386 3.22386 2 3.5 2H11.5C11.7761 2 12 2.22386 12 2.5V13.5C12 13.6818 11.9014 13.8492 11.7424 13.9373C11.5834 14.0254 11.3891 14.0203 11.235 13.924L7.5 11.5896L3.765 13.924C3.61087 14.0203 3.41659 14.0254 3.25762 13.9373C3.09864 13.8492 3 13.6818 3 13.5V2.5ZM4 3V12.5979L6.97 10.7416C7.29427 10.539 7.70573 10.539 8.03 10.7416L11 12.5979V3H4Z" fill="#516BEB" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    {/* <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V13.5C3 13.6818 3.09864 13.8492 3.25762 13.9373C3.41659 14.0254 3.61087 14.0203 3.765 13.924L7.5 11.5896L11.235 13.924C11.3891 14.0203 11.5834 14.0254 11.7424 13.9373C11.9014 13.8492 12 13.6818 12 13.5V2.5C12 2.22386 11.7761 2 11.5 2H3.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg> */}
                </IconButton>

            <div>
                {/* Like/Dislike */}
                <IconButton style={{position: 'relative'}} onClick={like}>
                    
                    <svg role="img" onClick={like} xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" aria-labelledby="thumbUpIconTitle" stroke={isLiked?"#516BEB":"#686868"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#516BEB"> <title id="thumbUpIconTitle">Thumb Up</title> <path d="M8,8.73984815 C8,8.26242561 8.17078432,7.80075162 8.4814868,7.43826541 L13.2723931,1.84887469 C13.7000127,1.34998522 14.4122932,1.20614658 15,1.5 C15.5737957,1.78689785 15.849314,2.45205792 15.6464466,3.06066017 L14,8 L18.6035746,8 C18.7235578,8 18.8432976,8.01079693 18.9613454,8.03226018 C20.0480981,8.22985158 20.7689058,9.27101818 20.5713144,10.3577709 L19.2985871,17.3577709 C19.1256814,18.3087523 18.2974196,19 17.3308473,19 L10,19 C8.8954305,19 8,18.1045695 8,17 L8,8.73984815 Z"/> <path d="M4,18 L4,9"/> </svg>
                    <p style={{padding: '0', margin: '0', fontFamily: 'Poppins', position: 'absolute', bottom: '-30px', left: '0', right: '0', fontSize: '0.95rem', color :'black'}}>{!initially_liked && isLiked ? n_likes + 1 : n_likes }</p>
                </IconButton>

                <IconButton onClick={dislike}>

                    <svg role="img" xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24" aria-labelledby="thumbDownIconTitle" stroke={isDisliked?"#D61C4E":"#686868"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#516BEB"> <title id="thumbDownIconTitle">Thumb Down</title> <path d="M16,15.2601518 C16,15.7375744 15.8292157,16.1992484 15.5185132,16.5617346 L10.7276069,22.1511253 C10.2999873,22.6500148 9.58770685,22.7938534 9,22.5 C8.42620429,22.2131021 8.15068597,21.5479421 8.35355339,20.9393398 L10,16 L5.39642543,16 C5.27644223,16 5.15670242,15.9892031 5.03865456,15.9677398 C3.95190186,15.7701484 3.23109421,14.7289818 3.42868561,13.6422291 L4.70141289,6.64222912 C4.87431859,5.69124773 5.70258042,5 6.66915271,5 L14,5 C15.1045695,5 16,5.8954305 16,7 L16,15.2601518 Z"/> <path d="M20,15 L20,6"/> </svg>
                    <p style={{padding: '0', margin: '0', position: 'absolute', fontFamily: 'Poppins', bottom: '-30px', left: '0', right: '0', fontSize: '0.95rem', color :'black'}}>{!initially_disliked && isDisliked ? n_dislikes + 1 : n_dislikes}</p>
                </IconButton>
            </div>
        </div>


    )

}


export default Feed
