import { Breadcrumbs, Link, Typography } from '@mui/material';
import React from 'react'
import Header from '../../../components/basic/Header';
import TicketDetailedView from '../../../components/help_and_support/TicketDetailedView';
import { BACKEND_ROOT_URL } from '../../../config';
import { validate_user } from "../../../components/authenticate_user";


function Ticket({ data, user_is_author, is_authenticated, user_profilepic, username }) {

    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/help_and_support" onClick={() => {}}>
            Help & Support
        </Link>,

        <Typography key="2" color="primary" style={{ textTransform: 'capitalize' }}>
            View Ticket
        </Typography>
        ];


  return (
    <div>
        
        <Header />

        <Breadcrumbs   separator="›" aria-label="breadcrumb" style={{ margin: '2% 0px 4rem 3rem'}}>
            {breadcrumbs}
        </Breadcrumbs>

        <TicketDetailedView data={data} userIsAuthor={user_is_author} isAuthenticated={is_authenticated} userProfilePic={user_profilepic} username={username} />


    </div>
  )
}

export async function getServerSideProps(context) {

    // Try to authenticate user -> {is_authenticated, user_is_author} 
    const authentication_response = await validate_user(context);

    let username = null, profile_pic = null;;

    if(authentication_response.is_authenticated){

        console.log("User is authenticated")

        const { user_info } = authentication_response;
        username = user_info?.username;
        profile_pic = user_info?.profile_pic;


    }



    const ticket_id = context.query.ticketid;

    // Fetching Specific ticket data from backend
    const response = await fetch(`${BACKEND_ROOT_URL}help_and_support/ticket/${ticket_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
    }).catch((err) => {console.log(err)});

    const data = await response.json();

    return {

        props: { data: data, user_is_author: username === data.author_username, is_authenticated: authentication_response.is_authenticated, user_profilepic:  profile_pic, username: username} // EditMode true if author is current page user => has credits to edit

    }


}

export default Ticket