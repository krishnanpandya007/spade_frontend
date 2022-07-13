// import { Container, Divider, Grid, Paper } from '@material-ui/core'

import { Container, Divider, Grid } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import getUserInfo from '../basic/get_user_info'

import FeedAbout from './FeedAbout'
import FeedContent from './FeedContent'

import styles from './Feed.module.css'
import { blue, green, grey, purple } from '@mui/material/colors'
import PostModalContext from '../basic/contexts/post_modal_context'
import { LoadingButton } from '@mui/lab'
import { ExpandMoreRounded } from '@mui/icons-material'
import { defaultBorderColor, FRONTEND_ROOT_URL } from '../../config'
import SnackbarContext from '../basic/contexts/snackbar_context'
import _load_more_posts from '../basic/apis/load_more_posts'


function Feed({data, setData, filter_by,isProfileView=false, isExploreView=false, marked=false, is_authenticated, userInfo}) {

    const [username, setUsername] = React.useState('');
    const postModalContext = useContext(PostModalContext)
    const snackbar = useContext(SnackbarContext)

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



    

    return (
        <Container style={!isProfileView ? (!isExploreView ? {display: 'grid', placeItems: 'center', paddingTop: '5vh'} : {paddingLeft: '5%', paddingTop: '2%', width: '100vw',  marginLeft: '0%'}): {padding: '5%', width: '100vw', marginLeft: '0'}}>

            {(isProfileView ? data.created_posts : data).map((post, idx) => {
                return (
                    // <Grid key={idx} container spacing={0} sx={{position: 'relative',width: '60vw', height: '40vh', border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '3px', marginBottom: '5vh'}} alignItems='center' justifyContent='center'>
                    <div key={idx} style={{width: 'clamp(1000px, 60vw, 1200px)', height: 'clamp(300px, 40vh,400px)', border: '1px solid ' + defaultBorderColor, borderRadius: '5px', marginBottom: '5vh', display: 'flex'}}>
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
                            <FeedContent profile_pic={post.profile_pic} len_tags={post.tags.length}  comments={post.comments} is_liked={postModalContext.post_id === post.id?postModalContext.is_liked:post.likes?.includes(username)} is_disliked={postModalContext.post_id === post.id?postModalContext.is_disliked:post.dislikes?.includes(username)} username={post.author_name} post_id={post.id} images={Array(post.image_1, post.image_2, post.image_3, post.image_4)} dislikes_count={postModalContext.post_id === post.id?postModalContext.dislikes_count:post.dislikes?.length} likes_count={postModalContext.post_id === post.id?postModalContext.likes_count:post.likes?.length} title={post.title} descr={post.descr} />
                        </div>
                    </div>
                )
            })}

            {(isProfileView ? data.created_posts : data).length>0?
                <center><LoadingButton loading={isLoadMoreLoading} onClick={load_more_posts} endIcon={<ExpandMoreRounded />} variant="outlined" size="small" >Load More</LoadingButton></center>
                :<h3 style={{color: grey[500]}}>No Posts Found!</h3>
            }
                
        </Container>
    )
}



export default Feed
