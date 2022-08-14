
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../lib/createEmotionCache';
import NextNProgress from "nextjs-progressbar";
import { motion } from 'framer-motion';
import "../styles/globals.css";
import theme from '../styles/theme';
import SnackbarContext from '../components/basic/contexts/snackbar_context';
import { Alert, Button, Snackbar } from '@mui/material';
import { useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import ColorModeContext from '../components/basic/contexts/color_mode_context';

// Integrating Authentication For Next.js APK
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const darkTheme = {
  palette: {
    mode: 'dark',
    background: {
      default: '#082032'
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

export default function MyApp(props) {

  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
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
          
          <SnackbarContext.Provider value={{...snackbarData, open: open, close: close, undo_action: undo_action}}>
            <Snackbar autoHideDuration={5000} anchorOrigin={{horizontal: 'right', vertical: 'bottom'}} message={snackbarData.severity === "simple" ? snackbarData.message : null} open={snackbarData.open} onClose={close} action={snackbarData.includes_callback ? undo_action(snackbarData.callback_fn, snackbarData.action_button_title) : null} >
              {snackbarData.severity !== 'simple' &&
                <Alert onClose={close} severity={snackbarData.severity}>
                  {snackbarData.message}
                </Alert>
              }
            </Snackbar>
            <Component {...pageProps} />
          </SnackbarContext.Provider>
        </motion.div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </CacheProvider> 
  );
}
