import React from 'react'
import Link from 'next/link'
import styles from './SearchResults.module.css'
import { blue } from '@mui/material/colors'
import { FRONTEND_ROOT_URL } from '../../config';
import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

/* POSTER */

function SearchResults({result, search_query, parent_loading}) {


  return (
    <div style={{position: 'absolute',boxShadow: '0px 0px 0px 1px '+blue[400],display: search_query === ''  ? 'none' : '' , bottom: '0', width: '100%', padding: '2%', backgroundColor: 'white', transform: 'translateY(105%)', borderRadius: '10px'}}>

{   
    !parent_loading?
        result.length > 0 && result.map((val, idx) => (
        
        <div onClick={() => window.location.href = `${FRONTEND_ROOT_URL}explore/ticket/${val?.id}`} key={idx} style={{display: 'flex', width: '100%', marginBottom: '1%', paddingBottom: '1%', borderBottom: '1px solid #c4c4c4', textAlign: 'center', justifyContent: 'space-between'}} className={styles.link_results}>

                <h3 style={{fontWeight: 400, fontSize: '1rem'}}>{val?.title}</h3>
                {
                    

                    val.verified_answer  ? 

                <div style={{color: 'white' ,backgroundColor: '#00C897', height: 'clamp(1rem, 0.5%, 1rem)', padding: '1% 1.5%', borderRadius: '500px', fontFamily: 'Poppins', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <svg style={{marginRight: '0.4rem'}} width="15" height="15" viewBox="0 0 15 15" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="white" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    Solved
                </div>:null

                }

        </div>    
    )):
    <Box sx={{display: 'grid', placeItems: 'center', height: '40vh'}}>
        <CircularProgress />
    </Box>
}



    {/* <Link href={`${FRONTEND_ROOT_URL}about/#how-search-works`}><a>How Search works</a></Link> */}


</div>

  )
}


export default SearchResults
