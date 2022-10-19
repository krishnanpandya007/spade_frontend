import React, { useContext } from 'react'
import HelpAndSupport from '../../components/help_and_support/HelpAndSupport'
import StaticHeader from '../../components/basic/StaticHeader'
import Footer from '../../components/basic/Footer'
import { useTheme } from '@mui/system';
import ColorModeContext from '../../components/basic/contexts/color_mode_context';
import Header from '../../components/basic/Header';
import Layout from '../../components/basic/layout';
function HelpAndSupportIndex() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  React.useEffect(() => {

    if(theme.palette.mode === 'dark'){

      colorMode.toggleColorMode()
    }
    
  }, [])

  return (
    
    <>
    {/* <Header /> */}
    <Header />
    {/* <Layout title="Help & Support - Spade" content="help and support contact spade with tickets" isAuthenticated={false} > */}
      <HelpAndSupport />

    {/* </Layout> */}

    <Footer/>
    </>



  )
}


export default HelpAndSupportIndex