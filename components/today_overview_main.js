import React, { useContext, useEffect } from 'react'
import {Divider,  SwipeableDrawer, TextField} from '@mui/material'
import { Box } from '@mui/system'
import styled  from '@emotion/styled'
import styles from './today_overview_main.module.css'
import Lottie from 'lottie-web'
import SnackbarContext from "./basic/contexts/snackbar_context"
import getBlobDuration from 'get-blob-duration'
import { FRONTEND_ROOT_URL } from '../config'
// import MediaRecorder from 'opus-media-recorder';
// import EncoderWorker from 'opus-media-recorder/encoderWorker.js';
// import OggOpusWasm from 'opus-media-recorder/OggOpusEncoder.wasm';
// import WebMOpusWasm from 'opus-media-recorder/WebMOpusEncoder.wasm';
 
// Non-standard options



const ResetButton = styled.button`

    display: flex;
    align-items: center;
    justify-content: space-around;
    background-color: #F05454;
    border-radius: 100px;
    gap: 0.6rem;
    padding: 0.5rem 0.9rem;
    border: none;
    outline: none;
    margin-bottom: 1rem;
    margin-right: 0;
    margin-left: auto;

`

function VoiceShareMainClone({title,reverseToStartState, toggleTitleMinLengthNotSatisfied}) {

    const snackbar = useContext(SnackbarContext);
    const recorderRef = React.useRef(null);
    const submitRef = React.useRef(null);

    const [recorderConfigs, setRecordingConfigs] = React.useState({ paused: false, prevRecordingUrl: null, duration: 0, audioChunks: [] });

    const [recreateChange, recreateTrigger] = React.useState(false);

    const ref = React.useRef(null);
    const ref2 = React.useRef(null);

    
    async function getUserMediaStreamPointer(){

        let stream

        try{

            stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(err => {snackbar.open("info", "Please Allow audio permission to record!");reverseToStartState();recreateTrigger(curr => !curr);});
        
    
        } catch (e) {
    
            snackbaraInstance.open("error", "Please allow audio permission to record!")
            return;
        }

        return stream;

    }

    const handlePort = (ev) => {
        console.log(typeof ev.data)
        // let blob = new Blob(recordingFile, { type: "audio/ogg" });
        // console.log("HandlePort Trigerred", blob)
        // setAudioChunks(ev.data);
        try{

                let generatedBufferAudioUrl = URL.createObjectURL(ev.data);

                
                
                (async () => {
                    
                    const duration = await getBlobDuration(generatedBufferAudioUrl)
                    // setRecordingConfigs(curr => {return {...recorderConfigs, audioChunks:  ev.data}})
                    setRecordingConfigs(curr => {return {...recorderConfigs, duration: duration,prevRecordingUrl: generatedBufferAudioUrl, audioChunks: ev.data}})
                })()
                
        } catch (e) {
            console.error(e)
            snackbar.open("error", "Please record audio first,")

        }



    }

    React.useEffect(() => {
        const animation3 = Lottie.loadAnimation({
            name: "play_pause",
          container: ref.current,
          renderer: 'svg',
          loop: false,
          autoplay: false,
         
          // path to your animation file, place it inside public folder
          path: '/play_pause.json',
        });

        const animation2 = Lottie.loadAnimation({
            name: "main_bg",
            container: ref2.current,
            renderer: 'svg',
            loop: true,
            autoplay: false, 
            // path to your animation file, place it inside public folder
          path: '/record_bg_1.json',
      });
        

 
        // animation1.goToAndStop(5.5, true, "submit")

        // console.log(animation1)

        return () => {animation3.destroy(), animation2.destroy()};
    }, []);


    /*
    
    Tasks:
    1. audio format => tendto audio/ogg
    2. if permission denined to access audio device, go to previous state
    
    */


    useEffect(() => {

        if(!recorderConfigs.prevRecordingUrl) return;

        const animation1= Lottie.loadAnimation({
                name: "submit",
                container: submitRef.current,
                renderer: 'svg',
                loop: false,
                autoplay: false, 
                // path to your animation file, place it inside public folder
            path: '/recording_submit.json',
        });

        // const submit_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="submit" )[0];   
        // console.log("called")
        // submit_handler.playSegments([0, 5.6], true)
        Lottie.goToAndStop(5, true, "submit")

        return () => {
            animation1.destroy()
        }

    }, [recorderConfigs.prevRecordingUrl])


    const handleSubmit = async (e) => {

        if(title.length < 9){ toggleTitleMinLengthNotSatisfied(); return; }

        const submit_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="submit" )[0];   
        submit_handler.playSegments([5.5, 55], true)



        const audio_type = MediaRecorder.isTypeSupported('audio/ogg') ? 'audio/ogg' : 'audio/webm';

        let blob = new Blob([recorderConfigs.audioChunks], { type: audio_type });

        let file = new File([blob], 'hows_today_recording.' + audio_type.split('/')[1]);

        let form = new FormData();
        form.append("title", title);
        form.append("type", "audio");
        form.append("audio", file);

        try{

            const response = await fetch(`${FRONTEND_ROOT_URL}api/create/daily_share`, {
                method: 'POST',
                body: form
            })
    
            const { created_daily_share_id: redirect_id } = await response.json();

            if(response.status === 201) {
    
                submit_handler.playSegments([55, 96], true) // Animation Completed
                window.location.href = FRONTEND_ROOT_URL + 'explore/daily_share?type=audio&id=' + String(redirect_id)
    
            }else{
    
                submit_handler.playSegments([55, 5.5], true) // Animation Completed
                snackbar.open("error", "Currenly, unable to add audio")
    
            }
        } catch (e) {

            submit_handler.playSegments([55, 5.5], true) // Animation Completed
            snackbar.open("error", "oops, Something went wrong")


        }


        // const response = await fetch()

        // submit_handler.goToAndPlay(0, true);
        // submit_handler.play()
    }


    React.useEffect(() => {
        
        async function getRecorder(){
            // eval(OpusMediaRecorder)
            // window.MediaRecorder = OpusMediaRecorder;
            // console.log("Recorder:", OpusMediaRecorder)

            let options = { mimeType: MediaRecorder.isTypeSupported('audio/ogg')?'audio/ogg':'audio/webm' };

            try{

                const mediaRecorder = new MediaRecorder(await getUserMediaStreamPointer(), options);
                mediaRecorder.start();
                mediaRecorder.pause(); // Just instant check it starts or not
                mediaRecorder.addEventListener("dataavailable", handlePort)
                // setRecorderInstance(mediaRecorder)
                recorderRef.current = mediaRecorder
                console.log("Done")
            } catch (e) {
                console.log(e)
                snackbar.open("info", "Make sure, audio permission is enabled for recording!")
            }


        }

        getRecorder()
    }, [recreateChange])
  
    const play = () => {

        console.log("Play")

        recorderRef.current.resume()
        
        setRecordingConfigs({...setRecordingConfigs, paused: false})

        const play_pause_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="play_pause" )[0];
        const main_bg_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="main_bg" )[0];   


        play_pause_handler.setDirection(1)
        play_pause_handler.play()
        main_bg_handler.play()
        
        
    }
    
    const pause = () => {
        
        console.log("Pause")

        recorderRef.current.pause()
        
        setRecordingConfigs({...setRecordingConfigs, paused: true})
        
        const play_pause_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="play_pause" )[0];
        const main_bg_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="main_bg" )[0];   
        
        play_pause_handler.setDirection(-1)
        play_pause_handler.play()
        main_bg_handler.pause()


    }

    const stop = (e, seamless=false) => {

        if(seamless){
            console.warn("Recreating Recorder Info.")
            recreateTrigger(curr => !curr);
            setRecordingConfigs({...recorderConfigs, prevRecordingUrl: null})
        
        }else{
        
            recorderRef.current.stop();
            try{

                recorderRef.current.start()
                recorderRef.current.pause();
            } catch (e) {

                snackbar.open("error", "Looks like audio permission disabled")

            }
            
            const play_pause_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="play_pause" )[0];
            const main_bg_handler = Lottie.getRegisteredAnimations().filter((animation, idx) => animation.name==="main_bg" )[0];   
    
            play_pause_handler.setDirection(-1)
            play_pause_handler.play()
            main_bg_handler.pause()

        }

    }


    return (
        <div style={{width: 'clamp(200px, 100%, 400px)', margin: '0 auto'}}>

            <ResetButton onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={ (e) => {stop(e, true);reverseToStartState()} }>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.04237 6.26475C1.04237 9.30898 3.24957 11.3827 5.72809 11.8119C6.01171 11.861 6.20182 12.1307 6.15271 12.4144C6.1036 12.698 5.83387 12.8881 5.55025 12.839C2.63858 12.3348 0 9.88068 0 6.26475C-9.99999e-07 4.72807 0.69912 3.52043 1.51555 2.60175C2.1004 1.94366 2.7695 1.40933 3.30762 1H1.67121C1.39507 1 1.17121 0.77614 1.17121 0.5C1.17121 0.22386 1.39507 0 1.67121 0H4.67121C4.94735 0 5.17121 0.22386 5.17121 0.5V3.5C5.17121 3.77614 4.94735 4 4.67121 4C4.39507 4 4.17121 3.77614 4.17121 3.5V1.65443L4.1697 1.65557L4.16961 1.65564L4.1696 1.65565H4.16959C3.59812 2.08666 2.89975 2.61336 2.2947 3.29418C1.58018 4.09819 1.04237 5.06952 1.04237 6.26475ZM12.1501 6.67119C12.1501 3.65913 9.98966 1.59758 7.543 1.13827C7.26009 1.08516 7.07381 0.81277 7.12692 0.52986C7.18003 0.24696 7.45242 0.06068 7.73532 0.11379C10.6096 0.65339 13.1924 3.09403 13.1924 6.67119C13.1924 8.20786 12.4933 9.41548 11.6769 10.3342C11.092 10.9923 10.4229 11.5266 9.88476 11.936H11.5213C11.7974 11.936 12.0213 12.1598 12.0213 12.436C12.0213 12.7121 11.7974 12.936 11.5213 12.936H8.52121C8.24507 12.936 8.02121 12.7121 8.02121 12.436V9.43598C8.02121 9.15978 8.24507 8.93594 8.52121 8.93594C8.79735 8.93594 9.02121 9.15978 9.02121 9.43598V11.2815L9.02278 11.2803C9.59426 10.8493 10.2927 10.3226 10.8977 9.64178C11.6123 8.83774 12.1501 7.86642 12.1501 6.67119Z" fill="white"/>
                </svg>
                <p style={{marginBlock: '0', color: 'white', fontFamily: 'Poppins'}}>Reset</p>

            </ResetButton>

            <div className={styles.in_between_container}>
                <div onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} className={styles.in_between_iconic_item} onClick={ (e) => {stop(e, true)} }>
                    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 2.0625H1M10.6429 1H6.35714M2.07143 6.3125V16.9375C2.07143 17.6458 2.42857 18 3.14286 18C3.85714 18 7.42857 18 13.8571 18C14.5714 18 14.9286 17.6458 14.9286 16.9375C14.9286 16.2292 14.9286 12.6875 14.9286 6.3125" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="square"/>
                    </svg>

                </div>
                    <div 
                        ref={ref2}
                        style={{height: "4rem", transform: 'scale(1.3)'}}
                        // options={defaultOptions}
                    />            
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} onClick={ stop } className={styles.in_between_iconic_item} style={{backgroundColor: '#505BDA', marginRight: '0.8rem'}}>
                    
                        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6.62364L5.6875 11.31L16 1" stroke="white" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                    {/* <div className={styles.in_between_iconic_item} style={{backgroundColor: 'white'}}> */}
                        <div 
                         onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}}
                            onClick={ recorderConfigs.paused ? play : pause }
                            ref={ref}
                            style={{height: "4rem"}}
                            // options={defaultOptions}
                        />
                        {/* <svg style={{fill: 'black'}} width="15" height="15" viewBox="0 0 15 15" fill="#000" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="#000" fillRule="evenodd" clipRule="evenodd"></path></svg> */}
                    {/* </div> */}
                </div>
            </div>
            {
            recorderConfigs.prevRecordingUrl &&
            <div onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <p onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} style={{ fontWeight: 'bold', color: 'grey' }} onClick={() => {new Audio(recorderConfigs.prevRecordingUrl).play()}}>{ Number.parseInt(recorderConfigs.duration/60) }:{Number.parseInt(recorderConfigs.duration - 60*Number.parseInt(recorderConfigs.duration/60))} | Play</p>
                <div ref={submitRef} onClick={handleSubmit} style={{ width: '60px', transform: 'scale(2)', marginRight: '1.5rem' }} />
            </div>
            }

        </div>


    )

}

function VoiceShareStartClone({title, toggleTitleMinLengthNotSatisfied}) {

    const [recordingSessionStarted, setRecordingSessionStarted] = React.useState(false)
    

    return (
        recordingSessionStarted?
            <VoiceShareMainClone reverseToStartState={() => {setRecordingSessionStarted(false)}} title={title} toggleTitleMinLengthNotSatisfied={toggleTitleMinLengthNotSatisfied} />
        :
        <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}} style={{margin: '0 auto'}} className={styles.voice_share_start_button} onClick={ () => {setRecordingSessionStarted(true)}}>
            <ul className={styles.circles}>
                {/* Lets add animations */}
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
            <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11.0833V26.9167" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M23.75 15.8333V22.1667" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M28.5 12.6667V25.3333" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M33.25 20.5833V17.4167" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M14.25 6.33334V31.6667" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M9.5 14.25V23.75" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
                <path d="M4.75 20.5833V17.4167" stroke="#F0D78C" strokeWidth="2" strokeLinecap="square"/>
            </svg>

            <h2 style={{marginBlock: '0', color: 'white', fontFamily: 'Poppins', fontWeight: '600', fontSize: '1.35rem'}}>Share By Voice</h2>

        </button>
    )

}

function TodayOverviewMain({opened,closeModal}) {

    const [titleConstraints, setTitleConstraints] = React.useState({ value: '', error: false, helperText: ''})

    const [inTextValue, setInTextValue] = React.useState('');

    const snackbar = useContext(SnackbarContext);

    const handleMinLengthErr = () => {

        setTitleConstraints({...titleConstraints, error: true, helperText: 'Title must be at-least 8 characters long!'})

    }
    const submitInText = async () => {

        if(titleConstraints.value < 9){
            handleMinLengthErr();
            return;
        }
        
        let form = new FormData();
        form.append("title", titleConstraints.value);
        form.append("content_type", "text");
        form.append("text", inTextValue);

        try{
            // Create this URL (Frontend)/Backend
            const response = await fetch(`${FRONTEND_ROOT_URL}api/create/daily_share`, {
                method: 'POST',
                body: form
            })

            const { created_daily_share_id: redirect_id } = await response.json();


            if(response.status === 201){

                window.location.href = FRONTEND_ROOT_URL + 'explore/daily_share?type=text&id=' + String(redirect_id)
            }else{
                snackbar.open("error", "Currenly, unable to add text post")

            }

        } catch (e) {

            snackbar.open("error", "oops, Something went wrong")


        }

    }

  return (
    <SwipeableDrawer
    PaperProps={{ square: false , style: {width: '100vw', padding: '0.7rem 1.3rem', maxWidth: '500px', marginRight: '0', marginLeft: 'auto'}}}
    
    anchor={"bottom"}
    open={opened}
    onClose={closeModal}
    >
    <Box style={{maxWidth: '500px'}}>
    <h1 style={{fontFamily: 'Poppins', fontSize: '1.7rem', fontWeight: '800', marginBlockEnd: '0'}}>Share Your Today,</h1>

    <p style={{fontSize: '0.9rem', color: '#7B7B7B90', fontWeight: '300', fontFamily: 'Poppins'}}>Let others connect to your Today. Some hacks, you wanna speak about,</p>
    
    <TextField value={titleConstraints.value} onChange={(e) => {setTitleConstraints({...titleConstraints, value: e.target.value, error: false, helperText: ''})}} error={titleConstraints.error} helperText={titleConstraints.helperText} fullWidth label="Title" variant="filled" inputProps={{ maxLength: '50' }}  />
    <br/>

    <br/>

    <br/>

    <VoiceShareStartClone toggleTitleMinLengthNotSatisfied={handleMinLengthErr} title={titleConstraints.value} />
    <br/>
    <Divider>or</Divider>
    <p style={{color: '#c4c4c4', fontSize: '0.85rem', marginBlockEnd:"0"}}>Share In-Text</p>
    <textarea style={{width: '100%', padding: '0.5rem', fontFamily: 'Poppins'}} rows="10" value={inTextValue} onChange={(e) => {setInTextValue(e.target.value)}}>

    </textarea>
    <button onMouseEnter={(e) => {e.target.style.cursor = 'pointer'}}  disabled={inTextValue.length < 15} onClick={submitInText} style={{backgroundColor: inTextValue.length < 15 ? 'grey' : '#505BDA', color: 'white', border: 'none', padding: '0.4rem 0.8rem',borderRadius: '8px', boxShadow: '0px 8px 10px 0px rgba(0, 0, 0, 0.25)'}}>Share</button>
    </Box>
    </SwipeableDrawer>
  )
}

export default TodayOverviewMain