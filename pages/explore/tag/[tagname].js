import { useRouter } from 'next/router';
import React from 'react'
import { get_posts_by_tagname, init_catagorized_posts_livedata } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';
import Layout from '../../../components/basic/layout';
import ExploreByTagName from '../../../components/ExploreByTagName';
import ProfileView from '../../../components/ProfileView';
import { BACKEND_ROOT_URL } from '../../../config';

function PostByTag({data, tag_name}) {

  return (

    <Layout title={`${tag_name} - Tag Search | Spade`} includesPostModal >
        <ExploreByTagName data={data} tagname={tag_name} />
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
    // const { tagname } = context.query;
    // console.log("Rerunning...: ",tagname)


    // const res = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/tag/${tagname}/`, {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json'
    //     }
    // }).catch((err) => {console.log(err)});
    // const data = await res.json();
    // return { props: { data } };

    const { tagname } = context.query ?? context.params;


    const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/tag/${tagname}/`);

    const backend_data = await response.json();

    if(response.status === 200) {
  
  
      init_catagorized_posts_livedata(`posts_live_data/tag@${tagname}`, backend_data, 1); // hold for 1 hour
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
  
      props: { data: backend_data,tag_name: tagname},
      revalidate: (1 * 60 * 60),
  
    }

  
  }


export default PostByTag;