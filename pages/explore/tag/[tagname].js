import { useRouter } from 'next/router';
import React from 'react'
import { get_posts_by_tagname } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';
import Layout from '../../../components/basic/layout';
import ExploreByTagName from '../../../components/ExploreByTagName';
import ProfileView from '../../../components/ProfileView';
import { BACKEND_ROOT_URL } from '../../../config';

function PostByTag({data, tag_name, is_authenticated, user_info}) {

  return (

    <Layout title={`${tag_name} - Tag Search | Spade`} isAuthenticated={is_authenticated} userInfo={user_info} includesPostModal >
        <ExploreByTagName data={data} tagname={tag_name} />
    </Layout>

  )
}


export async function getServerSideProps(context) {
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

    const { tagname } = context.query;

    const response = await validate_user(context);


    const response_data = await get_posts_by_tagname( tagname );

    return {

      props: { data: response_data, tag_name: tagname, is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null  }

    }

  
  }


export default PostByTag;