
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache';
import NextNProgress from "nextjs-progressbar";
import { motion } from 'framer-motion';
import "../styles/globals.css";
import Header from "../components/basic/Header"
import Footer from "../components/basic/Footer"
import theme from '../styles/theme';
import SnackbarContext from '../components/basic/contexts/snackbar_context';
import { Alert, Button, Snackbar } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import ColorModeContext from '../components/basic/contexts/color_mode_context';
import authContext from '../components/basic/contexts/layout_auth_context';

// import NotificationRequestModal from '../components/NotificationRequestModal';
// Integrating Authentication For Next.js APK
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const darkTheme = {
  palette: {
    mode: 'dark',
    background: {
      default: '#071D2D'
    },
    text: {
      primary: '#ECECEC',
      secondary: '#0096FF'
    }
    // spade: {
    //   default: '#554994'
    // }
  }

}
function getCookie(name) { var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));     return match ? match[1] : null; }

export default function MyApp(props) {

  const [mode, setMode] = useState('light');
  // const notificationModalRef = useRef(null);
  // const [notificationModalLoaded, setNotificationModalLoaded] = useState(false);
  // const NotificationModal = notificationModalRef.current;
  // console.log(NotificationModal)
  // const [user, setUser] = React.useState({is_authenticated: isAuthenticated});// Check authentication
  // const [isOnMobile, setIsOnMobile] = React.useState(false);

  const [drawer, setDrawer] = useState({ open_drawer: false, drawer_title: "Let&apos;s Connect !" })
  const [auth, setAuth] = useState({is_authenticated: false, is_on_mobile: true ,user_info: { username: null, profile_pic: null, first_name: null, last_name: null }});
  const [has_at, setHasAt] = useState(false);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem('spade-core-color-theme', mode === 'light' ? 'dark' : 'light');

        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const currTheme = useMemo(
    () =>
      createTheme(mode === 'dark' ? darkTheme : theme),
    [mode],
  );


  const { Component, emotionCache = clientSideEmotionCache, pageProps: { session, ...pageProps } } = props;

  const [snackbarData, setSnackbarData] = useState({open:false, severity:'', message:'',includes_callback: false, callback_fn: () => {}, action_button_title:null})

  const close = () => {

    setSnackbarData({...snackbarData, open: false, includes_callback: false})

  }

  const open = (severity, message, includes_callback = false, callback_fn, action_button_title='UNDO') => {

    setSnackbarData({open: true, severity: severity, message: message, includes_callback: includes_callback, callback_fn: callback_fn, action_button_title: action_button_title})

  } 

  const undo_action = (callback_fn, action_button_title = 'UNDO') => {
    // setSnackbarData({...snackbarData, includes_callback: true})    
    return (
      <>
        <Button onClick={callback_fn}>{action_button_title}</Button>
      </>
    )
  }

  const authenticate = () => {
    console.log("Authenticated")

    setDrawer({ open_drawer: false })
    console.log("Authenticated")

    setAuth(curr => ({...curr,is_authenticated: true}));

    console.log("Authenticated")
    console.log("Authenticated_ZYZYZYYZ")
  }

  const de_authenticate = () => {

    setDrawer({ open_drawer: false })
    setAuth(curr => ({...curr,is_authenticated: false}));

  }

  const set_open_drawer = (value, title=null) => {

    if (value) {

      setDrawer({ open_drawer: value, drawer_title: title ??  "Let's Connect !" })
    } else {
      
      setDrawer({ open_drawer: value })

    }



  }

  const set_user_data = (username_, profile_pic_, first_name_, last_name_) => {

    // console.log("Called", username_, profile_pic_, first_name_, last_name_)
    // setUser({ is_authenticated: user.is_authenticated, user_data: { username: username_, profile_pic: profile_pic_, first_name: first_name_, last_name: last_name_ }});
    setAuth(curr => ({ ...curr, user_info: { username: username_, profile_pic: profile_pic_, first_name: first_name_, last_name: last_name_ }}));
  }


  useEffect(() => {
    console.info(".is_authenticated Changed!!, ", auth.is_authenticated);
  }, [auth.is_authenticated])  

//? @is_on_mobile handler useEffect
  useEffect(() => {

    if(typeof window !== 'undefined'){

      function handleResize() {
        if(window.innerWidth < 1200){

          setAuth(curr => ({...curr, is_on_mobile: true}));

        }else{

          setAuth(curr => ({...curr, is_on_mobile: false}));
        }
      }

      handleResize();

      window.addEventListener('resize', handleResize);
      // if (isAuthenticated && userInfo?.authentication_error){
      //   // alert("Opening")
      //   snackbar.open('simple', "Complete Your profile, Get truely authorized!", true, () => {window.location.href = `${FRONTEND_ROOT_URL}social_account/edit`},"Let's Go")

      // }
      return () => window.removeEventListener('resize', handleResize);
    }



    }, [])

//? @themeMode handler useEffect
    useEffect(() => {
      
    if(typeof localStorage !== undefined){
      
      switch(localStorage.getItem('spade-core-color-theme')){
        
        case null:
          // Not defined yet
          localStorage.setItem('spade-core-color-theme', 'light');
          break;
          
        case 'light':
          setMode('light');
          break;
          
        case 'dark':
          setMode('dark');
          break;
            
        default:
          console.info("Invalid Value for color-theme in LocalStorage, setting default to light")
          localStorage.setItem('spade-core-color-theme', 'light');
          break;
          
        }
        
      }

      
      
  //? User can manually subscribe to notification service in settings
    // if(navigator.standalone || window.matchMedia('(display-mode: standalone)').matches){
    //   let first_load = localStorage.getItem('first_load')
      
    //   if(first_load === null || true){
    //     if(Notification.permission === 'denied' || Notification.permission === 'default'){

    //       notificationModalRef.current = require('../components/NotificationRequestModal').default
    //       setNotificationModalLoaded(true)


    //     }

    //     localStorage.setItem('first_load', true)

    //   }

    // }

  }, [])


  useEffect(() => {

    if(typeof window !== 'undefined'){

      let has_at = getCookie('has_at')

      if(has_at === "true"){

        setHasAt(true);

      }

    }


  }, [])

  return (
    <CacheProvider value={emotionCache}>
        <NextNProgress height={4} options={{showSpinner: false}} />   
      <Head>
        <title>Spade</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={currTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <motion.div initial="pageInitial" animate="pageAnimate" variants={{
          pageInitial: {
            opacity: 0,
            scale: 1.05
          },
         pageAnimate: {
            opacity: 1,
            scale: 1
          },
        }}>
          {/* {
            notificationModalLoaded &&
            // <h1>Here</h1>
            <NotificationModal/>
          } */}
          
          <SnackbarContext.Provider value={{...snackbarData, open: open, close: close, undo_action: undo_action}}>
            <Snackbar autoHideDuration={5000} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} message={snackbarData.severity === "simple" ? snackbarData.message : null} open={snackbarData.open} onClose={close} action={snackbarData.includes_callback ? undo_action(snackbarData.callback_fn, snackbarData.action_button_title) : null} >
              {snackbarData.severity !== 'simple' &&
                <Alert onClose={close} severity={snackbarData.severity}>
                  {snackbarData.message}
                </Alert>
              }
            </Snackbar>
          <authContext.Provider value={{is_authenticated: auth.is_authenticated, is_on_mobile: auth.is_on_mobile,drawer_title: drawer.drawer_title,open_drawer: drawer.open_drawer, set_open_drawer: set_open_drawer,authenticate: authenticate, de_authenticate: de_authenticate, user_data: auth.user_info, set_user_data: set_user_data}}>


            <Header hasAtoken={has_at} isMobile={auth.is_on_mobile} /> {/* __useEffect() => {if(hasAtoken) load_user_profile().tillThen(show_skeleton)} */}
            <Component {...pageProps} />
            <Footer/>


          </authContext.Provider>
          </SnackbarContext.Provider>
        </motion.div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </CacheProvider> 
  );
}
