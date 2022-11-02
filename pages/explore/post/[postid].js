import React from 'react'
import { get_relevant_posts_by_postid, init_catagorized_posts_livedata } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';
import Layout from '../../../components/basic/layout';
import ExploreExactPostView from '../../../components/ExploreExactPostView';
import { BACKEND_ROOT_URL } from '../../../config';

function PostByTag({data, target_post_title, post_id}) {

  return (

    <Layout title={`${target_post_title} | Spade`} includesPostModal content={`${target_post_title} by spade`}>
        <ExploreExactPostView data={data} post_id={post_id} />
    </Layout>

  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking', // can also be true or 'blocking'
  }
}

export async function getStaticProps(context) {
  console.log(context)
  const { postid } = context.query ?? context.params;
    
  const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/post_id/${postid}/`);
  
  const backend_data = await response.json();

  if(response.status === 200) {


    init_catagorized_posts_livedata(`posts_live_data/specific_${postid}`, backend_data, 1); // hold for 1 hour
    // cached for 2 hours
    try{

        backend_data.map((post) => {

            delete post.comments
            delete post.likes
            delete post.dislikes

        })

    } catch {}

  }

  return {

    props: { data: backend_data, target_post_title: backend_data[0]?.title, post_id: postid},
    revalidate: (1 * 60 * 60),

  }

  
  }


export default PostByTag;