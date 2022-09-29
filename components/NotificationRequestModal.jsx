import { Modal, Button } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useRef, useState } from 'react'
import Lottie from 'lottie-web'
import {LoadingButton} from '@mui/lab'
import { FRONTEND_ROOT_URL } from "../config/index"

// Web-Push
// Public base64 to Uint
function urlBase64ToUint8Array(base64String) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function Body({ notification_success }) {

  const subscriptionDoneAnimationRef = useRef();

  useEffect(() => {

    const notificationAnimation = Lottie.loadAnimation({
      name: "notification_completion",
    container: subscriptionDoneAnimationRef.current,
    renderer: 'svg',
    loop: false,
    autoplay: true,
   
    // path to your animation file, place it inside public folder
    path: '/notification_complete.json',
  });

  return () => {

    notificationAnimation.destroy();

  }

  }, [])


  return (

    notification_success ? <div ref={subscriptionDoneAnimationRef} style={{ width: '150px', height: '150px' }}></div> :
    <>
    <div style={{color: 'black', padding: '0.5rem 1.2rem', fontFamily: 'Poppins'}}> 
    <h4>We’ll notify you only on when you’re on posted content, This includes</h4>

    <ul style={{fontWeight: '300', fontSize: '0.95rem'}}>
      <li>mention in post</li>
      <li>mention in comment/discussion</li>
      <li>community activity (JOIN/LEAVE)</li>
      <li>general interaction detected involving your account</li>
    </ul>
    <br/>
    </div>
    <div style={{width: '100%', borderRadius: '8px', color: 'black', fontFamily: 'Poppins', backgroundColor: '#FFD24C50', padding: '0.7rem 1rem'}}>
      <b style={{color: '#A48119'}}>Note: </b><span style={{fontSize: '0.9rem'}}>This app need permission in order to notify you on such events.</span>
    </div>
    </>

  )

}

function Header() {

  const notificationAnimationRef = useRef();

  useEffect(() => {

    const notificationAnimation = Lottie.loadAnimation({
      name: "notification",
    container: notificationAnimationRef.current,
    renderer: 'svg',
    loop: true,
    autoplay: true,
   
    // path to your animation file, place it inside public folder
    path: '/notification_request.json',
  });

  return () => {

    notificationAnimation.destroy();

  }

  }, [])

  return (

    <div style={{ borderRadius: '10px 10px 0 0', backgroundColor: '#3B44F6', width: '100%', fontFamily: 'Poppins', position: 'relative', marginBottom: '2rem'}}>
      <h2 style={{marginBlock: '0', padding: '1.2rem 0', color: 'white', fontSize: '1.3rem', fontWeight: '700', width: '85%', marginRight: '0', marginLeft: 'auto', textAlign: 'center'}}>Lemme Notify!</h2>
      <div ref={notificationAnimationRef} style={{position: 'absolute', left: '1.5rem', top: '2rem', borderRadius: '15px', width: '60px', height: '60px', backgroundColor: 'white',filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))'}}>

      </div>
    </div>

  )

}

function NotificationRequestModal() {

  const [open, setOpen] = useState(true);
  const [currentState, setCurrentState] = useState('disable') // disable | granted | pending

  const handleNotifyAction = async () => {

    Notification.requestPermission(result => { 
      if (result === 'granted') { 

        // Need Spade 96x96 + Badge Logo

        const displayConfirmNotification = () => { 
          if ('serviceWorker' in navigator) { 
             const options = {
                   body: 'You successfully subscribed to our Notification service!',
                   icon: 'icons/icon-192x192.png',
                   image: 'icons/icon-192x192.png',
                   dir: 'ltr',
                   lang: 'en-US',
                   badge: 'icons/icon-192x192.png',
                   tag: 'confirm-notification',
                   actions: [ 
                      {
                           action: 'confirm',
                           title: 'Okay',
                           icon: 'icons/icon-192x192.png' 
                       }, 
                       {
                           action: 'cancel',
                           title: 'Cancel',
                           icon: 'icons/icon-192x192.png' 
                         
                       } 
                   ] 
            }; 
            navigator.serviceWorker.ready 
              .then(sw => sw.showNotification('Successfully subscribed!', options));
          } 
     }; 

        // Do Those stuff with servise worker
        const configurePushSubscription = () => {
          if ('serviceWorker' in navigator && "PushManager" in window) {
              let serviceWorkerRegistration;
               // Service worker registratie (step 4)
              navigator.serviceWorker.ready
                  .then(registration => {
                      serviceWorkerRegistration = registration;
                      return registration.pushManager.getSubscription();
                  })
                  .then(subscription => {
                      if (subscription === null) {
                        console.log("Debug: Notification Key::", process.env.NEXT_PUBLIC_NOTIFICATION_KEY)
                          // Create a new Push Subscription (step 5 and 6)
                          return serviceWorkerRegistration.pushManager.subscribe({
                              userVisibleOnly: true,
                              applicationServerKey: urlBase64ToUint8Array(
                                   process.env.NEXT_PUBLIC_NOTIFICATION_KEY
                              )
                          });
                      }
                  })
                   // Verzenden Push Subscription naar de server (step 7)
                  .then(pushSubscription => {
                      return fetch(`${FRONTEND_ROOT_URL}api/subscribe`, {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'
                          },
                          body: JSON.stringify(pushSubscription)
                      });
                  })
                  .then(response => {
                      if (response.ok) {
                          displayConfirmNotification();
                      }
                  })
                  .catch(error => console.log(error));
          }
       };

       configurePushSubscription();


      } else if(result === 'denied'){
        setCurrentState('denied')
      }
    
    })


  }

  return (
    // Header ( STATIC )
    // Body ( DYNAMIC )
    // FOOTER ( STATIC )

    <Modal
      open={open}
      onClose={() => { setOpen(false) }}
      style={{border: 'none', display: 'grid', placeItems: 'center'}}

    >

      <Box sx={{backgroundColor: '#f5f5f5', borderRadius: '10px', width: 'clamp(300px, 35vh, 600px)', margin: '0'}}>

        <Header/>

        <Body notification_success={currentState === 'granted'} />

        <br/>

        { (currentState === 'disable' || currentState === 'pending') && <div style={{ display: 'flex', backgroundColor: '#3B44F6', padding: '0.8rem', borderRadius: '0 0 10px 10px',alignItems: 'center', justifyContent: 'space-between' }}>

          <Button onClick={() => {setOpen(false)}} style={{ fontFamily: 'Poppins' }} sx={{color: 'white', letterSpacing: '1px', textTransform: 'initial'}}>
            Discard
          </Button>

          <LoadingButton onClick={handleNotifyAction} loading={currentState === 'pending'} color="success" variant="contained" onMouseEnter={(e) => {e.target.style.backgroundColor= 'white'}} style={{color: '#3B44F6'}} sx={{ backgroundColor: 'white', borderRadius: '10px', padding: '0.8rem 1.8rem', color: '#3B44F6', fontFamily: 'Poppins', fontWeight: 'bold' }}>
            ok, notify me
          </LoadingButton>

        </div>}

      </Box>

    </Modal>

  )
}

export default NotificationRequestModal