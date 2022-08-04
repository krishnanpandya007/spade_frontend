import React from 'react'

import { useRouter } from 'next/router';
import Layout from '../../../components/basic/layout';
import SeeMore from '../../../components/SeeMore';
import { BACKEND_ROOT_URL } from '../../../config';
import { get_relevant_posts_by_searchquery } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';

export default function Slug({data, search_query, is_authenticated, user_info}) {


  return (
    <Layout title={`Search Results | Spade`} content="Search result see-more spade" includesPostModal userInfo={user_info} isAuthenticated={is_authenticated} >
        <SeeMore slug={search_query} data={data} />
    </Layout>
  )
  
}


export async function getServerSideProps(context) {
    // const { slug } = context.query;
    // console.log("Rerunning...: ",slug)


    // const res = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/search_query/${slug}/`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).catch((err) => {console.log(err)});
    // const data = await res.json();
    // return { props: { data } };

    const { slug } = context.query;

    const response = await validate_user(context);


    const response_data = await get_relevant_posts_by_searchquery( slug );

    return {

      props: { data: response_data, search_query: slug, is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null }

    }

  
  }
