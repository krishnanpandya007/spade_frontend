import React from 'react'
import { validate_user } from '../../../components/authenticate_user';
import Layout from '../../../components/basic/layout'
import DailyShare from '../../../components/DailyShare';


export default function daily_share({ is_authenticated, user_info }){

    return (

        <Layout title="Daily Share" userInfo={user_info} isAuthenticated={is_authenticated} >

            <DailyShare />

        </Layout>

    )

}


export async function getServerSideProps(context) {

    const response = await validate_user(context);

    return {

        props: { is_authenticated: response.is_authenticated,  user_info: response.user_info ?? {} }

    }
  
  }

