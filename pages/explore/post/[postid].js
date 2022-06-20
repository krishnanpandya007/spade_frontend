import { useRouter } from 'next/router';
import React from 'react'
import { get_relevant_posts_by_postid } from '../../../caching';
import Layout from '../../../components/basic/layout';
import ExploreByTagName from '../../../components/ExploreByTagName';
import ExploreExactPostView from '../../../components/ExploreExactPostView';
import ProfileView from '../../../components/ProfileView';
import { BACKEND_ROOT_URL } from '../../../config';

function PostByTag({data, target_post_title}) {

  return (

    <Layout title={`${target_post_title} | Spade`} content={`${target_post_title} by spade`}>
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

    const response_data = await get_relevant_posts_by_postid( postid );

    return {

      props: { data: response_data, target_post_title: response_data[0]?.title }

    }

  
  }


export default PostByTag;