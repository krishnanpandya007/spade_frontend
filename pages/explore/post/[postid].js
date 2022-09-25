import React from 'react'
import { get_relevant_posts_by_postid } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';
import Layout from '../../../components/basic/layout';
import ExploreExactPostView from '../../../components/ExploreExactPostView';

function PostByTag({data, target_post_title, is_authenticated, user_info}) {

  return (

    <Layout title={`${target_post_title} | Spade`} includesPostModal content={`${target_post_title} by spade`} isAuthenticated={is_authenticated} userInfo={user_info}>
        <ExploreExactPostView data={data} />
    </Layout>

  )
}


export async function getServerSideProps(context) {
    // const { postid } = context.query;
    // console.log("Rerunning...: ",postid)

    // const data = await 


    // const res = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/post_id/${postid}/`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).catch((err) => {console.log(err)});
    // const data = await res.json();
    // return { props: { data } };

    const { postid } = context.query;

    const response = await validate_user(context);

    console.log(response);


    const response_data = await get_relevant_posts_by_postid( postid );

    return {

      props: { data: response_data, target_post_title: response_data[0]?.title, is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null }

    }

  
  }


export default PostByTag;