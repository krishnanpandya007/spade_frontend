import React from 'react';
import { validate_user } from '../../components/authenticate_user';
import getUserInfo from '../../components/basic/get_user_info';
import Layout from '../../components/basic/layout';
import EditProfile from '../../components/EditProfile';
import { FRONTEND_ROOT_URL } from '../../config';

export default function Profile({user_info, is_authenticated}) {

  return (
    // Below Component (EditProfile) inherits Layout itself
    <Layout mode={"settings"} isAuthenticated={is_authenticated} userInfo={user_info} title="Edit Profile - Spade">

      <EditProfile userInfo={user_info} isAuthenticated={is_authenticated}/>    
    </Layout>
  )
}

export async function getServerSideProps(context){

  const response = await validate_user(context);

  if(!response.is_authenticated){
    return {
      redirect: {
        destination: `${FRONTEND_ROOT_URL}create/profile`,
        permanent: false
      }
    }
  }

  return {
    props: {is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null}
  }

}