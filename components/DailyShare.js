import { ExpandMore, ExpandLess, FavoriteBorder, Favorite, Share, Download, Report, PlayArrow, Pause, DeleteOutline } from '@mui/icons-material';
import { Avatar, IconButton, Slider, CircularProgress, Modal, Box, Tooltip } from '@mui/material';
import { animationControls, motion, useAnimation, useTransform } from 'framer-motion'
import Image from 'next/image';
import React, { Fragment, useCallback, useEffect, useState, useContext, useRef } from 'react'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../config';
import DailyShareContext from './basic/contexts/daily_share_context';
import SnackbarContext from './basic/contexts/snackbar_context';
import styles from './DailyShare.module.css'
import getBlobDuration from 'get-blob-duration'
import SpadeLoader from './basic/SpadeLoader';
import authContext from '../components/basic/contexts/layout_auth_context'
import {useRouter} from 'next/router'
import Link from 'next/link'
import { ContentCopyOutlined } from '@mui/icons-material'
import useLongPress from '../hooks/use-long-press'

import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, PinterestIcon, PinterestShareButton, RedditIcon, RedditShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'next-share'
import styled from '@emotion/styled'

const StyledIconButton = styled(IconButton)`

&:after{
    color: blue;
}

`

const color_pallates = [

  {
    name: 'green',
    primary: '#8FD9A8',
    secondary: '#E2F1DD'
  },
  {
    name: 'purple',
    primary: '#C1A1D3',
    secondary: '#F6EEEC'
  },
  {
    name: 'pink',
    primary: '#F38BA0',
    secondary: '#FBDEDB'
  },
  {
    name: 'yellow',
    primary: '#F4D160',
    secondary: '#FCEFCB'
  },
  {
    name: 'blue',
    primary: '#3DB2FF',
    secondary: '#CEE7F3'
  }



]

function* pallateGenerator(){

  let palleteIndex = 0;

  while(1) {


    yield color_pallates[palleteIndex]

    palleteIndex = palleteIndex === (color_pallates.length-1) ? 0 : palleteIndex + 1;

  }

}

const palleteIterator = pallateGenerator();


function get_pallete_variant(pallete_name, variant) {

  for(let i = 0; i < color_pallates.length; i++){

    if(color_pallates[i].name === pallete_name){

      return color_pallates[i][variant] // Primary | Secondary

    }

  }  

}

function DailyShare() {
    
    
    const router = useRouter();
    const [ contentDetais, setContentDetails ] = useState({mode: router.query.type ?? 'audio', current_audio_page: { page_no: 0, isLoaded: false, isFinished: false }, current_text_page: { page_no: 0, isLoaded: false, isFinished: false },current_audio_id: null,audio_content_loaded:false, text_content_loaded: false, error:false, audio_content: [], text_content: []})

    const snackbar = useContext(SnackbarContext);
    const auth = useContext(authContext);

    const controls = useAnimation();

    const heroControl = useAnimation();
    const modesControl = useAnimation();
    const mainContentControls = useAnimation();
    const [contentLoaded, setContentLoaded] = useState(contentDetais[`${contentDetais.mode}_content_loaded`])
    const mainLogoRef = useRef(null);

    const toggleContentMode = () => {

      setContentDetails(curr => {return{...curr,mode: curr.mode === 'audio' ? 'text' : 'audio'}})

    }

    const animatePageLoad = useCallback(async () => {

      if(contentDetais[contentDetais.mode + '_content_loaded']) return

      await controls.start({ scale: 4, transition: { duration: 0.5 } })

      await controls.start({ left: '1rem', top: '7.5rem', scale: [4, 3.5, 2.5, 2, 1.5, 1],transition: { duration: 0.7 } })

      await heroControl.start({ opacity: 1, marginLeft: '45px', transition: { duration: 0.8 } })

      await modesControl.start({ opacity: 1, transform: 'scale(1)',  transition: { duration: 0.15 }})
      // console.log("Reached")
      await mainContentControls.start({ y: [300, 0], opacity: [0, 1], transition: { duration: 0.15 }})

      
    }, [])

    const listenWindowScroll = () => {
      if(window.scrollY > 25){
        mainLogoRef.current.style.opacity = 0;
      }
      else if(window.scrollY === 0){

        mainLogoRef.current.style.opacity = 1;

      }
      else if(window.scrollY < 25){
        mainLogoRef.current.style.opacity = 0.5;

      }
      

    }
    
    useEffect(() => {
      
      let timerId = null;
      
      window.addEventListener("scroll", listenWindowScroll)
      if(!(contentDetais[contentDetais.mode + '_content_loaded'])){
        setContentLoaded(false)
        mainContentControls.start({ opacity: '0' })

        controls.start({left: '50%', top: '50%', scale: 4, transition: {duration: 0.3}})
        controls.start({ scale: [4, 3.9, 3.95, 3.9, 4, 3.9, 3.9, 4, 4, 4, 4, 4], transition: { duration: 2, repeat: Infinity } })
        
        // timerId = setTimeout(animatePageLoad, 3000)
      }

      return () => {

        // console.log(contentDetais[contentDetais.mode + '_content_loaded'])

        if(timerId ){
          console.log("Wahi Animate ho rha")
          animatePageLoad()
          // console.log("Clearing Inteval")
          clearTimeout(timerId)
        }

        window.removeEventListener("scroll", listenWindowScroll)
        
      }
      
    }, [contentDetais.mode])


    const loaded = (mode) => {
      setContentLoaded(true)
      setContentDetails(curr => {return {...curr, [mode + '_content_loaded']: true}})
      animatePageLoad() 
    }

    const display_error = (error_message) => {

      snackbar.open("error", error_message ?? "Something went wrong!");

    }

    const set_page = (type, page_no=null, is_loaded=null) => {
      console.log("Triggered:", page_no, is_loaded)
      if(page_no !== null){
// Not updating
        setContentDetails(curr => {return {...curr, [`current_${type}_page`]: {...curr[`current_${type}_page`],page_no:page_no}}})
      }

      if(is_loaded !== null){

        setContentDetails(curr => {return {...curr, [`current_${type}_page`]: {...curr[`current_${type}_page`],isLoaded: is_loaded}}})
      }
      console.log("NOTH:", contentDetais)
      
    }

    const set_current_audio = (audio_id) => {

      setContentDetails(curr => {return {...curr, current_audio_id: audio_id}})

    }

    const finish_mode = (mode) => {

      setContentDetails(curr => {return {...curr, [`current_${mode}_page`]: {...curr[`current_${mode}_page`],isFinished: true}}})

    }

    const like = async (target_post_id) => {

        if(!auth.is_authenticated) {
            auth.set_open_drawer(true, "Login Required !")
            return;
        }

      setContentDetails(curr => {return { ...curr, audio_content: curr.audio_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: true, likes: [...val.likes.filter((val) => val !== auth.user_data.username), auth.user_data.username] } : val }) }})
      setContentDetails(curr => {return { ...curr, text_content: curr.text_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: true, likes: [...val.likes.filter((val) => val !== auth.user_data.username), auth.user_data.username] } : val }) }})

      const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          ds_id: target_post_id,
          action: 'like' 
  
        })
      })

      if(response.status !== 201){

        setContentDetails(curr => {return { ...curr, audio_content: curr.audio_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: false, likes: [...val.likes.filter((val) => val !== auth.user_data.username)] } : val }) }})
        setContentDetails(curr => {return { ...curr, text_content: curr.text_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: false, likes: [...val.likes.filter((val) => val !== auth.user_data.username)] } : val }) }})
  

        display_error("Currently, unable to add like!")

      }
    }

    const unlike = async (target_post_id) => {

      if(!auth.is_authenticated) {
          auth.set_open_drawer(true, "Login Required !")
          return;
      }
      
      setContentDetails(curr => {return { ...curr, audio_content: curr.audio_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: false, likes: [...val.likes.filter((val) => val !== auth.user_data.username)] } : val }) }})
      setContentDetails(curr => {return { ...curr, text_content: curr.text_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: false, likes: [...val.likes.filter((val) => val !== auth.user_data.username)] } : val }) }})

      const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          ds_id: target_post_id,
          action: 'unlike' 
  
        })
      })

      if(response.status !== 201){
        setContentDetails(curr => {return { ...curr, audio_content: curr.audio_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: true, likes: [...val.likes.filter((val) => val !== auth.user_data.username), auth.user_data.username] } : val }) }})
        setContentDetails(curr => {return { ...curr, text_content: curr.text_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: true, likes: [...val.likes.filter((val) => val !== auth.user_data.username), auth.user_data.username] } : val }) }})
  
        display_error("Currently, unable to remove like!")

      }
      
      // const response = await fetch(/* LIKE_API_URL */)
      
      // if(response.status !== 201){
        //   setContentDetails(curr => {return { ...curr, audio_content: audio_content.map((val, idx) => {return val.id === target_post_id ? { ...val, isLiked: true } : val }) }})

        //   display_error("Currently, unable to remove like!")
        
        // }
      }

    const set_content = (type, content) => {
      console.log("Call:", type, content, contentDetais)
      if(type === 'audio') setContentDetails(curr => {return {...curr, audio_content: content}})
      else if (type === 'text') setContentDetails(curr => {return {...curr, text_content: content}})
      
    }

  return (
    <Fragment>
      <motion.div ref={mainLogoRef} animate={controls}  style={{position: 'fixed', left: '50%', top: '50%', transform: 'scale(4)'}}>

        <svg width="40" height="40" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 10.2083V24.7917" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M21.875 14.5833V20.4167" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M26.25 11.6667V23.3333" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M30.625 18.9583V16.0417" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M13.125 5.83333V29.1667" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M8.75 13.125V21.875" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
          <path d="M4.375 18.9583V16.0417" stroke="#AFB1F3" strokeWidth="2" strokeLinecap="square"/>
        </svg>


      </motion.div>
        <div style={{display: 'flex', alignItems: 'center', padding: '0.3rem 1rem', justifyContent: 'space-between', marginTop: '1.5rem', maxWidth: '1000px'}}>
          
          <motion.h2 animate={heroControl} style={{ opacity: '0',color: '#2329D6', fontFamily: 'Poppins', fontWeight: '700', marginBlock: '0', marginLeft: '0' }}>Daily Share</motion.h2>

          <motion.div animate={modesControl} style={{display: 'flex', opacity: '0', transform: 'scale(2)', gap: '0.5rem', alignItems: 'flex-end', marginRight: '0.5rem'}}>
            <svg onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}}  onClick={toggleContentMode} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 11.25V3.75L12.5 1.875V10" stroke={contentDetais.mode === 'audio'?"#2329D6":"#2329D690"} strokeWidth="2" strokeLinecap="round"/>
              <path d="M3.717 12.8191C2.79971 13.1529 1.87566 12.9278 1.65308 12.3163C1.43051 11.7048 1.99368 10.9384 2.91097 10.6045C3.82826 10.2707 4.75231 10.4957 4.97489 11.1073C5.19746 11.7188 4.63429 12.4852 3.717 12.8191ZM11.217 11.5691C10.2997 11.9029 9.37566 11.6778 9.15308 11.0663C8.93051 10.4548 9.49368 9.68839 10.411 9.35452C11.3283 9.02066 12.2523 9.24575 12.4749 9.85727C12.6975 10.4688 12.1343 11.2352 11.217 11.5691Z" stroke={contentDetais.mode === 'audio'?"#2329D6":"#2329D690"} strokeWidth="2" strokeLinecap="square"/>
            </svg>

            <svg onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={toggleContentMode} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.5 5L3.125 2.5H7.5M12.5 5L11.875 2.5H7.5M7.5 2.5V12.5M7.5 12.5H5M7.5 12.5H10" stroke={contentDetais.mode === 'audio'?"#2329D690":"#2329D6"} stroke-width="2" stroke-linecap="square"/>
            </svg>


          </motion.div>

        </div>

      {/* MAIN_CONTENT */}

        {/* On Initial Load/Loading */}
        <DailyShareContext.Provider value={{...contentDetais, finish_mode: finish_mode, set_page: set_page,set_current_audio: set_current_audio,set_content: set_content, display_error: display_error, like: like, unlike: unlike, loaded: loaded}}>
    
              { (<motion.div style={{ opacity: '0', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', paddingBottom: !contentLoaded?'60vh':'0vh' }} animate={mainContentControls}>{contentDetais.mode === 'audio' ? <AudioDailyContent /> : <TextDailyContent />}</motion.div> )}

        </DailyShareContext.Provider>

    </Fragment>
  )
}

function AudioDailyContent() {

  // Add Fade Animation for ?id=xyz

  const { audio_content, loaded, display_error, set_content, finish_mode, current_audio_page:page_details, set_page } = useContext(DailyShareContext)
  const router = useRouter();

  const { page_no, isLoaded: page_loaded, isFinished } = page_details;
  const auth = useContext(authContext)
  const fetchTriggerRef = useRef(null);
  const observer = useRef(null);
  const [doFetch, setDoFetch] = React.useState(false)
  const [agree, setAgree] = React.useState(false);
  const [currentTextContent, setCTC] = React.useState(audio_content)

  const snackbar = useContext(SnackbarContext)



  const fetchNextPage = async (page_no) => {


    let response;
    if(!router.query.id){

      response = await fetch(`${FRONTEND_ROOT_URL}api/get_daily_shares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          type: 'audio',
          needed_page: page_no+1
  
        })
      })
    } else {

      response = await fetch(`${FRONTEND_ROOT_URL}api/get_daily_shares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          type: 'audio',
          needed_page: page_no+1,
          specific_id: router.query.id
        })
      })
      

    }
    const { has_more, new_audio_content:new_page_audio_content } = await response.json();
    if (response.status === 200) {
      if(!has_more){
        // setPage((currPage) => currPage + 1)

        set_page('audio', page_no+1, true)

        // set_page('text', page+1, true)
        set_content('audio', [...audio_content, ...new_page_audio_content.map((val, idx) => {return {...val, colorPallete: palleteIterator.next().value.name, isLiked: val.likes?.includes(auth.user_data.username)}})])
        snackbar.open("success", "You've got all of it!")
        // Remove Event Listener.
        if(!page_loaded){

          loaded('audio')
        }
        fetchTriggerRef.current.style.display = "none";
        observer.current?.disconnect()
        finish_mode('audio')

        return;
      }
      // setPage((currPage) => currPage + 1)
      // set_page('text', page+1)
      if(!page_loaded){

        loaded('audio')
      }
      set_page('audio', page_no+1, true)

      set_content('audio', [...text_content, ...new_page_audio_content.map((val, idx) => {return {...val, colorPallete: palleteIterator.next().value.name, isLiked: val.likes?.includes(auth.user_data.username)}})])

      if(isInViewport(fetchTriggerRef.current)){
        // fetchNextPage(page_no+1);
        setDoFetch(true);
        setAgree(curr => curr === null ? true : null)

      }

    } else {

      snackbar.open("error", "Unable to get new posts.")

    }

  }

  useEffect(() => {

    if(isFinished){
      fetchTriggerRef.current.style.display = "none"
    }

  }, [isFinished])

  useEffect(() => {
    // I have no idea what i am doing :D // TAKE IT EASY MAN
    if(doFetch === false || isFinished) return;
    if(!doFetch) return;
    fetchNextPage(page_no) 

    setDoFetch(false);

  }, [agree])

  useEffect(() => {
    if(page_loaded || isFinished) return;
    const options = {
      root: document,
      rootMargin: "0px",
      threshold: 0
    }

    const callbackFn = async (entries) => {
      // console.log('PageNo', page_no)
      if(entries[0].isIntersecting){

        setDoFetch(true);
        setAgree(curr => curr === null ? true : null)


      }

    }



    
    observer.current = new IntersectionObserver(callbackFn, options);

    if (fetchTriggerRef.current) {
      observer.current.observe(fetchTriggerRef.current);
    }

    return () => {

      observer.current.disconnect();

    }

  }, [])


  return (
    
    <React.Fragment>
      
      {
        audio_content.length > 0 ? 
        audio_content.map((val, idx) => (
          <AudioPost key={idx} data={val} />
        ))
        : <b><br/>Strange!, no share(s) found.</b>

      }
      <div  ref={fetchTriggerRef} style={{style: '1px solid red',width: '50%', height: '40px',display: 'grid', placeItems: 'center', marginTop: '2rem'}}> 
        <SpadeLoader is_loading />
      </div>

      {/* <CircularProgress ref={fetchTriggerRef} /> */}

    </React.Fragment>
    

  )

}

function isInViewport(el) {

  // Thanks to stack overflow :D for this function

  if (!el) return false;
  const top = el.getBoundingClientRect().top;
  return (top) >= 0 && (top) <= window.innerHeight;
}

function TextDailyContent() {

  const { text_content, loaded, display_error, set_content, finish_mode, current_text_page:page_details, set_page } = useContext(DailyShareContext)

  const router = useRouter();

  // console.log("NOH:", router)



  const { page_no, isLoaded: page_loaded, isFinished } = page_details;
  console.log("REnderL:", text_content)
  const auth = useContext(authContext)
  const fetchTriggerRef = useRef(null);
  const observer = useRef(null);
  const [doFetch, setDoFetch] = React.useState(false)
  const [agree, setAgree] = React.useState(false);
  const [currentTextContent, setCTC] = React.useState(text_content)
  // const [ page, setPage ] = useState(0);

  const snackbar = useContext(SnackbarContext)



  const fetchNextPage = async (page_no) => {

    // console.log("FETCHING TEXT_CONTENT FN")
    let response;
    if(!router.query.id){

      response = await fetch(`${FRONTEND_ROOT_URL}api/get_daily_shares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          type: 'text',
          needed_page: page_no+1
  
        })
      })
    } else {

      response = await fetch(`${FRONTEND_ROOT_URL}api/get_daily_shares`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
  
          type: 'text',
          needed_page: page_no+1,
          specific_id: router.query.id
        })
      })
      

    }

    const { has_more, new_text_content:new_page_text_content } = await response.json();
    if (response.status === 200) {
      if(!has_more){
        // setPage((currPage) => currPage + 1)

        set_page('text', page_no+1, true)

        // set_page('text', page+1, true)
        set_content('text', [...text_content, ...new_page_text_content.map((val, idx) => {return {...val, colorPallete: palleteIterator.next().value.name, isLiked: val.likes?.includes(auth.user_data.username)}})])
        snackbar.open("success", "You've got all of it!")
        // Remove Event Listener.
        if(!page_loaded){

          loaded('text')
        }
        fetchTriggerRef.current.style.display = "none";
        observer.current?.disconnect()
        finish_mode('text')

        return;
      }
      // setPage((currPage) => currPage + 1)
      // set_page('text', page+1)
      if(!page_loaded){

        loaded('text')
      }
      set_page('text', page_no+1, true)

      set_content('text', [...text_content, ...new_page_text_content.map((val, idx) => {return {...val, colorPallete: palleteIterator.next().value.name, isLiked: val.likes?.includes(auth.user_data.username)}})])

      if(isInViewport(fetchTriggerRef.current)){
        // fetchNextPage(page_no+1);
        setDoFetch(true);
        setAgree(curr => curr === null ? true : null)

      }

    } else {

      snackbar.open("error", "Unable to get new posts.")

    }

  }

  useEffect(() => {

    if(isFinished){
      fetchTriggerRef.current.style.display = "none"
    }

  }, [isFinished])

  useEffect(() => {
    // I have no idea what i am doing :D // TAKE IT EASY MAN
    if(doFetch === false || isFinished) return;
    if(!doFetch) return;
    fetchNextPage(page_no) 

    setDoFetch(false);

  }, [agree])

  useEffect(() => {
    if(page_loaded || isFinished) return;
    const options = {
      root: document,
      rootMargin: "0px",
      threshold: 0
    }

    const callbackFn = async (entries) => {
      console.log('PageNo', page_no)
      if(entries[0].isIntersecting){

        setDoFetch(true);
        setAgree(curr => curr === null ? true : null)


      }

    }



    
    observer.current = new IntersectionObserver(callbackFn, options);

    if (fetchTriggerRef.current) {
      observer.current.observe(fetchTriggerRef.current);
    }

    return () => {

      observer.current.disconnect();

    }

  }, [])

  // useEffect(() => {
  //   if(text_content.length === 0 && !page_loaded){

  //     try{
        
  //       fetchNextPage()
  
  //       loaded('text');
      
  //     } catch (e) {

  //       display_error('Unable to get Daily Share(s)');

  //     }

  //   }

  // }, [page])
  return (

    <React.Fragment>

      {
        text_content.length > 0 ? 

        text_content.map((val, idx) => (
          <TextPost key={idx} data={val} />
        )) : <b><br/>Strange!, no share(s) found.</b>

      }

      {/* <CircularProgress style={{ marginTop: '2.5rem'}} size={30}  ref={fetchTriggerRef} /> */}
      <div ref={fetchTriggerRef} style={{width: '100%', height: '40px',display: 'grid', placeItems: 'center', marginTop: '2rem'}}> 
        <SpadeLoader is_loading />
      </div>
    </React.Fragment>

  )

}

function formatTime(seconds){

  let min = Math.floor(seconds/60);
  let sec = Math.floor(seconds%60);

  return `${min}:${sec}`

}

function AudioPost({ data }) {
  
  const { like, unlike, current_audio_id, set_current_audio } = useContext(DailyShareContext);
  const snackbar = useContext(SnackbarContext)
  const [showMoreOptions, setShowMoreOptions] = React.useState(false)
  const audioRef = useRef(null);
  const auth = useContext(authContext);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(0);
  const [shareData, setShareData] = React.useState({open: false, post_id: null})
  // const duration = getBlobDuration
  const {action, handlers} = useLongPress();


  useEffect(() => {

    if(current_audio_id !== data.id){

      // Pause it!
      audioRef.current?.pause()
      setIsPlaying(false)

    }

  }, [current_audio_id])

  const playAudio = () => {

    set_current_audio(data.id)

    audioRef.current?.play();

    setIsPlaying(true)

  }

  const pauseAudio = () => {

    audioRef.current?.pause();

    setIsPlaying(false)

  }

  const onDragStop = (e, val) => {

    audioRef.current.currentTime = val;

  }

  const deletePost = async () => {

    let confirmation = confirm('Are you sure, delete this post Permanently?')

    if(!confirmation){
      return;
    }

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        ds_id: data.id,
        action: 'delete',

      })
    })

    if(response.status === 201){
      snackbar.open("success", "Post removed")
    }else{
      snackbar.open("error", "Please try again later!")
    }
    setShowMoreOptions(false)
    // DELETE FROM CURRENT UI

  }

  const sharePost = (post_id) => {


    if (typeof navigator !== 'undefined'){
        
        if(navigator.share || navigator.canShare){
            navigator.share({
                url: `${FRONTEND_ROOT_URL}explore/daily_share?id=${post_id}&type=audio`,
                title: 'Spade',
                text: 'Share hacks, gain hacks!'
            })
        }else{

            setShareData({open: true, post_id: post_id});

        }

    }else{

        setShareData({open: true, post_id: post_id});
    }
    setShowMoreOptions(false)

}


  const reportPost = async () => {

    let reason = prompt("Please provide why you are reporting this post/entity")
    if(reason === null) return;
    if(!reason){
      snackbar.open("info", "Please provide Valid details")
      return;
    }

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        ds_id: data.id,
        action: 'report',
        reason: reason 

      })
    })

    if(response.status === 201){
      snackbar.open("success", "Thanks for reporting, we'll monitor it!")
    }else{
      snackbar.open("error", "Please try again later")
    }

    setShowMoreOptions(false)


  }


  useEffect(() => {

    if(action === 'click'){
        // openPostModal();
        setShowMoreOptions(true);
    }else if(action === 'longpress') {
        sharePost(data.id); 

    }
    handlers.onMouseUp();handlers.onTouchEnd();
}, [action])

  const updateTrackProgress = (e) => {

    setTrackProgress(audioRef.current?.currentTime)

  }

  useEffect(() => {
    audioRef.current = new Audio(`${BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length-1)}${data.secondary_field}`)
    audioRef.current.addEventListener("timeupdate", updateTrackProgress)

    const getDuration = async () => {

      let sync_duration = await getBlobDuration(`${BACKEND_ROOT_URL.slice(0, BACKEND_ROOT_URL.length-1)}${data.secondary_field}`)

      setDuration(sync_duration)

    }

    getDuration()

    return () => {

      audioRef.current.removeEventListener("change", updateTrackProgress)

    }

  }, [])

  return (

    <div className={styles.audio_post_main} style={{ backgroundColor: get_pallete_variant(data.colorPallete, 'primary') }}>
      <div className={styles.audio_content} style={{ backgroundColor: get_pallete_variant(data.colorPallete, 'secondary') }}>
        
      <Modal
                    open={shareData.open && !navigator.share}
                    onClose={() => {setShareData({open: false, post_id: null})}}
                >
                    
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'max(350px, 30vw)',
                        backgroundColor: '#f4f4f4',
                        color: 'black',
                        borderRadius: '5px',
                        boxShadow: 24,
                        padding: '0px 5px 1rem 5px',
                    }}>
                        <center><h2>Share With</h2></center>
                        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <Tooltip title="Copy URL">
                                <StyledIconButton onClick={() => {navigator.clipboard.writeText(`${FRONTEND_ROOT_URL}explore/daily_share?id=${data.id}&type=audio`);snackbar.open('simple', "Copied to clipboard!")}}>
                                    <ContentCopyOutlined style={{color: 'black'}} />
                                    
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


        <h2 style={{color: 'black'}}>{data?.title}</h2>
        {/* <audio controls>
          <source src="horse.ogg" type="audio/ogg"/>
        </audio> */}
        <br/>
        <div className={styles.audio_info}>
          <p>{formatTime(duration)}</p>
          <Slider  key={`audio-progress-${data.id}`}   max={audioRef.current?.duration} onChange={onDragStop} disableSwap value={trackProgress}  style={{height: '0.1rem'}}
          
          sx={{
            color: `${get_pallete_variant(data.colorPallete, 'primary') +'99'} !important`,
            '& .MuiSlider-track': {
              // border: '1px solid green',
              // height: '0.1rem',
              backgroundColor: '#ACACAC30'
            },
            '& .MuiSlider-thumb': {
              width: 17,
              height: 17,
              backgroundColor: get_pallete_variant(data.colorPallete, 'primary'),
              '&:before': {
                boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible, &.Mui-active': {
                boxShadow: 'none',
              },
            },
          }}
          />
          <IconButton onClick={isPlaying ? pauseAudio : playAudio}>
          {
            !isPlaying?
              <PlayArrow />:
              <Pause />
          }
          </IconButton>

            <div onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} style={{position: 'absolute', right: '0.7rem', top: '0.2rem'}}>
    
            <svg  {...handlers} onClick={() => {setShowMoreOptions(curr => !curr)}}  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="#6BA37E"/>
    
            </svg>
            {
              showMoreOptions && 
            <div style={{position: 'relative'}}>
    
              <div className={styles.post_options_main} style={{boxShadow: `0 0 0 1px ${get_pallete_variant(data.colorPallete, 'primary')}70`, borderRadius: '5px', backgroundColor: '#FEFBF6', padding: '0.7rem 0.4rem'}}>
    
                <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}}  onClick={() => {sharePost(data.id)}}><Share style={{transform: 'scale(0.8)'}} />  Share </button>
                {/* <button onClick={downloadPost}><Download style={{transform: 'scale(0.8)', color: 'black'}} />  Download </button> */}
                {
                  auth.user_data.username === data.author_name &&
                  <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={deletePost} style={{marginTop: '0.5rem'}}><DeleteOutline style={{transform: 'scale(0.8)'}} />  Delete </button>
                }
                <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}}  onClick={reportPost} style={{marginTop: '0.5rem', borderTop: '1px solid #c4c4c470', paddingTop: '0.5rem'}}><Report style={{transform: 'scale(0.8)'}} color="error" />  Report </button>
    
    
              </div>
            </div>
    
            }
            </div>
  
          </div>
        </div>
  
        <div className={styles.audio_actions_and_author_info}>
            
          <div style={{display: 'flex', alignItems: 'center', position: 'absolute', right: '-1.5rem',  fontFamily: 'Roboto', fontSize: '0.9rem', gap: '0.5rem'}}>
            {data.likes.length}
            <div style={{backgroundColor: 'white', lineHeight: '1rem', borderRadius: '8px', border: `1px solid ${get_pallete_variant(data.colorPallete, 'primary')}`}}>
            <IconButton onClick={data.isLiked ? () => {unlike(data.id)} : () => {like(data.id)}} size="small">
              {
                data.isLiked ? 
                <Favorite size={6} color="error" />:
                <FavoriteBorder style={{ color: '#00000090' }} fontSize={'5'} />

              }
            </IconButton>
            {/* <svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.89352 2.35248C3.49201 2.35248 2.35254 3.49359 2.35254 4.90532C2.35254 6.38164 3.2096 7.9168 4.37261 9.33522C5.39402 10.581 6.5947 11.6702 7.50008 12.4778C8.40546 11.6702 9.60614 10.581 10.6276 9.33522C11.7906 7.9168 12.6477 6.38164 12.6477 4.90532C12.6477 3.49359 11.5082 2.35248 10.1067 2.35248C9.27065 2.35248 8.819 2.64323 8.53976 2.95843C8.27883 3.25295 8.14629 3.58566 8.02507 3.88993C8.00397 3.9429 7.98321 3.99501 7.96217 4.04591C7.88488 4.23294 7.70246 4.35494 7.50008 4.35494C7.29771 4.35494 7.11529 4.23295 7.03799 4.04592C7.01695 3.99501 6.99618 3.94289 6.97508 3.8899C6.85386 3.58564 6.72132 3.25294 6.4604 2.95843C6.18115 2.64323 5.72951 2.35248 4.89352 2.35248ZM1.35254 4.90532C1.35254 2.94498 2.93606 1.35248 4.89352 1.35248C6.00846 1.35248 6.7351 1.76049 7.2089 2.2953C7.32068 2.42147 7.41692 2.55382 7.50008 2.68545C7.58324 2.55382 7.67947 2.42147 7.79125 2.2953C8.26506 1.76049 8.9917 1.35248 10.1067 1.35248C12.0641 1.35248 13.6477 2.94498 13.6477 4.90532C13.6477 6.74041 12.6014 8.50508 11.4009 9.96927C10.2637 11.3562 8.922 12.5508 8.00607 13.3664C7.94651 13.4194 7.88875 13.4709 7.83297 13.5206C7.6433 13.6899 7.35686 13.6899 7.16719 13.5206C7.11141 13.4709 7.05365 13.4194 6.99409 13.3664C6.07816 12.5508 4.73647 11.3562 3.59932 9.96927C2.39878 8.50508 1.35254 6.74041 1.35254 4.90532Z" fill="black"/>
            </svg> */}
          </div>

        </div>
          {/* ! DANGER:::: REPLACE WITH NEXT/IMAGE TAG */}
          <Avatar src={data.author_pic} style={{height: '30px', width: '30px', marginLeft: '0.2rem'}}>{data.author_name[0].toUpperCase()}</Avatar>
          <Link href={`/view_profile/${data.author_name}`}><a>{data.author_name}</a></Link>
      </div>

    </div>

  )

}

function TextPost({ data }) {

  const { like, unlike } = useContext(DailyShareContext);
  const auth = useContext(authContext)
  const snackbar = useContext(SnackbarContext)
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showMoreOptions, setShowMoreOptions] = React.useState(false);
  const [shareData, setShareData] = React.useState({open: false, post_id: null})
  const {action, handlers} = useLongPress();


  const deletePost = async () => {

    let confirmation = confirm('Are you sure, delete this post Permanently?')

    if(!confirmation){
      return;
    }

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        ds_id: data.id,
        action: 'delete',

      })
    })

    if(response.status === 201){
      snackbar.open("success", "Post removed")
    }else{
      snackbar.open("error", "Please try again later!")
    }
    setShowMoreOptions(false)

  }

  const sharePost = (post_id) => {


    if (typeof navigator !== 'undefined'){
        
        if(navigator.share || navigator.canShare){
            navigator.share({
                url: `${FRONTEND_ROOT_URL}explore/daily_share?id=${post_id}&type=text`,
                title: 'Spade',
                text: 'Share hacks, gain hacks!'
            })
        }else{

            setShareData({open: true, post_id: post_id});

        }

    }else{

        setShareData({open: true, post_id: post_id});
    }
    setShowMoreOptions(false)


}


  const reportPost = async () => {

    let reason = prompt("Please provide why you are reporting this post/entity")
    if(reason === null) return;
    if(!reason){
      snackbar.open("info", "Please provide Valid details")
      return;
    }

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/daily_share`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({

        ds_id: data.id,
        action: 'report',
        reason: reason 

      })
    })

    if(response.status === 201){
      snackbar.open("success", "Thanks for reporting, we'll monitor it!")
    }else{
      snackbar.open("error", "Please try again later")
    }

    setShowMoreOptions(false)


  }


  useEffect(() => {

    if(action === 'click'){
        // openPostModal();
        setShowMoreOptions(true);
    }else if(action === 'longpress') {
        sharePost(data.id); 

    }
    handlers.onMouseUp();handlers.onTouchEnd();
}, [action])

  return (

    <div className={styles.audio_post_main} style={{ backgroundColor: get_pallete_variant(data.colorPallete, 'primary') }}>
      <div className={styles.audio_content} style={{ backgroundColor: get_pallete_variant(data.colorPallete, 'secondary'), padding: '0' }}>
      <Modal
                    open={shareData.open && !navigator.share}
                    onClose={() => {setShareData({open: false, post_id: null})}}
                >
                    
                    <Box style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 'max(350px, 30vw)',
                        backgroundColor: '#f4f4f4',
                        color: 'black',
                        borderRadius: '5px',
                        boxShadow: 24,
                        padding: '0px 5px 1rem 5px',
                    }}>
                        <center><h2>Share With</h2></center>
                        <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <Tooltip title="Copy URL">
                                <StyledIconButton onClick={() => {navigator.clipboard.writeText(`${FRONTEND_ROOT_URL}explore/daily_share?id=${data.id}&type=text`);snackbar.open('simple', "Copied to clipboard!")}}>
                                    <ContentCopyOutlined style={{color: 'black'}} />
                                    
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
        <h2 style={{padding: '1rem 0 0 1rem', marginBlock: '0', color: '#181818'}}>{data.title}</h2>
        <div onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} style={{position: 'absolute', right: '0.7rem', top: '0.2rem'}}>

        <svg {...handlers} onClick={(e) => { setShowMoreOptions(curr => !curr) }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z" fill="#6BA37E"/>
        </svg>

        {
              showMoreOptions && 
            <div style={{position: 'relative'}}>
    
              <div className={styles.post_options_main} style={{boxShadow: `0 0 0 1px ${get_pallete_variant(data.colorPallete, 'primary')}70`, borderRadius: '5px', backgroundColor: 'white', padding: '0.7rem 0.4rem', zIndex: '1'}}>
    
                <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={() => {sharePost(data.id)}}><Share style={{transform: 'scale(0.8)'}} />  Share </button>
                {/* <button onClick={downloadPost}><Download style={{transform: 'scale(0.8)', color: 'black'}} />  Download </button> */}
                {
                  auth.user_data.username === data.author_name &&
                  <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={deletePost} style={{marginTop: '0.5rem'}}><DeleteOutline style={{transform: 'scale(0.8)'}} />  Delete </button>
                }
                <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={reportPost} style={{marginTop: '0.5rem', borderTop: '1px solid #c4c4c470', paddingTop: '0.5rem'}}><Report style={{transform: 'scale(0.8)'}} color="error" />  Report </button>
    
    
              </div>
            </div>
    
            }
        
        </div>
        {/* <h2 style={{padding: '1rem', marginBlock: '0'}}>{data.title}</h2> */}
        {/* <audio controls>
          <source src="horse.ogg" type="audio/ogg"/>
        </audio> */}
        <br/>
        <div onClick={()=> {setIsExpanded(curr => !curr)}} className={styles.text_info} style={{backgroundColor: get_pallete_variant(data.colorPallete, 'primary') + '70', position: 'relative'}}>



          {isExpanded?
            // data.descr
            <p style={{ color: '#181818' }}>{data.secondary_field}</p>
            // <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus, vitae modi. Quis earum laborum, in sed aut ducimus eos, nostrum porro sequi molestias animi corporis eum quos iusto consequatur dolorem totam amet accusamus sapiente facilis tenetur dignissimos inventore! Error quae ea cumque. Expedita voluptatibus, eum optio sit corporis voluptate fugit, possimus unde amet culpa assumenda, perspiciatis neque omnis id libero.</p>
            :
            <p style={{ color: '#18181899' }}>{data.secondary_field?.substr(0, 180) + (data.secondary_field?.length > 180 ? '...' : '')}</p>
            // data.descr.substr(0, 30)
          }

        </div>
      </div>

      <div className={styles.audio_actions_and_author_info}>
          
        <div style={{display: 'flex', alignItems: 'center', position: 'absolute', right: '-1.5rem',  fontFamily: 'Roboto', fontSize: '0.9rem', gap: '0.5rem'}}>
          {data.likes.length}
          <div style={{backgroundColor: 'white', lineHeight: '1rem', borderRadius: '8px', border: `1px solid ${get_pallete_variant(data.colorPallete, 'primary')}`}}>

          <IconButton onClick={data.isLiked ? () => {unlike(data.id)} : () => {like(data.id)}} size="small">
              {
                data.isLiked ? 
                <Favorite size={6} color="error" />:
                <FavoriteBorder style={{ color: '#00000090' }} fontSize={'5'} />

              }
            </IconButton>
            {/* <svg  width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.89352 2.35248C3.49201 2.35248 2.35254 3.49359 2.35254 4.90532C2.35254 6.38164 3.2096 7.9168 4.37261 9.33522C5.39402 10.581 6.5947 11.6702 7.50008 12.4778C8.40546 11.6702 9.60614 10.581 10.6276 9.33522C11.7906 7.9168 12.6477 6.38164 12.6477 4.90532C12.6477 3.49359 11.5082 2.35248 10.1067 2.35248C9.27065 2.35248 8.819 2.64323 8.53976 2.95843C8.27883 3.25295 8.14629 3.58566 8.02507 3.88993C8.00397 3.9429 7.98321 3.99501 7.96217 4.04591C7.88488 4.23294 7.70246 4.35494 7.50008 4.35494C7.29771 4.35494 7.11529 4.23295 7.03799 4.04592C7.01695 3.99501 6.99618 3.94289 6.97508 3.8899C6.85386 3.58564 6.72132 3.25294 6.4604 2.95843C6.18115 2.64323 5.72951 2.35248 4.89352 2.35248ZM1.35254 4.90532C1.35254 2.94498 2.93606 1.35248 4.89352 1.35248C6.00846 1.35248 6.7351 1.76049 7.2089 2.2953C7.32068 2.42147 7.41692 2.55382 7.50008 2.68545C7.58324 2.55382 7.67947 2.42147 7.79125 2.2953C8.26506 1.76049 8.9917 1.35248 10.1067 1.35248C12.0641 1.35248 13.6477 2.94498 13.6477 4.90532C13.6477 6.74041 12.6014 8.50508 11.4009 9.96927C10.2637 11.3562 8.922 12.5508 8.00607 13.3664C7.94651 13.4194 7.88875 13.4709 7.83297 13.5206C7.6433 13.6899 7.35686 13.6899 7.16719 13.5206C7.11141 13.4709 7.05365 13.4194 6.99409 13.3664C6.07816 12.5508 4.73647 11.3562 3.59932 9.96927C2.39878 8.50508 1.35254 6.74041 1.35254 4.90532Z" fill="black"/>
            </svg> */}
          </div>

        </div>
          {/* ! DANGER:::: REPLACE WITH NEXT/IMAGE TAG */}
              <Avatar src={data.author_pic} style={{height: '30px', width: '30px', marginLeft: '0.2rem'}}>{data.author_name[0].toUpperCase()}</Avatar>
          {/* <img style={{ borderRadius: '100px' }} src={data.author_pic} width="30" height="30" /> */}
          <a>{data.author_name}</a>
      </div>

    </div>

  )

}


export default DailyShare