import { Avatar, Divider, Tooltip } from '@mui/material';
import { blue } from '@mui/material/colors';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { validate_user } from '../../components/authenticate_user'
import Layout from '../../components/basic/layout';
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../../config';
// import { Layout } from '../components/basic'
// Layout
function NoTicketsView() {

    return (
        <div style={{margin: '2% 5%', borderRadius: '10px', padding: '2rem', display: 'grid', placeItems: 'center', height: 'min(350px, 35vh)', background: 'url("/ticket_not_found_bg.svg") center', backgroundSize: "cover", color: 'whitesmoke'}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <Image src={`/ticket_not_found.png`} width="150" height="150"></Image>
            <h2 style={{marginLeft: '3rem'}}>Currently, There are no tickets to show up!</h2>

            </div>
            <h4 style={{width: 'min(500px, 50%)', fontWeight: '400'}}>If you have any issue regarding this platform, you can explore already raised tickets or raise your own ticket <Link href="/help_and_support"><a style={{color: blue[500]}}>here</a></Link></h4>
        
        </div>
    )

}

export async function getServerSideProps(context) {

    const { is_authenticated } = await validate_user(context);

    let tickets = false;

    if (is_authenticated) {

        const { access } = context.req.cookies;

        // Fetch user Tickets
        const response = await fetch(`${BACKEND_ROOT_URL}account/tickets/`, {

            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access}`,
                'Accept': 'application/json',             
            }
        }).catch(err => { console.log(err) });

        tickets = await response.json();

        console.log(tickets);

    }

    return {

        props: { 

            is_authenticated: is_authenticated,
            tickets: tickets,
         }

    }

}


function tickets({ is_authenticated, tickets }) {
    
    if (!is_authenticated) {
        return (
            <Layout isAuthenticated={false} title="My Tickets - Spade">
                <h1>You need to be logged in to view this page</h1>
            </Layout>
        )

    }

    return (
    
    <Layout isAuthenticated={true} title="My Tickets - Spade">

        <h1 style={{margin: '5% 0 1% 5%'}}>Your Tickets</h1>
        <Divider variant="middle" style={{margin: "0 5%"}} />

        {
            tickets && tickets.length > 0 ?
            tickets.map((ticket, index) =>
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
              ):NoTicketsView()
        }

    </Layout>

  )
}

export default tickets