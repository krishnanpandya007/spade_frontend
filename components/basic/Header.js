import { Button, CircularProgress, IconButton, Skeleton, Tooltip, useTheme } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import styles from './Header.module.css'

import { useContext } from 'react';

import { blue, grey} from '@mui/material/colors';
import get_search_results from './postModalComponents/get_search_results';


import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import logout from './logout';
import { useRouter } from 'next/router';
import { FRONTEND_ROOT_URL } from '../../config';

import TemporaryDrawer from './LoginDrawer';
import authContext from './contexts/layout_auth_context';
import ProfileMenu from '../ProfileMenu'
import useDebouncedValue from '../../hooks/use-debounced-value';

// Create a function to slugify a string
function slugify(string) {
  return string.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
     
}
function getCookie(name) { var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));     return match ? match[1] : null; }

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

            {/* <Link href="/profile/edit"> */}
            <IconButton onClick={handleDrawerOpen}>
              <Avatar src={auth?.user_data?.profile_pic} color="primary">{auth.user_data.first_name && auth.user_data.last_name ? auth.user_data.first_name[0].toUpperCase() + auth.user_data.last_name[0].toUpperCase() : auth.user_data.username?.slice(0, 2).toUpperCase()}</Avatar>
            </IconButton>
                
        </React.Fragment>
    )

}


function Header({changeFilterBy, currentFilterBy, includesFilters, mode, isMobile, hasAtoken}) {

      
  const user = useContext(authContext)
  const [authState, setAuthState] = React.useState(false); // false | true | 'loading'

  const theme = useTheme();

  
  const [searchMode, setSearchMode] = React.useState('post'); // Any['post', 'profile', 'tag']
  
  const [inputFocused, setInputFocused] = React.useState(false);
  
  const [searchResults, setSearchResults] = React.useState([])
  
  const [loading, setLoading] = React.useState(false)
  
  const [openSearchResults, setOpenSearchResults] = React.useState(false);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  
  const open = Boolean(anchorEl);
  const handleSearchQueryChange = async (e) => {
      setSearchQuery(e.target.value);
      
  }

  const fetchQueryPost = async () =>{

    setLoading(true);
    // try{
      const searchData = await get_search_results(searchQuery, 6); // Want to fetch 6 posts
    // } catch (err) {
    //     console.log(err)
    // }
    // alert(searchData)
    if (searchQuery.startsWith("profile:") && searchMode !== 'profile'){
      
      setSearchMode('profile')
      
    }else if(searchQuery.startsWith("tag:") && searchMode !== 'tag'){
      
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
    
  const [searchQuery, setSearchQuery] = useDebouncedValue('', fetchQueryPost);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
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


  useEffect(async() => {

    if(hasAtoken){
      // Start fetching account information.
      setAuthState('loading')


      const response = await fetch(`${FRONTEND_ROOT_URL}api/auth/verify`);

      const dataj = await response.json();
      
      if(!dataj.login_needed){
        // No longer login needed, proceed to update UI accordingly
        user.set_user_data(dataj.username, dataj.profile_pic, dataj.first_name, dataj.last_name);
        user.authenticate();
        setAuthState(true);

      }else {
        setAuthState(false);
      }

    }else{

      user.de_authenticate();

    }

  }, [hasAtoken])

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

    {/* otherHeaderComponents END */}

        <div className={styles.header_main} style={{backgroundColor: (theme.palette.mode !== 'dark') ? '#FAFAFA' : '#4D77FF20'}}>  
            <div className={styles.header_left}>
                <Link href="/">
                    <a href="/" style={{margin: '0.5rem', padding: '0'}}>
                        <Image src="/spade_icon.svg" width="25" height="25" />
                    </a>
                </Link>
                <input style={(isMobile ? {width: 'max(10ch,40vw)', backgroundColor: theme.palette.mode !== 'dark' ? 'white' : theme.palette.action.hover, color: theme.palette.mode === 'dark' ? 'white' : 'black'} : {width: 'auto', backgroundColor: theme.palette.mode !== 'dark' ? 'white' : theme.palette.action.hover, color: theme.palette.mode === 'dark' ? 'white' : 'black'})} value={searchQuery} onFocusCapture={() => {setInputFocused(true);}} onBlur={() => {setInputFocused(false)}} onKeyDown={(e) => {if(e.key === 'Enter'){window.location.href = `${FRONTEND_ROOT_URL}explore/see-more/${slugify(searchQuery)}`}}} onChange={handleSearchQueryChange} onFocus={() => {setOpenSearchResults(true)}} type="search" name="search_main" id="search_main" className={styles.search_input} placeholder="Search here..." />
                {includesFilters && !isMobile ?
                    <Tooltip title="Filter">
                        <IconButton onClick={handleClick} style={{borderRadius: '2px'}}>
                        {/* <svg role="img" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" aria-labelledby="settingsIconTitle" stroke="#2329D6" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#2329D6"> <title id="settingsIconTitle">Settings</title> <path d="M5.03506429,12.7050339 C5.01187484,12.4731696 5,12.2379716 5,12 C5,11.7620284 5.01187484,11.5268304 5.03506429,11.2949661 L3.20577137,9.23205081 L5.20577137,5.76794919 L7.9069713,6.32070904 C8.28729123,6.0461342 8.69629298,5.80882212 9.12862533,5.61412402 L10,3 L14,3 L14.8713747,5.61412402 C15.303707,5.80882212 15.7127088,6.0461342 16.0930287,6.32070904 L18.7942286,5.76794919 L20.7942286,9.23205081 L18.9649357,11.2949661 C18.9881252,11.5268304 19,11.7620284 19,12 C19,12.2379716 18.9881252,12.4731696 18.9649357,12.7050339 L20.7942286,14.7679492 L18.7942286,18.2320508 L16.0930287,17.679291 C15.7127088,17.9538658 15.303707,18.1911779 14.8713747,18.385876 L14,21 L10,21 L9.12862533,18.385876 C8.69629298,18.1911779 8.28729123,17.9538658 7.9069713,17.679291 L5.20577137,18.2320508 L3.20577137,14.7679492 L5.03506429,12.7050339 Z"/> <circle cx="12" cy="12" r="1"/> </svg> */}
                            <svg width="16"  height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z" fill="#000000" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </IconButton>
                    </Tooltip>:null

                }

<div style={{position: 'absolute',overflow: 'hidden', zIndex: '1', backgroundColor: theme.palette.background.default, bottom: '0', left: '0', width: '100%',transform: 'translateY(100%)', borderRadius: '5px', boxShadow: '0px 4px 10px '+blue[400] + '50', display: searchQuery !== "" ? '' : 'none'}}>
                            {/* <> */}
                            {searchMode !== 'post' ? <h5 style={{paddingLeft: '5%', color: grey[700], fontWeight: '900', fontSize: '0.85rem', textTransform: 'capitalize'}}>{searchMode + 's'}</h5> : null}
                        {
                          
                            !(loading) ?
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
                                <b style={{fontFamily: 'Poppins', fontWeight: 'bold', color: '#c4c4c4'}}>Sorting Best...</b>
                            </div>
                        }

                        {/* </> */}


                            {/* {!loading && typeof window !== undefined && <Link href={`${FRONTEND_ROOT_URL}explore/see-more/${String(searchQuery).replace(/-/g," ")}/`} style={{marginRight: '10%'}}><a>See More</a></Link>}
                            <Link href={`${FRONTEND_ROOT_URL}about/#how-search-works`}><a>How Search works</a></Link> */}


                    </div>
            </div>
            {/* <button onClick={() => {user.set_open_drawer(true, null)}}>hi</button> */}
            <div className={styles.header_right}>
                
              { authState === true ? <AppMenuLoggedIn mode={mode}/> :  (authState === 'loading' ? <Skeleton variant="circular" width={40} height={40} /> : <AppMenuAnonymous isMobile={isMobile} userInstance={user} />) }

              {/* {user.is_authenticated ? <AppMenuLoggedIn mode={mode}/> : <AppMenuAnonymous isMobile={isMobile} userInstance={user} />} */}

            </div>
        </div>
      </header>
  )
}

export default Header

Header.defaultProps = {
  mode: null
}