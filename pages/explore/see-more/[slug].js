import React from 'react'

import { useRouter } from 'next/router';
import Layout from '../../../components/basic/layout';
import SeeMore from '../../../components/SeeMore';
import { BACKEND_ROOT_URL } from '../../../config';
import { get_relevant_posts_by_searchquery, init_catagorized_posts_livedata } from '../../../caching';
import { validate_user } from '../../../components/authenticate_user';

export default function Slug({data, search_query}) {


  return (
    <Layout title={`Search Results | Spade`} content="Search result see-more spade" includesPostModal>
        <SeeMore slug={search_query} data={data} />
    </Layout>
  )
  
}


export async function getServerSideProps(context) {

    const { slug } = context.query ?? context.params;

    const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/search_query/${slug}/`);

    const backend_data = await response.json();
  
    return {
  
      props: { data: backend_data,search_query: slug},
  
    }

  
  }
