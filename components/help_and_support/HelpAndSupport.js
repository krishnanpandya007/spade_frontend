import Link from 'next/link'
import React from 'react'
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config'
import SearchResults from '../basic/SearchResults'
import { fetch_gloabal_tickets } from './search_query_api/fetch_gloabal_tickets';
import styles from './HelpAndSupport.module.css';

// Create a function to slugify a string
function slugify(string) {
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
       
}


function HelpAndSupport() {

    const [results, setResults] = React.useState([])
        
      const [searchQuery, setSearchQuery] = React.useState('');
    
      const [loading, setLoading] = React.useState(false)
    
      const handleSearch = async (e) => {



        setSearchQuery(slugify(e.target.value))


        // Fetch Data from backend
        setLoading(true)

        if (e.target.value === '') {
            setLoading(false)
            return;
          }

        const data = await fetch_gloabal_tickets(slugify(e.target.value));


        setResults(data)

        setLoading(false)

      }

  return (
    <div style={{margin: '3rem', width :'auto'}}>
        <h1 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa'}}>
            Select Catagory 
        </h1>

        <div style={{display: 'flex', width: 'auto', overflowX: 'scroll', paddingBottom: '1rem'}}>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/profile/`}>
            
                <div style={{width: 'clamp(400px, 30rem, 600px)', borderRadius: '10px', height: '250px', flexShrink: '0', backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '1.5rem', marginRight: '1%', backgroundImage: "url('profile_bg.png')", backgroundPosition: '95% center', backgroundSize: '150px', backgroundRepeat: 'no-repeat'}}>
                    <h2 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa', color: '#f4f4f4', marginTop: '0'}}>
                        Profile
                    </h2>
                    <h4 style={{color: '#f6f6f6', fontSize: '0.9rem'}}>
                        Sign-up, Log-in, Edit Profile, Password
                        <br />
                        Recovery, etc...
                    </h4>
                </div>
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/glitch_and_bug/`}>

                <div style={{width: 'clamp(400px, 30vw, 600px)', borderRadius: '10px', height: '250px', flexShrink: '0', backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '1.5rem', marginRight: '1%', backgroundImage: "url('bugs_bg.png')", backgroundPosition: '95% center', backgroundSize: '150px', backgroundRepeat: 'no-repeat'}}>
                    <h2 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa', color: '#f4f4f4', marginTop: '0'}}>
                        Glitch/Bug
                    </h2>
                    <h4 style={{color: '#f6f6f6', fontSize: '0.9rem'}}>
                    Found Any irretable glitch which let <br /> you feels irritating on this site
                    </h4>
                </div>
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/my_app/`}>

                <div style={{width: 'clamp(400px, 30vw, 600px)', borderRadius: '10px', height: '250px', flexShrink: '0', backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '1.5rem', marginRight: '1%', backgroundImage: "url('myapp_bg.png')", backgroundPosition: '95% center', backgroundSize: '150px', backgroundRepeat: 'no-repeat'}}>
                    <h2 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa', color: '#f4f4f4', marginTop: '0'}}>
                        My App
                    </h2>
                    <h4 style={{color: '#f6f6f6', fontSize: '0.9rem'}}>
                    Some problem occurs only on your or <br /> specific accounts
                    </h4>
                </div>
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/posts/`}>

                <div style={{width: 'clamp(400px, 30vw, 600px)', borderRadius: '10px', height: '250px', flexShrink: '0', backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '1.5rem', marginRight: '1%', backgroundImage: "url('posts_bg.png')", backgroundPosition: '95% center', backgroundSize: '150px', backgroundRepeat: 'no-repeat'}}>
                    <h2 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa', color: '#f4f4f4', marginTop: '0'}}>
                        Posts
                    </h2>
                    <h4 style={{color: '#f6f6f6', fontSize: '0.9rem'}}>
                    Creating Post, like existing post, <br />posting comment, etc...
                    </h4>
                </div>
            </Link>
            <Link href={`${FRONTEND_ROOT_URL}help_and_support/catagory/other/`}>
            
                <div style={{width: 'clamp(400px, 30vw, 600px)', borderRadius: '10px', height: '250px', flexShrink: '0', backgroundColor: '#7900FF', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingLeft: '1.5rem', marginRight: '1%', backgroundImage: "url('other_bg.png')", backgroundPosition: '95% center', backgroundSize: '150px', backgroundRepeat: 'no-repeat'}}>
                    <h2 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa', color: '#f4f4f4', marginTop: '0'}}>
                        Other
                    </h2>
                    <h4 style={{color: '#f6f6f6', fontSize: '0.9rem'}}>
                    My Issue catagory doesn’t lies on <br /> before mentioned catagories
                    </h4>
                </div>
            </Link>

        </div> 

        <br />
        <br />
        <br />


        <h1 style={{fontWeight: 600, fontSize: '2.5rem', fontFamily: 'Changa'}}>
            Search Tickets 
        </h1>
        

        {/* <div 
        style={{width: '80%', height: '4rem', display: 'flex', border: '1px solid black', justifyContent: 'space-between'}}> */}
        <div style={{position: 'relative', width: '80%'}}>

            <input onChange={handleSearch} type="search" placeholder="Find Issues here..." name="search_ticket" id="search_ticket" style={{width: '100%', padding: '0 1.4%', height: '4rem', outline: 'none', fontSize: '1.4rem', fontFamily: 'Changa', border: `2px solid #1C6DD0`,fontWeight: '400', borderRadius: '10px'}} />
            <SearchResults result={results} search_query={searchQuery} parent_loading={loading} />
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