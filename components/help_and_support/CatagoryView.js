import {BACKEND_ROOT_URL, FRONTEND_ROOT_URL} from '../../config/index'

import React,{ useEffect } from "react";
import SearchResults from '../../components/basic/SearchResults';
import { fetch_catagory_search_tickets } from '../../components/help_and_support/search_query_api/fetch_catagory_tickets';
import { Avatar, Breadcrumbs, Divider, Tooltip, Typography } from '@mui/material';
import Link from 'next/link';
import Header from '../../components/basic/Header';
import { blue } from '@mui/material/colors';

import styles from './CatagoryView.module.css';

// Create a function to slugify a string
function slugify(string) {
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
       
  }

function CatagoryView({data, catagory_name}) {
  console.log("This Data:", data)
  
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

    // Create United Tickets Section

    const dataj = await fetch_catagory_search_tickets(catagory_name, slugify(e.target.value));


    setResults(dataj)

    setLoading(false)

  }


  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/help_and_support" onClick={() => {}}>
      Help & Support
    </Link>,

    <Typography key="3" color="primary" style={{ textTransform: 'capitalize' }}>
      {catagory_name}
    </Typography>,
  ];


  return (
    <div style={{marginLeft: '3rem'}}>

        <Header />
        

        <Breadcrumbs   separator="›" aria-label="breadcrumb" style={{ margin: '2% 0px 4rem 0px'}}>
            {breadcrumbs}
        </Breadcrumbs>

        <h2 style={{fontFamily: 'Changa', fontSize: '2em'}}> Search Issues related to <span style={{backgroundColor: blue[600], borderRadius: '10px',padding: '10px',color: 'white', fontFamily: 'Roboto', fontWeight: '700', fontSize: '1.1rem'}} >{catagory_name}</span> </h2>

      <div style={{position: 'relative', width: '80%'}}>

        <input onChange={handleSearch} type="search" placeholder="Why i can't access my second account after..." name="search_ticket" id="search_ticket" style={{width: '100%', padding: '0 1.4%', height: '4rem', outline: 'none', fontSize: '1.4rem', fontFamily: 'Changa', border: `2px solid #1C6DD0`,fontWeight: '400', borderRadius: '10px'}} />
        <SearchResults result={results} search_query={searchQuery} parent_loading={loading} />
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />


      <h1 style={{ width: '80vw' , display: 'inline-block', alignItems: 'center', fontSize: '2em', fontFamily: 'Changa'}}>Profile Tickets </h1>
      <Link href={{ pathname: `${FRONTEND_ROOT_URL}create/ticket`, query: { catagory: catagory_name }}}>
          <a>
            <button className={styles.create_ticket_button} style={{ width: '13vw' , height: '4rem', fontWeight: '500' , fontSize: '1.1rem', fontFamily: 'Poppins', border: 'none', borderRadius: '0', transition: '0.5s ease'}}>Create new Ticket</button>
          </a>
      </Link>
      {/* Trending Tickets related to this Catagory */}
    { (data ?? []).map((ticket, index) =>
      (<div onClick={() => window.location.href = `${FRONTEND_ROOT_URL}explore/ticket/${ticket?.id}`} key={index} className={styles.catagory_ticket} style={{marginTop: '5%', display: 'flex', justifyContent: 'space-between', height: 'clamp(150px, 17vh, 200px)', border: '2px solid #8479E1', borderRadius: '10px', width: '93vw', padding: '0% 2% 1% 2%', marginBottom: '1rem'}}>

        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '80%', fontFamily: 'Changa'}}>
          <h2>{ ticket.title }</h2>
          <div style={{display: 'flex', alignItems: 'center'}}>
          <Avatar src={ticket.author_profile_pic} style={{ marginRight: '1rem' }} />
          <h3 style={{color: '#636363'}}>{ticket.author_username}</h3>
          </div>
        </div>

        <Divider variant="middle" orientation="vertical" />

        <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', width: '5%', marginRight: '3%'}}>
          <Tooltip title="Likes">

            <svg width="40" height="40" viewBox="0 0 15 15" fill="blue" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1C7.66148 1 7.81301 1.07798 7.90687 1.20938L12.9069 8.20938C13.0157 8.36179 13.0303 8.56226 12.9446 8.72879C12.8589 8.89533 12.6873 9 12.5 9H10V11.5C10 11.7761 9.77614 12 9.5 12H5.5C5.22386 12 5 11.7761 5 11.5V9H2.5C2.31271 9 2.14112 8.89533 2.05542 8.72879C1.96972 8.56226 1.98427 8.36179 2.09314 8.20938L7.09314 1.20938C7.18699 1.07798 7.33853 1 7.5 1ZM3.4716 8H5.5C5.77614 8 6 8.22386 6 8.5V11H9V8.5C9 8.22386 9.22386 8 9.5 8H11.5284L7.5 2.36023L3.4716 8Z" fill="#5463FF" fillRule="evenodd" clipRule="evenodd"></path></svg>
          </Tooltip>

          <strong style={{fontSize: '1.2rem'}}>{ ticket.likes.length }</strong>

        </div>

      </div>)
      )}
    
    </div>
  )
}

export default CatagoryView