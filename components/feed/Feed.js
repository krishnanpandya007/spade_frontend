import { Avatar, Button, CircularProgress, Collapse, Divider, Fade, Grow, List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Modal, Popover, Popper, Slide, TextField, Tooltip, Typography, useTheme, Zoom } from '@mui/material'
import { IconButton } from '@mui/material'
import React, { useContext } from 'react'
import styles from './Feed.module.css'
import Link from 'next/link'
import { ArrowBack, ArrowForward, ArrowForwardIos, Close, ContentCopyOutlined, EmojiFlags, ExpandLess, ExpandMore, Fullscreen, HideImageOutlined, Inbox, Info, LinkOffOutlined, PushPin, Report, ReportProblemOutlined, StarBorder, ThumbDownOutlined, ThumbUpOutlined, WallpaperOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { withStyles } from '@mui/styles'
import { motion, useAnimation } from 'framer-motion'
import { Box } from '@mui/system'
import { FRONTEND_ROOT_URL } from '../../config'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'
import Image from 'next/image'
import {CATAGORIES, DEFAULT_CATAGORY} from '../../config/index';
import { useEffect } from 'react'
import authContext from '../basic/contexts/layout_auth_context'
import { handle_action_create_comment, handle_action_post } from '../basic/handle_action'
import SnackbarContext from '../basic/contexts/snackbar_context'
import { pin_spack, unpin_spack } from '../basic/apis/pin_spack_handler'
import { delink_post } from '../basic/apis/delink_post'
import { report_spack_as_inappropriate, report_spack_as_nonspack } from '../basic/apis/report_spack'

// Make A Globalized Context

const StyledButton = withStyles({
  root: {
    backgroundColor: '#00000007',
    color: '#516BEB90',
    border: '1px solid transparent',
    '&:hover': {
      border: '1px solid #516BEB99',
      color: '#516BEB90',
  },
}})(LoadingButton);

function get_title(title){

  return title[0].toUpperCase() + title.replaceAll('-', ' ').slice(1)

}

const SpacksContext = React.createContext({spacks: {}, set_spacks: (group_name, new_spacks) => {}});

const DetailImageViewContext = React.createContext({open: false, src: '', set_open: (state, src='') => {}})

function Feed({ spack_groups }) {
  // Fetch Live Data from mem-cached likes/dislikes
  const auth = useContext(authContext);

  const [spacks, setSpacks] = React.useState({});
  const spacksContext = useContext(SpacksContext);
  const [detailImageView, setDetailImageView] = React.useState({open: false, src: ''});

  const set_detail_image_open = (new_state, src='') => {

    setDetailImageView({open: new_state, src: src});

  }

  const set_spacks = (group_name, new_spacks) => {

    setSpacks(curr => ({...curr, [group_name]: new_spacks}))

  } 

  const fetchLiveData = async () => {

    const res = await fetch(`${FRONTEND_ROOT_URL}api/get_live_data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        cache_keys: CATAGORIES.map((catagory) => `posts_live_data/${DEFAULT_CATAGORY}/${catagory}`),
        username: auth.user_data.username
      })
    })

    const jsonData = await res.json();

    if(res.status === 200){

      // setLiveData(jsonData.data)
      let temp_spacks = {}; //group: []

      for(let i = 0; i < spack_groups.length; i++){
        if(spack_groups[i].spacks?.length > 0){
          for(let j = 0; j < spack_groups[i].spacks.length; j++){
            // if(jsonData.data[`posts_live_data/${DEFAULT_CATAGORY}/${spack_groups[i].group_name}`].length && spack_groups[i].spacks[j].id === jsonData.data[`posts_live_data/${DEFAULT_CATAGORY}/${spack_groups[i].group_name}`][j].id){
            
            
            if(temp_spacks[spack_groups[i].group_name]){
                temp_spacks[spack_groups[i].group_name].push({...spack_groups[i].spacks[j], ...jsonData.data[`posts_live_data/${DEFAULT_CATAGORY}/${spack_groups[i].group_name}`][j]})
              }else{
  
                temp_spacks[spack_groups[i].group_name] = [{...spack_groups[i].spacks[j], ...jsonData.data[`posts_live_data/${DEFAULT_CATAGORY}/${spack_groups[i].group_name}`][j]}];
              }
    
            }
          
          // spk_grp.spacks.map((spack, idx) => {
          // })
        }
      }
      setSpacks(temp_spacks);

    }


  }

  useEffect(() => {if(auth.is_authenticated !== 'loading'){fetchLiveData()}}, [auth.is_authenticated]);

  useEffect(() => {

    let g = {}
    spack_groups.map((spk_grp) => {g[spk_grp.group_name]= spk_grp.spacks})
    setSpacks(g)

  }, [])


  // console.log(spack_groups)
  return (
    <SpacksContext.Provider value={{spacks: spacks, set_spacks: set_spacks }}>
      <DetailImageViewContext.Provider value={{...detailImageView, set_open: set_detail_image_open}}>
      <Modal
      open={detailImageView.open}
      onClose={() => {set_detail_image_open(false)}}
      style={{display: 'grid', placeItems: 'center'}}
      >
        <div style={{position: 'relative'}}>

        <img  onLoad={(e) => {if(e.target.width > e.target.height){ e.target.style.width = '100vw' }else{e.target.height= '100vh'}}} src={detailImageView.src} alt="Detailed Image View" />
        <IconButton  style={{position: 'absolute', right: '1rem', top: '1rem', }} onClick={() => {set_detail_image_open(false)}}>

        <Close fontSize='large' style={{filter: 'drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7))'}} />
        </IconButton>
        </div>
      </Modal>
      {
        spack_groups.map((spack_group, idx) => (
    
            // gaming | coding | ...
            (
              spack_group.spacks && spacksContext.spacks &&
            <article className={styles.spack_group} key={idx}>
                <SpackGroup group_name={spack_group.group_name}  />
            </article>
            )
    
        ))
      }
      </DetailImageViewContext.Provider>
    </SpacksContext.Provider>

  )
}

function SpackGroup({group_name}){
  const spacksContext = useContext(SpacksContext);
  const spacks = spacksContext.spacks[group_name]
  //spacks: [{coding: []}, {gaming: []}, {}]
  // const [spacks, setSpacks] = React.useState([...pre_spacks]);
  const auth = useContext(authContext);
  const snackbar = useContext(SnackbarContext);
  // console.log(pre_spacks)

  const [currentSpackCounter, setCurrentSpackCounter] = React.useState(0);
  const detailImageView = useContext(DetailImageViewContext);
  const [openReport, setOpenReport] = React.useState(false);
  const [commentsContext, setCommentsContext] = React.useState({data: [], loading: false, counter: 1, has_next: true})
  // const spack = spacks[currentSpackCounter];

  const [sharePopper, setSharePopper] = React.useState({ open: false, anchorEl: null })
  const [commentPopper, setCommentPopper] = React.useState({ open: false, anchorEl: null })
  const [moreOptionsPopover, setMoreOptionsPopover] = React.useState({ open: false, anchorEl: null })
  const [showImages,setShowImages] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [hasEnd, setHasEnd] = React.useState(false);
  const actionCleanerRef = React.useRef({like: [], dislike: []}) // stores id of Timer for like()&dislike() methods

  const [spacksLoadMoreCounter, setSpacksLoadMoreCounter] = React.useState(1);

  const [commentContext, setCommentContext] = React.useState({comment: '', loading: false, error: false})

  const handlePinSpack = async () => {

    let success;

    if(spacks[currentSpackCounter].is_bookmarked){
      setMoreOptionsPopover(curr => ({...curr, open: false}))

      success = await unpin_spack(spacks[currentSpackCounter].id, auth.is_authenticated ? 1 : -1);

      if(success){
        spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_bookmarked: false}}}))
        snackbar.open('simple', "Spack unpinned from collection.")
      }

    }else{

      setMoreOptionsPopover(curr => ({...curr, open: false}))
      success = await pin_spack(spacks[currentSpackCounter].id, auth.is_authenticated)
      
      if(success === 1){
        spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_bookmarked: true}}}))

        snackbar.open('simple', "Spack Pinned!")
      }else if(success === -1){
        spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_bookmarked: true}}}))

        snackbar.open('simple', "Spack pinned locally, as Anonymous.")

      }

    }


  }

  const delinkPost = async () => {

    setMoreOptionsPopover(curr => ({...curr, open: false}))

    const success = await delink_post(spacks[currentSpackCounter].id)
    
    if (success){
            window.location.reload()
            snackbar.open('success', "Post De-linked Successfully")
    }else{
        snackbar.open('error', "Please try again later")
    }
        

  }

  const submitComment = async () => {

      setCommentContext(curr => ({...curr, loading: true}))

      if(commentContext.comment.replaceAll(' ', '') === ""){
        setCommentContext(curr => ({...curr, loading: false, error: true}))

          return;
      }else{
        setCommentContext(curr => ({...curr, loading: false, error: false}))
        
      }

          const success = await handle_action_create_comment(commentContext.comment, spacks[currentSpackCounter].id);

      if (success){
        snackbar.open('simple', 'Chit-Chat added.')
        setCommentContext(curr => ({...curr, loading: false, comment: ''}))


      }
      else{
          setCommentContext(curr => ({...curr, loading: false}))
      }



  }

  const like = async () => {

    // actionCleanerRef.current.like.filter((timer) => {if(timer.sid !== spacks[currentSpackCounter].id){return true}else{clearTimeout(timer.tid);return false}});
    let isLiked = !(spacks[currentSpackCounter].is_liked);
    // isLiked is taking effect after render , currently its show inverted value (reason: its not rendered yet)


    spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_liked: !spack.is_liked, likes: !spack.is_liked ? spack.likes + 1 : spack.likes - 1, is_disliked: false, dislikes: spack.is_disliked ? spack.dislikes - 1 : spack.dislikes}}}))
    
    actionCleanerRef.current.like.filter((timer) => {if(timer.sid !== spacks[currentSpackCounter].id){return true}else{clearTimeout(timer.tid);return false}});

    actionCleanerRef.current.dislike.filter((dta) => {
      if(dta.sid === spacks[currentSpackCounter].id){
        clearTimeout(dta.tid);
        return false;
      }else{
        return true
      }
    })

    const timeout_id = setTimeout(async() => {
      
      const result = await handle_action_post(spacks[currentSpackCounter].id, {likes: isLiked, dislikes: false});
      // commit UI change to DATABASE/CORE change
      if(!result){
        // remove Like
        spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_liked: !isLiked, likes: !isLiked ? spack.likes + 1 : spack.likes - 1, is_disliked: false}}}))

      }

    }, 800)// really takes effect after 800ms
    // Stack up this Timeout call at actionCleanerRef
    actionCleanerRef.current.like.push({tid: timeout_id, sid: spacks[currentSpackCounter].id})



  }

  const dislike = async () => {

    let isDisliked = !(spacks[currentSpackCounter].is_disliked);

    spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_disliked: !spack.is_disliked, dislikes: !spack.is_disliked ? spack.dislikes + 1 : spack.dislikes - 1, is_liked: false, likes: spack.is_liked ? spack.likes - 1 : spack.likes}}}))
    
    actionCleanerRef.current.dislike.filter((timer) => {if(timer.sid !== spacks[currentSpackCounter].id){return true}else{clearTimeout(timer.tid);return false}});


    actionCleanerRef.current.like.filter((dta) => {
      if(dta.sid === spacks[currentSpackCounter].id){
        clearTimeout(dta.tid);
        return false;
      }else{
        return true
      }
    })
    const timeout_id = setTimeout(async() => {
      const result = await handle_action_post(spacks[currentSpackCounter].id, {likes:false, dislikes: isDisliked});
      // commit UI change to DATABASE/CORE change
      if(!result){
        // remove Like
        spacksContext.set_spacks(group_name, spacks.map((spack) => {if(!spack){return}if (spack.id === spacks[currentSpackCounter].id){return {...spack, is_disliked: !isDisliked, dislikes: !isDisliked ? spack.dislikes + 1 : spack.dislikes - 1, is_liked: false}}}))

      }

    }, 800)// really takes effect after 800ms
    // Stack up this Timeout call at actionCleanerRef
    actionCleanerRef.current.dislike.push({tid: timeout_id, sid: spacks[currentSpackCounter].id})



  }

  const loadComments = async () => {

    setCommentsContext({...commentsContext, loading: true, data: []});

    const new_comments_response = await fetch(`${FRONTEND_ROOT_URL}api/get_paginated_data/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            model: 'comments',
            model_id: spacks[currentSpackCounter].id ,
            field: '__blank_87_',
            needed_page: commentsContext.counter
        })
    })

    const new_comments_json = await new_comments_response.json();

    if (new_comments_response.status === 200){

      setCommentsContext(c => ({data: new_comments_json.data, has_next: new_comments_json.has_next, counter: c.counter+1, loading: false}))
      return;
      
    }


    setCommentsContext(curr => ({...curr, loading: false}));

  }

  useEffect(() => {if(spacks && currentSpackCounter === 0){setHasEnd(spacks.length < 5)}}, [spacks && spacks.length])

  const loadMorePosts = async () => {

    setLoading(true);


    const new_posts = await fetch(`${FRONTEND_ROOT_URL}api/load_posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify([{load_more_counter: spacksLoadMoreCounter, catagory: DEFAULT_CATAGORY,groupex: `tag:${group_name}` }])
    })

    const dataj = await new_posts.json();

    if(new_posts.status !== 200){
      setLoading(false)
      return;
    }
// TELL BACKEND TO SEND HAS_END_ INFO
    console.log("Recieved Data:", dataj);

    spacksContext.set_spacks(group_name, [...spacks, ...dataj[0][group_name]])

    if(dataj[0].has_end){

      setHasEnd(true);

    }
    setSpacksLoadMoreCounter(curr => curr + 1)

    setLoading(false);

  }
  // useEffect(() => {console.log("sp", spacks);spacks.map((spack) => {if(spack.id)})}, [liveDataContext.live_data])


/*
if(loading){
  if(currentSpackCounter+1 === spacks.length){
    triggerLoadMorePosts(); // with Likes/Dislikes

    'loading'
  }else{
    'active'
  }
}else {
  if(has_end && currentSpackCounter+1 === spacks.length){
    'disabled'
  }else{
    'active'
  }
}
loading
if(!has_end){

  if(currentSpackCounter+1 === spacks.length){
    'loading'
  }else{
    'active'
  }

}
disabled
if(has_end){
  currentSpackCounter+1 === spacks.length ? true(disabled) : false(enabled)
}

*/

  const spack_controls = useAnimation();

  const theme = useTheme();
  

  const increaseSpackCounter = async () => {

    await spack_controls.start({

      scale: [1, 0.8],
      opacity: [1, 0],
      transition: {
        duration: 0.1
      }

    })

    setCurrentSpackCounter(curr => curr + 1);



    await spack_controls.start({

      scale: [1.2, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.1
      }


    })


  }

  const decreaseSpackCounter = async () => {

    await spack_controls.start({

      scale: [1, 1.2],
      opacity: [1, 0],
      transition: {
        duration: 0.1
      }


    })

    setCurrentSpackCounter(curr => curr - 1);

    await spack_controls.start({

      scale: [0.8, 1],
      opacity: [0, 1],
      transition: {
        duration: 0.1
      }


    })


  }



    return(
        
      <React.Fragment>
<div className={styles.group_header}>
<h1 className={styles.active}>{group_name.toUpperCase()}</h1>
<Tooltip style={{marginTop: '0.5rem'}} title="Shuffle Catagory">
  <IconButton >
    <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12.3536 0.146449C12.1583 -0.0488165 11.8417 -0.0488165 11.6464 0.146449C11.4512 0.341709 11.4512 0.658289 11.6464 0.853549L12.7929 2H12C10.7037 2 9.71111 2.58423 8.87248 3.38931C8.20065 4.03427 7.59349 4.85684 6.99461 5.6682C6.86287 5.84668 6.73154 6.02462 6.6 6.2C5.10874 8.18835 3.49037 10 0.5 10C0.223858 10 0 10.2239 0 10.5C0 10.7761 0.223858 11 0.5 11C4.00963 11 5.89126 8.81165 7.4 6.8C7.54367 6.60845 7.6832 6.41962 7.81996 6.23454L7.82005 6.23443L7.82006 6.23441C8.41674 5.42695 8.96069 4.69085 9.56502 4.11069C10.2889 3.41577 11.0463 3 12 3H12.7929L11.6464 4.14645C11.4512 4.34171 11.4512 4.65829 11.6464 4.85355C11.8417 5.04882 12.1583 5.04882 12.3536 4.85355L14.3536 2.85355C14.5488 2.65829 14.5488 2.34171 14.3536 2.14645L12.3536 0.146449ZM0.5 2C3.35278 2 5.12992 3.44588 6.50548 5.06746L6.3762 5.24266C6.2483 5.4161 6.12293 5.58609 6 5.75C5.96397 5.79804 5.92798 5.84581 5.892 5.89331C4.57348 4.29306 3.02637 3 0.5 3C0.223858 3 0 2.77614 0 2.5C0 2.22386 0.223858 2 0.5 2ZM8.87248 9.6107C8.37284 9.131 7.90897 8.55314 7.45767 7.95468C7.64688 7.71693 7.82704 7.48061 8 7.25L8.08987 7.12987C8.58412 7.79402 9.05288 8.39766 9.56502 8.88931C10.2889 9.5842 11.0463 10 12 10H12.7929L11.6464 8.85355C11.4512 8.65829 11.4512 8.34171 11.6464 8.14645C11.8417 7.95118 12.1583 7.95118 12.3536 8.14645L14.3536 10.1464C14.5488 10.3417 14.5488 10.6583 14.3536 10.8536L12.3536 12.8536C12.1583 13.0488 11.8417 13.0488 11.6464 12.8536C11.4512 12.6583 11.4512 12.3417 11.6464 12.1464L12.7929 11H12C10.7037 11 9.71111 10.4158 8.87248 9.6107Z" fill={theme.palette.mode === 'dark' ? "#ffffff95" : "#00000095"}/>
    </svg>

  </IconButton>

</Tooltip>
</div>

<div className={styles.spack_main} style={{border: `1px solid ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'}10`, padding: '1.5rem'}}>

<div className={styles.spack_about_actions} >

<img width="45" height="45" src={spacks && spacks[currentSpackCounter].profile_pic} />
<address style={{fontFamily: 'Poppins', fontStyle: 'normal', flex: '1', marginLeft: '1rem'}}><Link href="/"><a href="/" rel="author"> {spacks && spacks[currentSpackCounter].author_name} </a></Link></address>
<Tooltip title="Share" placement='top'>

<IconButton onClick={(e) => {setSharePopper({...sharePopper, open: !sharePopper.open, anchorEl: e.currentTarget})}}>
  <svg width="13" height="13" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M5.33333 8.66667C5.33333 9.77123 4.43791 10.6667 3.33333 10.6667C2.22876 10.6667 1.33333 9.77123 1.33333 8.66667C1.33333 7.56209 2.22876 6.66667 3.33333 6.66667C4.43791 6.66667 5.33333 7.56209 5.33333 8.66667ZM6.28417 10.2185C5.72593 11.2778 4.61397 12 3.33333 12C1.49239 12 0 10.5076 0 8.66667C0 6.82571 1.49239 5.33333 3.33333 5.33333C4.61397 5.33333 5.72593 6.05552 6.28417 7.11484L10.8057 4.28891C10.7152 3.9862 10.6667 3.66544 10.6667 3.33333C10.6667 1.49239 12.1591 0 14 0C15.8409 0 17.3333 1.49239 17.3333 3.33333C17.3333 5.17428 15.8409 6.66667 14 6.66667C12.922 6.66667 11.9635 6.15495 11.3542 5.36116L6.64707 8.30313C6.66003 8.42252 6.66667 8.54381 6.66667 8.66667C6.66667 8.78951 6.66003 8.91079 6.64707 9.03019L11.3542 11.9722C11.9635 11.1784 12.922 10.6667 14 10.6667C15.8409 10.6667 17.3333 12.159 17.3333 14C17.3333 15.8409 15.8409 17.3333 14 17.3333C12.1591 17.3333 10.6667 15.8409 10.6667 14C10.6667 13.6678 10.7152 13.3472 10.8057 13.0444L6.28417 10.2185ZM14 5.33333C15.1045 5.33333 16 4.43791 16 3.33333C16 2.22876 15.1045 1.33333 14 1.33333C12.8955 1.33333 12 2.22876 12 3.33333C12 4.43791 12.8955 5.33333 14 5.33333ZM16 14C16 15.1046 15.1045 16 14 16C12.8955 16 12 15.1046 12 14C12 12.8954 12.8955 12 14 12C15.1045 12 16 12.8954 16 14Z" fill={theme.palette.mode === 'dark' ? "#ffffff95" : "#00000095"}/>
  </svg>

  {/* SVG FIX CLIP PATH */}

</IconButton>
</Tooltip>

<Popover onClose={()=>{setSharePopper(curr => ({...curr, open :false}))}} anchorEl={sharePopper.anchorEl} open={sharePopper.open} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}>
<Box style={{
            borderRadius: '8px',
            padding: '0.5rem 0.5rem',
            backgroundColor: 'white'
        }}>
            <h2 style={{fontSize: '0.96rem', fontWeight: 900, color: '#00000090', marginBlock: '0', borderBottom: '1px solid #c4c4c4', marginBottom: '1rem', paddingBottom: '0.5rem', fontFamily: 'Rubik'}}>Share Via,</h2>
            
            <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly', gap: '1rem',maxWidth: '150px'}}>
              <Zoom in style={{transitionDelay: '0ms'}}>

                <Tooltip title="Copy URL">
                    <IconButton onClick={() => {navigator.clipboard.writeText(`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`);snackbar.open('simple', "Copied to clipboard!");setSharePopper(curr => ({...curr, open :false}))}}>
                        <ContentCopyOutlined style={{color: 'black'}} />
                        
                    </IconButton>
                    
                </Tooltip>
              </Zoom>

              <Zoom in style={{transitionDelay: '100ms'}}>

                <FacebookShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
              </Zoom>

              <Zoom in style={{transitionDelay: '200ms'}}>

                <PinterestShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <PinterestIcon size={32} round />
                </PinterestShareButton>
              </Zoom>

              <Zoom in style={{transitionDelay: '300ms'}}>

                <RedditShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <RedditIcon size={32} round />
                </RedditShareButton>
              </Zoom>

              <Zoom in style={{transitionDelay: '400ms'}}>

                <WhatsappShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <WhatsappIcon size={32} round />
                </WhatsappShareButton>

              </Zoom>

              <Zoom in style={{transitionDelay: '500ms'}}>

                <LinkedinShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Zoom>

              <Zoom in style={{transitionDelay: '600ms'}}>

                <TwitterShareButton
                    url={`${FRONTEND_ROOT_URL}explore/post/${spacks && spacks[currentSpackCounter].id}`} >
                    <TwitterIcon size={32} round />
                </TwitterShareButton>

              </Zoom>
            </div>
        </Box>
</Popover>

<Tooltip title="ChitChats" placement='top'>

<IconButton  onClick={(e) => {setCommentPopper({...commentPopper, open: !commentPopper.open, anchorEl: e.currentTarget});loadComments();}}>
  {/* <svg width="20" height="20" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M17.2142 1.89345C16.8887 1.56801 16.3611 1.56801 16.0356 1.89345C15.7102 2.21888 15.7102 2.74653 16.0356 3.07196L17.124 4.16031L9.04274 10.2212L7.19677 8.37526C6.87134 8.04983 6.34371 8.04983 6.01827 8.37526C5.69284 8.7007 5.69284 9.22833 6.01827 9.55376L8.37529 11.9108L10.1431 13.6786L4.69244 19.1292C4.36701 19.4547 4.36701 19.9823 4.69244 20.3077C5.01789 20.6332 5.54552 20.6332 5.87096 20.3077L11.3216 14.8571L13.0893 16.6248L15.4464 18.9818C15.7718 19.3073 16.2994 19.3073 16.6249 18.9818C16.9504 18.6565 16.9504 18.1288 16.6249 17.8033L14.7789 15.9574L20.8399 7.87616L21.9282 8.96451C22.2537 9.28995 22.7812 9.28995 23.1067 8.96451C23.4322 8.63908 23.4322 8.11145 23.1067 7.786L21.3389 6.01823L18.9819 3.66121L17.2142 1.89345ZM10.2332 11.4117L18.3145 5.35078L19.6494 6.6857L13.5884 14.7669L10.2332 11.4117Z" fill={theme.palette.mode === 'dark' ? "#ffffff95" : "#00000095"}/>
  </svg> */}
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill={theme.palette.mode === 'dark' ? "#ffffff95" : "#00000095"} fillRule="evenodd" clipRule="evenodd"></path></svg>

  {/* SVG FIX CLIP PATH */}

</IconButton>
</Tooltip>

<Popover anchorEl={commentPopper.anchorEl} open={commentPopper.open} onClose={(e) => {setCommentPopper({...commentPopper, open: false})}} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}>
  <Grow in>
<List sx={{
            padding: '0.5rem 0.5rem',
            bgcolor: 'background.paper',
            boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25);'
        }}> 
              <div style={{display: 'flex',alignItems: 'center', justifyContent: 'space-between'}}>
              <h3 style={{marginBlock: '0', margin: '0.75rem 0 0.75rem 0.75rem'}}>Chit-Chats</h3>
                <IconButton onClick={loadComments} disabled={commentsContext.loading || !commentsContext.has_next} style={{marginRight: '0.5rem'}}><ArrowForwardIos style={{width: '15px', height: '15px'}} /></IconButton>
              </div>
              <Divider variant='middle' />
              {
                commentsContext.loading ? 
                  <center><CircularProgress size={18} style={{margin: '2rem 0'}} /></center>:

                  commentsContext.data.length ? commentsContext.data.map((comment, idx) => (

                      <Fade in key={comment.id} style={{transitionDelay: `${idx+1}00ms`}}>
                        
                        <ListItem>

                        <ListItemAvatar>
                      <Avatar sx={{width: '30px', height: '30px'}} />
                    </ListItemAvatar>
                          <ListItemText primary={comment.descr} secondary={<Link href={`${FRONTEND_ROOT_URL}view_profile/${comment.author_username}`}><a href={`${FRONTEND_ROOT_URL}view_profile/${comment.author_username}`}>{comment.author_username}</a></Link>} />

                        </ListItem>

                      </Fade>
                  )) : <center style={{color: '#c1c1c190', margin: '2rem', fontSize: '1rem'}}>• No chit chats •</center>
              }
            



        </List>

  </Grow>
</Popover>

<Tooltip title="More Options" placement='top'>

<IconButton onClick={(e) => {setMoreOptionsPopover({...moreOptionsPopover, open: !moreOptionsPopover.open, anchorEl: e.currentTarget})}}>
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M11.5 3.33333C11.5 4.16175 10.8284 4.83333 10 4.83333C9.17157 4.83333 8.5 4.16175 8.5 3.33333C8.5 2.5049 9.17157 1.83333 10 1.83333C10.8284 1.83333 11.5 2.5049 11.5 3.33333ZM11.5 9.99999C11.5 10.8284 10.8284 11.5 10 11.5C9.17157 11.5 8.5 10.8284 8.5 9.99999C8.5 9.17157 9.17157 8.49999 10 8.49999C10.8284 8.49999 11.5 9.17157 11.5 9.99999ZM10 18.1667C10.8284 18.1667 11.5 17.4951 11.5 16.6667C11.5 15.8383 10.8284 15.1667 10 15.1667C9.17157 15.1667 8.5 15.8383 8.5 16.6667C8.5 17.4951 9.17157 18.1667 10 18.1667Z" fill={theme.palette.mode === 'dark' ? "#ffffff95" : "#00000095"}/>
  </svg>

  {/* SVG FIX CLIP PATH */}

</IconButton>
</Tooltip>

<Popover anchorEl={moreOptionsPopover.anchorEl} open={moreOptionsPopover.open} onClose={(e) => {setMoreOptionsPopover({...moreOptionsPopover, open: false})}} anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}>
  <Grow in>
<List sx={{
            padding: '0.5rem 0.5rem',
            bgcolor: 'background.paper',
            boxShadow: '0px 0px 6px rgba(0, 0, 0, 0.25);'
        }}> 



          <ListItem disablePadding>
            <ListItemButton onClick={handlePinSpack}>
              <ListItemIcon>
              <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.3285 1.13607C10.1332 0.940809 9.81662 0.940808 9.62136 1.13607C9.42609 1.33133 9.42609 1.64792 9.62136 1.84318L10.2744 2.49619L5.42563 6.13274L4.31805 5.02516C4.12279 4.8299 3.80621 4.8299 3.61095 5.02516C3.41569 5.22042 3.41569 5.537 3.61095 5.73226L5.02516 7.14648L6.08582 8.20714L2.81545 11.4775C2.62019 11.6728 2.62019 11.9894 2.81545 12.1846C3.01072 12.3799 3.3273 12.3799 3.52256 12.1846L6.79293 8.91425L7.85359 9.97491L9.2678 11.3891C9.46306 11.5844 9.77965 11.5844 9.97491 11.3891C10.1702 11.1939 10.1702 10.8773 9.97491 10.682L8.86733 9.57443L12.5039 4.7257L13.1569 5.37871C13.3522 5.57397 13.6687 5.57397 13.864 5.37871C14.0593 5.18345 14.0593 4.86687 13.864 4.6716L12.8033 3.61094L11.3891 2.19673L10.3285 1.13607ZM6.13992 6.84702L10.9887 3.21047L11.7896 4.01142L8.15305 8.86015L6.13992 6.84702Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
              </ListItemIcon>
              <ListItemText primary={spacks && spacks[currentSpackCounter].is_bookmarked ? "Unpin Spack" : "Pin Spack"} />
            </ListItemButton>
          </ListItem> 

          {auth.is_authenticated && spacks && (auth.user_data.username === spacks[currentSpackCounter].author_name) && <ListItem disablePadding>
            <ListItemButton onClick={delinkPost}>
              <ListItemIcon>
                <LinkOffOutlined />
              </ListItemIcon>
              <ListItemText primary="De-Link " />
            </ListItemButton>
          </ListItem>}  

          <ListItem disablePadding>
            <ListItemButton onClick={(e) => {setOpenReport(curr => !curr)}}>
              <ListItemIcon>
                <Report />
              </ListItemIcon>
              <ListItemText primary="Report" />
              {openReport ? <ExpandLess style={{marginLeft: '0.8rem'}} /> : <ExpandMore style={{marginLeft: '0.8rem'}} />}
            </ListItemButton>
          </ListItem> 


          <Collapse in={openReport} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }} onClick={async () => {
            setMoreOptionsPopover(curr => ({...curr, open: false}))

            if(spacks){
              const flag = await report_spack_as_inappropriate(spacks[currentSpackCounter].id);
              if(flag === -1){snackbar.open('error', "Please provide valid Message.");return}
              if(flag){snackbar.open('simple', "Thanks for reporting, We'll monitor it now onwards!")}
              else{snackbar.open('error', "Unable to report, try again in a while!")}
              }}}
          >
            <ListItemIcon>
              <EmojiFlags />
            </ListItemIcon>
            <ListItemText primary={"Flag as In-appropriate"} />
            <Tooltip title="Spack contains abusive, harmfull, sexual, offensive, insulting words/meaning">
              <Info  style={{scale: '0.75', opacity: '0.3'}} />

            </Tooltip>
            {/* <IconButton style={{scale: '0.75'}}> */}
            {/* </IconButton> */}
          </ListItemButton>
          <ListItemButton sx={{ pl: 3 }} onClick={async () => {
            if(spacks){
              setMoreOptionsPopover(curr => ({...curr, open: false}))

              const flag = await report_spack_as_nonspack(spacks[currentSpackCounter].id);

              if(flag){snackbar.open('simple', "Thanks for reporting, We'll monitor it now onwards!")}
              else{snackbar.open('error', "Unable to report, try again in a while!")}
              }}}>
            <ListItemIcon>
              <ReportProblemOutlined />
            </ListItemIcon>
            <ListItemText primary="Non-Spack Flag" />
            <Tooltip title="Spack doesn't belong to a hack, trick, tip. Doesn't meant to be on this platform as Spack">
              <Info  style={{scale: '0.75', opacity: '0.3'}} />

            </Tooltip>
          </ListItemButton>
        </List>
      </Collapse>

        </List>

  </Grow>
</Popover>

</div>

<div className={styles.spack}>
<motion.p animate={spack_controls} style={auth.is_on_mobile && {fontSize: '1.2rem', padding: '2.5rem'}}>
{spacks && spacks[currentSpackCounter].descr.slice(0, 300)}
</motion.p>
{spacks && (spacks[currentSpackCounter].image_1 || spacks[currentSpackCounter].image_2 || spacks[currentSpackCounter].image_3 || spacks[currentSpackCounter].image_4) && <motion.button onClick={() => {setShowImages(currentlyShowing => !currentlyShowing)}} whileTap={{scale: 0.85}} transition={{duration: 0.02}} className={styles.toggle_images}>
  {
     showImages ? 
    <HideImageOutlined /> :
    <svg width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.50002 1.4H17.5C18.6598 1.4 19.6 2.3402 19.6 3.5V17.5C19.6 18.6598 18.6598 19.6 17.5 19.6H3.50002C2.34022 19.6 1.40002 18.6598 1.40002 17.5V3.5C1.40002 2.3402 2.34022 1.4 3.50002 1.4ZM3.50002 2.8C3.11343 2.8 2.80002 3.1134 2.80002 3.5V11.709L5.15454 9.35452C5.27535 9.23371 5.44003 9.16716 5.61086 9.1701C5.78167 9.17302 5.94398 9.24521 6.06055 9.3701L11.023 14.6861L14.9545 10.7545C15.2005 10.5085 15.5995 10.5085 15.8455 10.7545L18.2 13.109V3.5C18.2 3.1134 17.8866 2.8 17.5 2.8H3.50002ZM2.80002 17.5V13.491L5.58444 10.7065L10.5436 16.0189L12.5176 18.2H3.50002C3.11343 18.2 2.80002 17.8865 2.80002 17.5ZM17.5 18.2H14.217L11.8767 15.6142L15.4 12.091L18.2 14.891V17.5C18.2 17.8865 17.8866 18.2 17.5 18.2ZM9.30893 7.7C9.30893 7.04218 9.84221 6.50891 10.5 6.50891C11.1578 6.50891 11.6911 7.04218 11.6911 7.7C11.6911 8.35782 11.1578 8.89109 10.5 8.89109C9.84221 8.89109 9.30893 8.35782 9.30893 7.7ZM10.5 5.24891C9.14632 5.24891 8.04893 6.3463 8.04893 7.7C8.04893 9.0537 9.14632 10.1511 10.5 10.1511C11.8537 10.1511 12.9511 9.0537 12.9511 7.7C12.9511 6.3463 11.8537 5.24891 10.5 5.24891Z" fill="black"/>
    </svg>

  }
</motion.button>}
{/* <p>The headshots are always been used for flex/proness showoff, also are one of the hardest move to make in almost every game, so in this post i am gonna teach you top headshots to </p> */}
</div>

{/* use controller for below animation */}
<motion.div animate={showImages ? {height: ['0px', '100px']} : {height: ['100px', '0px']}}transition={{duration: '0.2'}} style={{display: 'flex', overflowX: 'auto', overflowY: 'hidden'}}>
{ spacks && ['A', 'B', 'X', 'Y'].map((imageIdentifier, idx) => (
  spacks[currentSpackCounter][`image_${idx+1}`] && 
  <div key={idx} style={{position: 'relative', height: '100px', width: 'auto', marginRight: '1rem'}}>
    <Image width="150" height="100" style={{borderRadius: '8px'}} src={spacks[currentSpackCounter][`image_${idx+1}`]} />
    <div style={{position: 'absolute', bottom: '0', padding: '0.5rem', borderRadius: '0 0 8px 8px', width :'100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to top, black, transparent)'}}>
      <b style={{color: 'white'}}>Image-{imageIdentifier}</b>
      <IconButton style={{padding: '0.2rem', color: 'white'}} onClick={() => {detailImageView.set_open(true, spacks[currentSpackCounter][`image_${idx+1}`])}}>

        <Fullscreen />
      </IconButton>
      </div>
  </div>
    ))

}
</motion.div>
{/* <div style={{position: 'relative', height: '100px', width: 'auto', marginRight: '1rem'}}>
  <img height="100" style={{borderRadius: '8px'}} src="data:image/jpeg;base64,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" ></img>
  <div style={{position: 'absolute', bottom: '0', padding: '0.5rem', borderRadius: '0 0 8px 8px', width :'100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to top, black, transparent)'}}><b>Image-A</b><Fullscreen /></div>
</div>

<div style={{position: 'relative', height: '100px', width: 'auto', marginRight: '1rem'}}>
  <img height="100" style={{borderRadius: '8px'}} src="data:image/jpeg;base64,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" ></img>
  <div style={{position: 'absolute', bottom: '0', padding: '0.5rem', borderRadius: '0 0 8px 8px', width :'100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to top, black, transparent)'}}><b>Image-A</b><Fullscreen /></div>
</div> */}
<div className={styles.actions}>
<TextField disabled={commentContext.loading} error={commentContext.error} onKeyDown={(e) => {if(e.key === 'Enter'){submitComment()}}} onChange={(e) => {setCommentContext(curr => ({...curr, comment: e.target.value}))}} value={commentContext.comment} variant="standard" placeholder='Your view...' inputProps={{style: {fontFamily: 'Chivo'}}} sx={{fontFamily: 'Poppins', width: '35%'}} InputProps={{endAdornment: (
  <IconButton onClick={submitComment}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_8_60)">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.4437 1.25174C1.20578 1.14599 0.926815 1.20576 0.753098 1.39969C0.579382 1.59362 0.550559 1.87746 0.681746 2.10235L4.70539 9.00002L0.681746 15.8977C0.550559 16.1226 0.579382 16.4064 0.753098 16.6003C0.926815 16.7942 1.20578 16.854 1.4437 16.7483L17.6437 9.54831C17.8603 9.45201 18 9.23714 18 9.00002C18 8.76291 17.8603 8.54804 17.6437 8.45174L1.4437 1.25174ZM5.81464 8.52002L2.65481 3.1032L15.9227 9.00002L2.65481 14.8968L5.81463 9.48002H10.8C11.0651 9.48002 11.28 9.26512 11.28 9.00002C11.28 8.73493 11.0651 8.52002 10.8 8.52002H5.81464Z" fill={theme.palette.mode === 'dark' ? "#ffffff50" : "#00000050"}/>
    </g>
    <defs>
    <clipPath id="clip0_8_60">
    <rect width="18" height="18" fill="white"/>
    </clipPath>
    </defs>
    </svg>

  </IconButton>)}} />
<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
{/* <button onClick={like} className={styles.action_btn} style={{ boxShadow: `0 0 0 1px ${theme.palette.mode === 'dark' ? '#ffffff95' : '#00000095'}`, color: theme.palette.mode === 'dark' ? '#ffffff99' : '#00000099'}}> */}
<button onClick={like} className={styles.action_btn} 
// style={{ backgroundColor: theme.palette.mode === 'dark' ? (spacks && spacks[currentSpackCounter].is_liked) ? '#1d1ce5': '#ffffff95' : ((spacks && spacks[currentSpackCounter].is_liked) ? '#1d1ce555': '#00000095'), color: theme.palette.mode === 'dark' ? (spacks && spacks[currentSpackCounter].is_liked) ? 'white': '#ffffff95' : ((spacks && spacks[currentSpackCounter].is_liked) ? '#1d1ce5': '#00000095')}}
style={{

  boxShadow: `0 0 0 1px ${(spacks && spacks[currentSpackCounter].is_liked) ? 'transparent' : theme.palette.mode === 'dark' ? '#ffffff95' : '#00000095'}`,
  backgroundColor: (spacks && spacks[currentSpackCounter].is_liked) ? theme.palette.mode === 'dark' ? '#1d1ce5' : '#1d1ce535' : 'transparent',
  color: (spacks && spacks[currentSpackCounter].is_liked) ? theme.palette.mode === 'dark' ? 'white' : '#1d1ce5' : theme.palette.mode === 'dark' ? '#ffffff99' : '#00000099'


}}
>
  {/* dark: bg: #1d1ce5 color: white */}
  {/* white: bg: #1d1ce555 color: #1d1ce5 */}
{/* E0144C */}
<ThumbUpOutlined />
<b>{spacks && spacks[currentSpackCounter].likes}</b>

</button>

<button className={styles.action_btn}
 style={{

  boxShadow: `0 0 0 1px ${(spacks && spacks[currentSpackCounter].is_disliked) ? 'transparent' : theme.palette.mode === 'dark' ? '#ffffff95' : '#00000095'}`,
  backgroundColor: (spacks && spacks[currentSpackCounter].is_disliked) ? theme.palette.mode === 'dark' ? '#E0144C' : '#E0144C35' : 'transparent',
  color: (spacks && spacks[currentSpackCounter].is_disliked) ? theme.palette.mode === 'dark' ? 'white' : '#E0144C' : theme.palette.mode === 'dark' ? '#ffffff99' : '#00000099'


}}
 onClick={dislike}
 >

<ThumbDownOutlined />
<b>{spacks && spacks[currentSpackCounter].dislikes}</b>

</button>

</div>

</div>

</div>

<div style={{display: 'flex', alignItems: 'center', gap: '0.8rem', width: '100%', marginTop: '1rem', marginBottom: '4rem'}}>
<StyledButton disabled={currentSpackCounter === 0} onClick={decreaseSpackCounter} sx={{flex: '1', padding: '1.5rem', backgroundColor: `#00000007`}}>
  <ArrowBack />
</StyledButton>
{/* loading
if(!has_end){

  if(currentSpackCounter+1 === spacks.length){
    'loading'
  }else{
    'active'
  }

}
disabled
if(has_end){
  currentSpackCounter+1 === spacks.length ? true(disabled) : false(enabled)
} */}
<StyledButton loading={spacks && (!hasEnd && (currentSpackCounter+1 === spacks.length) && loading )} disabled={!spacks || (hasEnd && currentSpackCounter+1 === spacks.length)} onClick={() => {if(currentSpackCounter === spacks.length-1){loadMorePosts()}else{increaseSpackCounter()}}} sx={{flex: '1', padding: '1.5rem', backgroundColor: `#00000005`}}>
  <ArrowForward />
</StyledButton>

</div>

      </React.Fragment>

    )

}

export default Feed

