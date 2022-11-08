import Link from 'next/link'
import React from 'react'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config'
import SearchResults from '../basic/SearchResults'
import { fetch_gloabal_tickets } from './search_query_api/fetch_gloabal_tickets';
import styles from './HelpAndSupport.module.css';
import { CircularProgress, useTheme } from '@mui/material';
import useDebouncedValue from '../../hooks/use-debounced-value';

// Create a function to slugify a string
function slugify(string) {
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
       
}


function HelpAndSupport() {

    const [results, setResults] = React.useState([])
    
    
    const theme = useTheme();
    
    const [loading, setLoading] = React.useState(false)
    
    const handleSearch = async (e) => {
        
        setSearchQuery(slugify(e.target.value))
        
    }

    const fetch_search_query_posts = async () => {
        // Fetch Data from backend
        setLoading(true)
        
        if (searchQuery === '') {
            setLoading(false)
            return;
          }
          
          const data = await fetch_gloabal_tickets(slugify(searchQuery));
          
        setResults(data)
        
        setLoading(false)
    }
    const [searchQuery, setSearchQuery] = useDebouncedValue('', fetch_search_query_posts);
    
    return (
    <div style={{margin: '3vw', width :'auto'}}>
        <h1 style={{fontWeight: '900', fontSize: '1.85rem', fontFamily: 'Chivo'}}>
            Catagory 
        </h1>

        <div style={{display: 'flex', width: 'auto', overflowX: 'auto', paddingBottom: '1rem'}}>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/profile/`}>
            
                <div className={styles.catagory_container}>
                    <h3 style={{borderBottomColor: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}}>Profile</h3>
                    <p>Sign-Up, Log-in, Edit Profile, Password Recovery, etc...</p>
                </div>

            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/glitch_and_bug/`}>

                <div className={styles.catagory_container}>
                    <h3 style={{borderBottomColor: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}}>Glitch/Bug</h3>
                    <p>Creating Post, like existing post, posting comment, etc...</p>
                </div>
                
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/my_app/`}>

                <div className={styles.catagory_container}>
                    <h3 style={{borderBottomColor: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}}>My App</h3>
                    <p>Some problem occurs only on your or specific accounts</p>
                </div>

            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/posts/`}>

                <div className={styles.catagory_container}>
                    <h3 style={{borderBottomColor: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}}>Posts</h3>
                    <p>Some problem occurs only on your or specific accounts</p>
                </div>
                d
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/other/`}>
            
                <div className={styles.catagory_container}>
                    <h3 style={{borderBottomColor: theme.palette.mode === 'dark' ? '#ffffff40' : '#00000040'}}>Other</h3>
                    <p>My Issue catagory doesn’t lies on before mentioned catagories</p>
                </div>

            </Link>

        </div> 

        <br />
        <br />
        <br />


        <h1 style={{fontWeight: '800', fontSize: '1.7rem', fontFamily: 'Chivo'}}>
            Search Issue 
        </h1>
        

        {/* <div 
        style={{width: '80%', height: '4rem', display: 'flex', border: '1px solid black', justifyContent: 'space-between'}}> */}
        <div className={styles.search_primary} style={{position: 'relative', width: 'min(93vw, 800px)'}}>
            <div className={styles.search_secondary} style={{borderBottom: searchQuery && (theme.palette.mode === 'dark' ? '1px dashed #ffffff60' : '1px dashed #00000060'), paddingBottom:'1.5rem', marginBottom: searchQuery && '2.5rem'}}>
                <div className={styles.input_actions_wrapper}>

                    <input onChange={handleSearch} type="search" placeholder="Find quick solution..." name="search_ticket" style={{color: theme.palette.mode === 'dark' ? 'white' : 'black'}} id="search_ticket"  />
                    <button>Search</button>
                </div>
                {/* <SearchResults result={results} search_query={searchQuery} parent_loading={loading} /> */}
            </div>
                {   searchQuery &&(loading ? <center><h3 style={{margin: '3rem 0', opacity: '0.8'}}><CircularProgress size={15} /></h3></center> : 
                    <div style={{margin: '0 1rem 3rem 1rem'}}>

                    {
                        results.map((soln, idx) => (<>
                            <Link href={`/explore/ticket/${soln.id}`} key={idx}>
                                <a href={`/explore/ticket/${soln.id}`}>
                                    <div className={soln.verified_answer ? styles.accepted_answer_badge : styles.answer_badge} title={soln.verified_answer ? "Solved" : "UnSolved"}/>
                                    <span style={{fontFamily: 'Poppins'}}>{soln.title}</span>
                                </a>
                            </Link>
                            <br/>
                            </>
                        ))
                    }

                    {/* <br/>
                    <div className={styles.answer_badge} title="UnSolved"/>
                    <span style={{fontFamily: 'Poppins'}}>Not able to Log in to my account on different device</span>
                    <br/>
                    <div className={styles.answer_badge} title="UnSolved"/>
                    <span style={{fontFamily: 'Poppins'}}>What am i not able to Log in to my account</span> */}
                    
                </div>)}
        </div>


        <h3 className={styles.topic_subheading}>FAQ <span style={{fontWeight: '300', fontSize: '0.8rem'}}>(s)</span></h3>

        {/* FAQ(s) */}
        <details className={styles.faqs}>

            <summary>Can&apos;t access Account after signing out</summary>
            <p>Looking like you&apos;ve forgotten the password, You should use Email for password-recovery</p>
        </details>

        <details className={styles.faqs}>
            <summary>Can I earn by posting content on daily basis?</summary>
            <p>Currently, you can earn by sharing the existing blockbuster content to other hot social-networks</p>
        </details>

        <details className={styles.faqs}>
            <summary>Am I able edit my post after publishment?</summary>
            <p>As editing the content can manytimes leads to mis-understanding at a moment, you can&apos;t but in comment you can descibe the right things.</p>
        </details>

        <details className={styles.faqs}>
            <summary>Why i can&apos;t see updated profile picture?</summary>
            <p>There is no glitches related to that maybe sometimes Spade server needs sometimes to reload the updated picture which needs to be uploaded successfully</p>
        </details>

        {/* </div> */}
    </div>
  )
}

export default HelpAndSupport