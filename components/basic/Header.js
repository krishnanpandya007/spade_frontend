import { Button, CircularProgress, IconButton, Tooltip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Header.module.css'

import { memo, useContext, useEffect } from 'react';
import HeaderAppMenuLogged from './HeaderAppMenuLogged';

import { blue, green, grey, purple } from '@mui/material/colors';
import get_search_results from './postModalComponents/get_search_results';
import {LogoutOutlined, Settings} from '@mui/icons-material';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import logout from './logout';
import { useRouter } from 'next/router';
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config';

import TemporaryDrawer from './LoginDrawer';
import authContext from './contexts/layout_auth_context';
import SnackbarContext from './contexts/snackbar_context';
import ProfileMenu from '../ProfileMenu'

function AppMenuAnonymous({userInstance, isMobile}) {

    return (
        <React.Fragment>
          {
            !isMobile?
            <Link href="/about#what-is-spade">
                <a href='/about#what-is-spade'>
            {/* <svg style={{borderBottom: '2px solid #2329D6'}} className={styles.svg_icon} role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-labelledby="homeAltIconTitle" stroke="#2329D6" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="homeAltIconTitle">Home</title> <path d="M3 10.182V22h18V10.182L12 2z"/> <rect width="6" height="8" x="9" y="14"/> </svg> */}
                <p  style={{color: '#516BEB', textDecoration: 'underline', fontFamily: 'Poppins'}}>What is Spade?</p>
                </a>
            </Link>:null
          }
            <Button onClick={() => {userInstance.set_open_drawer(true, null)}} variant="contained" disableElevation style={{backgroundColor: '#516BEB', borderRadius: '10px', fontFamily: 'Poppins', marginLeft: '3ch'}}>
                {isMobile ? 'JOIN': 'JOIN NOW'}
            </Button>
        </React.Fragment>
    )

}

function AppMenuLoggedIn({mode}){

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const auth = useContext(authContext);

    const handleDrawerOpen = () => {
      setDrawerOpen(true)
    }

    const handleDrawerClose = () => {
      setDrawerOpen(false);
    }

    return (
        <React.Fragment>
            <ProfileMenu open={drawerOpen} handleClose={handleDrawerClose} handleOpen={handleDrawerOpen} />
            <Link href="/">
            {/* <svg style={{borderBottom: '2px solid #2329D6'}} className={styles.svg_icon} role="img" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-labelledby="homeAltIconTitle" stroke="#2329D6" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="homeAltIconTitle">Home</title> <path d="M3 10.182V22h18V10.182L12 2z"/> <rect width="6" height="8" x="9" y="14"/> </svg> */}
                <svg style={{borderBottom: mode === "home" ? '2px solid #2329D6' : ''}} strokeWidth="10" className={styles.svg_icon} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07926 0.222253C7.31275 -0.007434 7.6873 -0.007434 7.92079 0.222253L14.6708 6.86227C14.907 7.09465 14.9101 7.47453 14.6778 7.71076C14.4454 7.947 14.0655 7.95012 13.8293 7.71773L13 6.90201V12.5C13 12.7761 12.7762 13 12.5 13H2.50002C2.22388 13 2.00002 12.7761 2.00002 12.5V6.90201L1.17079 7.71773C0.934558 7.95012 0.554672 7.947 0.32229 7.71076C0.0899079 7.47453 0.0930283 7.09465 0.32926 6.86227L7.07926 0.222253ZM7.50002 1.49163L12 5.91831V12H10V8.49999C10 8.22385 9.77617 7.99999 9.50002 7.99999H6.50002C6.22388 7.99999 6.00002 8.22385 6.00002 8.49999V12H3.00002V5.91831L7.50002 1.49163ZM7.00002 12H9.00002V8.99999H7.00002V12Z" fill={mode === "home" ? "#2329D6" : "currentColor"} fillRule="evenodd" clipRule="evenodd"></path></svg>
            </Link>
            {/* <Link href="/profile/edit"> */}
            <IconButton onClick={handleDrawerOpen}>
              <Avatar src={auth?.user_data?.profile_pic} color="primary">{auth.user_data.first_name && auth.user_data.last_name ? auth.user_data.first_name[0].toUpperCase() + auth.user_data.last_name[0].toUpperCase() : auth.user_data.username?.slice(0, 2).toUpperCase()}</Avatar>
            </IconButton>
                
            {/* </Link>  <svg style={{borderBottom: mode === "settings" ? '2px solid #2329D6' : ''}} className={styles.svg_icon} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.07095 0.650238C6.67391 0.650238 6.32977 0.925096 6.24198 1.31231L6.0039 2.36247C5.6249 2.47269 5.26335 2.62363 4.92436 2.81013L4.01335 2.23585C3.67748 2.02413 3.23978 2.07312 2.95903 2.35386L2.35294 2.95996C2.0722 3.2407 2.0232 3.6784 2.23493 4.01427L2.80942 4.92561C2.62307 5.2645 2.47227 5.62594 2.36216 6.00481L1.31209 6.24287C0.924883 6.33065 0.650024 6.6748 0.650024 7.07183V7.92897C0.650024 8.32601 0.924883 8.67015 1.31209 8.75794L2.36228 8.99603C2.47246 9.375 2.62335 9.73652 2.80979 10.0755L2.2354 10.9867C2.02367 11.3225 2.07267 11.7602 2.35341 12.041L2.95951 12.6471C3.24025 12.9278 3.67795 12.9768 4.01382 12.7651L4.92506 12.1907C5.26384 12.377 5.62516 12.5278 6.0039 12.6379L6.24198 13.6881C6.32977 14.0753 6.67391 14.3502 7.07095 14.3502H7.92809C8.32512 14.3502 8.66927 14.0753 8.75705 13.6881L8.99505 12.6383C9.37411 12.5282 9.73573 12.3773 10.0748 12.1909L10.986 12.7653C11.3218 12.977 11.7595 12.928 12.0403 12.6473L12.6464 12.0412C12.9271 11.7604 12.9761 11.3227 12.7644 10.9869L12.1902 10.076C12.3768 9.73688 12.5278 9.37515 12.638 8.99596L13.6879 8.75794C14.0751 8.67015 14.35 8.32601 14.35 7.92897V7.07183C14.35 6.6748 14.0751 6.33065 13.6879 6.24287L12.6381 6.00488C12.528 5.62578 12.3771 5.26414 12.1906 4.92507L12.7648 4.01407C12.9766 3.6782 12.9276 3.2405 12.6468 2.95975L12.0407 2.35366C11.76 2.07292 11.3223 2.02392 10.9864 2.23565L10.0755 2.80989C9.73622 2.62328 9.37437 2.47229 8.99505 2.36209L8.75705 1.31231C8.66927 0.925096 8.32512 0.650238 7.92809 0.650238H7.07095ZM4.92053 3.81251C5.44724 3.44339 6.05665 3.18424 6.71543 3.06839L7.07095 1.50024H7.92809L8.28355 3.06816C8.94267 3.18387 9.5524 3.44302 10.0794 3.81224L11.4397 2.9547L12.0458 3.56079L11.1882 4.92117C11.5573 5.44798 11.8164 6.0575 11.9321 6.71638L13.5 7.07183V7.92897L11.932 8.28444C11.8162 8.94342 11.557 9.55301 11.1878 10.0798L12.0453 11.4402L11.4392 12.0462L10.0787 11.1886C9.55192 11.5576 8.94241 11.8166 8.28355 11.9323L7.92809 13.5002H7.07095L6.71543 11.932C6.0569 11.8162 5.44772 11.5572 4.92116 11.1883L3.56055 12.046L2.95445 11.4399L3.81213 10.0794C3.4431 9.55266 3.18403 8.94326 3.06825 8.2845L1.50002 7.92897V7.07183L3.06818 6.71632C3.18388 6.05765 3.44283 5.44833 3.81171 4.92165L2.95398 3.561L3.56008 2.95491L4.92053 3.81251ZM9.02496 7.50008C9.02496 8.34226 8.34223 9.02499 7.50005 9.02499C6.65786 9.02499 5.97513 8.34226 5.97513 7.50008C5.97513 6.65789 6.65786 5.97516 7.50005 5.97516C8.34223 5.97516 9.02496 6.65789 9.02496 7.50008ZM9.92496 7.50008C9.92496 8.83932 8.83929 9.92499 7.50005 9.92499C6.1608 9.92499 5.07513 8.83932 5.07513 7.50008C5.07513 6.16084 6.1608 5.07516 7.50005 5.07516C8.83929 5.07516 9.92496 6.16084 9.92496 7.50008Z" fill={mode === "settings" ? "#2329D6" : "currentColor"} fillRule="evenodd" clipRule="evenodd"></path></svg> */}

        </React.Fragment>
    )

}


function Header({changeFilterBy, currentFilterBy, includesFilters, mode, isMobile}) {

      
  const user = useContext(authContext)
  const snackbarContext = useContext(SnackbarContext)



  const [searchQuery, setSearchQuery] = React.useState('');

  const [searchMode, setSearchMode] = React.useState('post'); // Any['post', 'profile', 'tag']

  const [inputFocused, setInputFocused] = React.useState(false);

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
      if (e.target.value.startsWith("profile:") && searchMode !== 'profile'){

        setSearchMode('profile')

      }else if(e.target.value.startsWith("tag:") && searchMode !== 'tag'){

        setSearchMode('tag')

      }else if(searchMode !== 'post'){
        setSearchMode('post')
      }

      // console.log(searchData)
      if (searchData) {
        setSearchResults(searchData);
      }
      setLoading(false);
      
  }

  return (
      <header className={styles.header_itself}>

        {/* <otherHeaderComponents /> START*/}
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
    {/* otherHeaderComponents END */}

        <div className={styles.header_main}>  
            <div className={styles.header_left}>
                <Link href="/">
                    <a href="/" style={{margin: '0.5rem', padding: '0'}}>
                        <Image src="/spade_icon.svg" width="25" height="25" />
                    </a>
                </Link>
                <input aria-autocomplete={false} style={isMobile ? {width: 'max(10ch,40vw)'} : {width: 'auto'}} value={searchQuery} onFocusCapture={() => {setInputFocused(true);}} onBlur={() => {setInputFocused(false)}} onChange={handleSearchQueryChange} onFocus={() => {setOpenSearchResults(true)}} type="search" name="search_main" id="search_main" className={styles.search_input} placeholder="Search here..." />
                {includesFilters && !isMobile ?
                    <Tooltip title="Filter">
                        <IconButton onClick={handleClick} style={{borderRadius: '2px'}}>
                        {/* <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="settingsIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="settingsIconTitle">Settings</title> <path d="M5.03506429,12.7050339 C5.01187484,12.4731696 5,12.2379716 5,12 C5,11.7620284 5.01187484,11.5268304 5.03506429,11.2949661 L3.20577137,9.23205081 L5.20577137,5.76794919 L7.9069713,6.32070904 C8.28729123,6.0461342 8.69629298,5.80882212 9.12862533,5.61412402 L10,3 L14,3 L14.8713747,5.61412402 C15.303707,5.80882212 15.7127088,6.0461342 16.0930287,6.32070904 L18.7942286,5.76794919 L20.7942286,9.23205081 L18.9649357,11.2949661 C18.9881252,11.5268304 19,11.7620284 19,12 C19,12.2379716 18.9881252,12.4731696 18.9649357,12.7050339 L20.7942286,14.7679492 L18.7942286,18.2320508 L16.0930287,17.679291 C15.7127088,17.9538658 15.303707,18.1911779 14.8713747,18.385876 L14,21 L10,21 L9.12862533,18.385876 C8.69629298,18.1911779 8.28729123,17.9538658 7.9069713,17.679291 L5.20577137,18.2320508 L3.20577137,14.7679492 L5.03506429,12.7050339 Z"/> <circle cx="12" cy="12" r="1"/> </svg> */}
                            <svg width="16"  height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="#000000" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </IconButton>
                    </Tooltip>:null

                }

<div style={{position: 'absolute',overflow: 'hidden', zIndex: '1', backgroundColor: 'white', bottom: '0', left: '0', width: '100%',transform: 'translateY(100%)', borderRadius: '5px', boxShadow: '0px 0px 3px 2px  '+blue[400], display: searchQuery !== "" ? '' : 'none'}}>
                            {/* <> */}
                            {searchMode !== 'post' ? <h5 style={{paddingLeft: '5%', color: grey[700], fontWeight: '900', fontSize: '0.85rem', textTransform: 'capitalize'}}>{searchMode + 's'}</h5> : null}
                        {
                          
                            !loading?
                            (

                              searchQuery === ""?
                              <div style={{padding: '1rem'}}>
                                {/* <center><img src="header_search_icon_2.svg" width="60" height="60" /></center> */}
                                {/* Profile Search: */}
                                <div style={{display: 'flex',alignItems: 'center'}}><svg style={{marginRight: '0.5rem'}} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                                <h3>Search For</h3></div>
                                <ul>
                                  <li style={{fontFamily: 'Roboto', fontWeight: '500'}}>Profile Search <span style={{borderRadius: '5px', backgroundColor: grey[200], padding: '2px 4px'}}> <span style={{letterSpacing: '1px', color: blue[600]}}>profile:</span> user_name</span></li>
                                  
                                 <br /> <li style={{fontFamily: 'Roboto', fontWeight: '500'}}>Tag Search <span style={{borderRadius: '5px', backgroundColor: grey[200], padding: '2px 4px'}}> <span style={{letterSpacing: '1px', color: blue[600]}}>tag:</span> tagname</span></li>
                                 <br /> <li style={{fontFamily: 'Roboto', fontWeight: '500'}}>Post Search <span style={{borderRadius: '5px', backgroundColor: grey[200], padding: '2px 4px'}}>post finding query</span><span style={{color: grey[300]}}> (Default)</span></li>
                                
                                </ul>
                              </div>
                              :

                              searchResults.map((val, idx) => (
                                  
                                  <div onClick={() => window.location.href = `${FRONTEND_ROOT_URL}${searchMode === 'post' ? '/explore/post/'+String(val.id) : (searchMode === 'profile' ? '/view_profile/' + val.name : '/explore/tag/' + val.name)}`} key={idx} className={styles.search_item}>
  
                                          <p className={styles.search_result} style={{paddingLeft: '5%', fontWeight: '300', fontFamily: 'Poppins', fontSize: '0.85rem'}}>{val?.name}</p>
  
                                  </div>    
                              ))
                            ):
                            <div style={{display: 'grid', placeItems: 'center', height: '30vh'}}>
                                <CircularProgress size={20} />
                            </div>
                        }

                        {/* </> */}


                            {/* {!loading && typeof window !== undefined && <Link href={`${FRONTEND_ROOT_URL}explore/see-more/${String(searchQuery).replace(/-/g," ")}/`} style={{marginRight: '10%'}}><a>See More</a></Link>}
                            <Link href={`${FRONTEND_ROOT_URL}about/#how-search-works`}><a>How Search works</a></Link> */}


                    </div>
            </div>
            {/* <button onClick={() => {user.set_open_drawer(true, null)}}>hi</button> */}
            <div className={styles.header_right}>
                
              {user.is_authenticated ? <AppMenuLoggedIn mode={mode}/> : <AppMenuAnonymous isMobile={isMobile} userInstance={user} />}

            </div>
        </div>
      </header>
  )
}

export default Header

Header.defaultProps = {
  mode: null
}