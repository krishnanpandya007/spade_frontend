import React from 'react'
import { get_posts_by_author } from '../../caching';
import { validate_user } from '../../components/authenticate_user';
import ProfileView from '../../components/ProfileView';
import { BACKEND_ROOT_URL } from '../../config';

function viewProfile({data, user_data}) {

  return (
      
        <ProfileView data={data} userData={user_data}  />

  )
}


export async function getServerSideProps(context) {
    const { username } = context.query;
    console.log("Rerunning...: ",username)

    const response = await validate_user(context);


    try{
        const res = await fetch(`${BACKEND_ROOT_URL}account/load_profile/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username
            })
        }).catch((err) => {console.log(err)});
        const data = await res.json();
        // console.log("Data: ", data)
        // return { props: { data } };
    } catch (err) {
        console.log(err)
        // return {props: {}}
    }



    const response_data = await get_posts_by_author( username );

    console.log("Data", response_data)

    return {

        props: {data: response_data, user_data: response}

    }
  
  }


export default viewProfile;