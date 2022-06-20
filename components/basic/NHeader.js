import styles from './Header.module.css'
import React, { memo, useContext, useEffect } from 'react';
import HeaderAppMenuLogged from './HeaderAppMenuLogged';

import { Badge, Button, CircularProgress, Link, Stack } from '@mui/material';
import { blue } from '@mui/material/colors';
import get_search_results from './postModalComponents/get_search_results';
import { Box, styled } from '@mui/system';
import {LogoutOutlined} from '@mui/icons-material';


import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import logout from './logout';
import { useRouter } from 'next/router';
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config';

import Image from 'next/image'
import TemporaryDrawer from './LoginDrawer';
import { signOut } from 'next-auth/react';
import authContext from './contexts/layout_auth_context';
import SnackbarContext from './contexts/snackbar_context';


// Create multiple components according to Logged_in or not

function Header ({changeFilterBy, currentFilterBy, includesFilters, mode }) {

  
  const user = useContext(authContext)
  const snackbarContext = useContext(SnackbarContext)
    // const [isAuthenticated, setIsAuthenticated] = React.useState(is_loggedIn)

    // const authenticate = () => {

    //   setIsAuthenticated(true);

    // }

    // const de_authenticate = () => {

    //   setIsAuthenticated(false);

    // }

     useEffect(() => {

      console.log("In Header")
      console.log(user.user_data.first_name)

     }, [])

    const [searchQuery, setSearchQuery] = React.useState('');


    const [searchResults, setSearchResults] = React.useState([])

    const [loading, setLoading] = React.useState(false)

    const [openSearchResults, setOpenSearchResults] = React.useState(false);



    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElSettings, setAnchorElSettings] = React.useState(null);

    const open = Boolean(anchorEl);
    const openSettings = Boolean(anchorElSettings)

    const router = useRouter();

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClickSettings = (event) => {
      setAnchorElSettings(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
      user.set_open_drawer(false)
    };
    const handleCloseSettings = () => {
      setAnchorElSettings(null);
    };
    const onClickMenuItem = (catagory) => {
      changeFilterBy(catagory)
    }



    const logoutUser = async () => {

      const response = await logout();

      if(response.status === 200){
        router.push('/login');
      }

    }

    const handleSearchQueryChange = async (e) => {
        setSearchQuery(e.target.value);
        // Fetch data from backend
        setLoading(true);
        // try{
            const searchData = await get_search_results(e.target.value, 6); // Want to fetch 6 posts
        // } catch (err) {
        //     console.log(err)
        // }
        // alert(searchData)
        console.log(searchData.map((val, idx) => val["title"]))
        if (searchData) {
            setSearchResults(searchData);
        }
        setLoading(false);

    }

    
 
    return (
      <>
      {/* <authContext.Provider value={{ is_authenticated: isAuthenticated, authenticate: authenticate, de_authenticate: de_authenticate }} > */}

        <center width="100%">


<TemporaryDrawer />


<React.Fragment>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem disabled={currentFilterBy === 'trending'} onClick={() => {onClickMenuItem('trending')}}>
          Trending
        </MenuItem>
        <MenuItem  disabled={currentFilterBy === 'popular'} onClick={() => {onClickMenuItem('popular')}}>

           Popular
        </MenuItem>
  
        { user.is_authenticated &&  <MenuItem disabled={currentFilterBy === 'relevant'} onClick={() => {onClickMenuItem('relevant')}}>


          Relevant
        </MenuItem>}
        <MenuItem disabled={currentFilterBy === 'recent'} onClick={() => {onClickMenuItem('recent')}}>


          Recent
        </MenuItem>

      </Menu>
    </React.Fragment>
      
    <React.Fragment>

    <Menu
        anchorEl={anchorElSettings}
        open={openSettings}
        onClose={handleCloseSettings}
        onClick={handleCloseSettings}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            borderRadius: '10px',
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => {user?.user_data?.username != undefined ? window.location.href = `${FRONTEND_ROOT_URL}view_profile/`+user?.user_data?.username+"/":null}}>
          {
            user.user_data?.profile_pic ? <Avatar src={user.user_data.profile_pic} /> : user.user_data?.first_name && user.user_data?.last_name ? <Avatar style={{backgroundColor: '#e4704a', color: 'whitesmoke', fontWeight: '700'}} >{user?.user_data?.first_name[0]+user?.user_data?.last_name[0]}</Avatar>: <Avatar />
            // <h1>{user.user_data.profile_pic}</h1>
          }
          My Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutUser} >
          <LogoutOutlined />
          &nbsp;

          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>





            {/* Use Grid  
            
            Header.minWidth = 1030px
            Header.maxWidth = 2000px
            Header.GeneralWidth = 70%
            
            */}
                <div style={{width: 'clamp(1030px, 70%, 2000px)',display: 'flex', margin: '1rem 0', backgroundColor: 'transparent', justifyContent: 'space-between', alignItems: 'center'}} className={styles.header_desks}>
                <Link href='/' style={{textDecoration: 'none', position: 'relative', width: '10%'}}>
                  <div className={styles.header_logos} style={{position: 'relative',width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                      <img height="30"  width="30" src="/spade_icon.svg" />
                      <p style={{letterSpacing: '3px'}}>SPADE</p>
                      <div style={{position: 'absolute', top: '0', 'right': 0,padding: '0.05rem 0.25rem', backgroundColor: '#5463FF', color: 'white', transform: 'translate(50%, -50%)', fontSize: '0.8rem', borderRadius: '5px', fontWeight: '500', fontFamily: 'Poppins'}}>BETA</div>
                      {/* <Logo /> */}
                  </div>
                </Link>
                
                <div className={styles.header_searchs} style={{
                    // flex: `${(is_loggedIn ? '0.7'  : '0.7')} `,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                }}>
                    <input onFocus={() => {setOpenSearchResults(true)}} type="search" name="search" id="" onChange={handleSearchQueryChange} placeholder="Search" className={styles.inps} value={searchQuery} />
                    <button className={styles.header_search_button} style={{height: '60%',  border: '1px solid #c4c4c4', width: '7%', display: 'grid', placeItems: 'center', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', transition: '0.5s ease', backgroundColor: 'transparent'}}> 
                        {/* <SearchOutlined /> */}
                        <svg width="22" height="22" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </button>
                    {includesFilters ?
                      <Tooltip title="Filter">
                          <button onClick={handleClick} style={{marginLeft: '1.2rem', background: 'none', outline: 'none', border: 'none', borderRadius: '5px'}} className={styles.filter_btn}>
                              {/* <Image src={`${FRONTEND_ROOT_URL}filter.svg/`} height="30" style={{color: 'grey'}} width="25" /> */}
                              <svg width="25" height="25" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                          </button>
                      </Tooltip>:null
                    }

                    <div style={{position: 'absolute',boxShadow: '0px 0px 0px 1px '+blue[400],display: searchQuery === '' && !loading ? 'none' : '' , marginTop: '8vh', width: '130%', padding: '2%', backgroundColor: 'white', transform: 'translateY(50%)', borderRadius: '10px'}}>
                            {/* <> */}
                        {
                            !loading?
                            searchResults.map((val, idx) => (
                                
                                <div onClick={() => window.location.href = `${FRONTEND_ROOT_URL}/explore/post/${val?.id}`} key={idx} style={{display: 'flex', width: '80%', marginBottom: '1%', paddingBottom: '1%', borderBottom: '1px solid #c4c4c4', textAlign: 'center'}} className={styles.search_item}>

                                        <h3 style={{fontWeight: 400, fontSize: '1rem'}}>{val?.title}</h3>

                                </div>    
                            )):
                            <Box sx={{display: 'grid', placeItems: 'center', height: '40vh'}}>
                                <CircularProgress />
                            </Box>
                        }

                        {/* </> */}


                            {!loading && typeof window !== undefined && <Link href={`${FRONTEND_ROOT_URL}explore/see-more/${String(searchQuery).replace(/-/g," ")}/`} style={{marginRight: '10%'}}><a>See More</a></Link>}
                            <Link href={`${FRONTEND_ROOT_URL}about/#how-search-works`}><a>How Search works</a></Link>


                    </div>
                </div>
                <div className={styles.header_menus} >
                  
                {user.is_authenticated ? <HeaderAppMenuLogged _onClick={handleClickSettings} /> : 
                        <div>
                        <Stack spacing={2} direction="row" >
                            <Button variant="outlined" className="btn" onClick={() => {user.set_open_drawer(true, null)}}> Join Now </Button>
                            {/* <Button variant="outlined" className="btn" onClick={signOut}>Log Out</Button>  */}

                        </Stack>
                        
                    </div>}
                </div>
            </div>
        </center>

        </>
    )
}

export default memo(Header)

Header.defaultProps = {
  includesFilters: false,
  currentFilterBy: 'trending',
  changeFilterBy: () => {},
  mode: null
}
