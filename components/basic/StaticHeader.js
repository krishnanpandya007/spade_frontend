import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FRONTEND_ROOT_URL } from '../../config'
import styles from "./Header.module.css"
import authContext from './contexts/layout_auth_context'
import { CircularProgress, useTheme } from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import get_search_results from './postModalComponents/get_search_results';

function StaticHeader() {

  const auth = useContext(authContext);
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = React.useState('');

  const [searchMode, setSearchMode] = React.useState('post'); // Any['post', 'profile', 'tag']

  const [inputFocused, setInputFocused] = React.useState(false);

  const [searchResults, setSearchResults] = React.useState([])

  const [loading, setLoading] = React.useState(false)

  const [openSearchResults, setOpenSearchResults] = React.useState(false);

  const isMobile = auth.is_on_mobile;

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
    <center>
      <header className={styles.header_itself}>
      <div className={styles.header_main} style={{backgroundColor: (theme.palette.mode !== 'dark') ? '#FAFAFA' : '#4D77FF20'}}>  
            <div className={styles.header_left}>
                <Link href="/">
                    <a href="/" style={{margin: '0.5rem', padding: '0'}}>
                        <Image src="/spade_icon.svg" width="25" height="25" />
                    </a>
                </Link>
                <input aria-autocomplete={false} style={(true ? {width: 'clamp(10ch,40vw, 300px)', backgroundColor: theme.palette.mode !== 'dark' ? 'white' : theme.palette.action.hover} : {width: 'auto', backgroundColor: theme.palette.mode !== 'dark' ? 'white' : theme.palette.action.hover})} value={searchQuery} onFocusCapture={() => {setInputFocused(true);}} onBlur={() => {setInputFocused(false)}} onKeyDown={(e) => {if(e.key === 'Enter'){window.location.href = `${FRONTEND_ROOT_URL}explore/see-more/${slugify(searchQuery)}`}}} onChange={handleSearchQueryChange} onFocus={() => {setOpenSearchResults(true)}} type="search" name="search_main" id="search_main" className={styles.search_input} placeholder="Search here..." />

<div style={{position: 'absolute',overflow: 'hidden', zIndex: '1', backgroundColor: theme.palette.background.default, bottom: '0', left: '0', width: '100%',transform: 'translateY(100%)', borderRadius: '5px', boxShadow: '0px 0px 3px 2px  '+blue[400], display: searchQuery !== "" ? '' : 'none'}}>
                            {/* <> */}
                            {searchMode !== 'post' ? <h5 style={{paddingLeft: '5%', color: grey[700], fontWeight: '900', fontSize: '0.85rem', textTransform: 'capitalize'}}>{searchMode + 's'}</h5> : null}
                        {
                          
                            inputFocused && (!(loading) ?
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
                            </div>)
                        }

                        {/* </> */}


                            {/* {!loading && typeof window !== undefined && <Link href={`${FRONTEND_ROOT_URL}explore/see-more/${String(searchQuery).replace(/-/g," ")}/`} style={{marginRight: '10%'}}><a>See More</a></Link>}
                            <Link href={`${FRONTEND_ROOT_URL}about/#how-search-works`}><a>How Search works</a></Link> */}


                    </div>
            </div>
            {/* <button onClick={() => {user.set_open_drawer(true, null)}}>hi</button> */}
            <div className={styles.header_right}>

              <Link href={`/explore/daily_share`}>
                <a href={`/explore/daily_share`} style={{backgroundColor: '#516BEB', padding: '0.5rem 0.8rem', borderRadius: '10px', fontFamily: 'Poppins', marginLeft: '3ch', textDecoration: 'none'}}>
                  Daily Shares
                </a>                            
              </Link>
            </div>
        </div>
      </header>

        {/* <header style={{width: '100vw', padding: '1.3rem', display: 'flex', justifyContent: 'space-between'}}>
            <Link href="/">
              <a href="/">
                <Image src="/spade_icon.svg" width="25" height="25" />
              </a>
            </Link>
            <Link href={FRONTEND_ROOT_URL}>
                <a href={FRONTEND_ROOT_URL} style={{color: 'blue', textDecoration: 'underline'}}>
                    Go To Home
                </a>
            </Link>
        </header>
        <hr /> */}
    </center>
  )
}

export default StaticHeader