import React from 'react'
import { get_posts_by_author } from '../../caching';
import { validate_user } from '../../components/authenticate_user';
import ProfileView from '../../components/ProfileView';
import { BACKEND_ROOT_URL } from '../../config';
import Layout from '../../components/basic/layout'

function viewProfile({data, user_data, post_data, profile_view_username}) {

  return (
      
    <Layout title="Profile | Spade" content="profile view for an account on spade" userInfo={user_data.user_info} isAuthenticated={user_data.is_authenticated} >


        <ProfileView data={data} userData={user_data} postData={post_data} profileViewUsername={profile_view_username}  />

    </Layout>
  )
}


export async function getServerSideProps(context) {
    const { username } = context.query;
    console.log("Rerunning...: ",username)

    const response = await validate_user(context);


    // try{
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
        const profile_data = await res.json();
        // console.log("Data: ", data)
        // return { props: { data } };
    // } catch (err) {
    //     console.log(err)
    //     // return {props: {}}
    // }



    const response_data = await get_posts_by_author( username );

    console.log("Data", response_data)

    return {

        props: {data: profile_data,  profile_view_username: username,post_data:response_data, user_data: response}

    }
  
  }


export default viewProfile;