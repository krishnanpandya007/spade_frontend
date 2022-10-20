// import React from 'react'
import {BACKEND_ROOT_URL} from '../../../config/index'

import React from "react";
import CatagoryView from '../../../components/help_and_support/CatagoryView';




export async function getStaticProps(context) {

  const { catagory_name } = context.params

  // Need Top n Tickets

  const response = await fetch(`${BACKEND_ROOT_URL}help_and_support/get_catagory_tickets/${catagory_name}`);

  const data = await response.json();

  return {

    props: {

      data: data,
      catagory_name: catagory_name

    },

    revalidate: 5 * 60 * 60 // Revalidate the page every 5 hours

  }

}



export function getStaticPaths() {

  return {
    paths: [
      { params: { catagory_name: 'Profile' } },
      { params: { catagory_name: 'Bugs-and-glitch' } },
      { params: { catagory_name: 'My-app' } },
      { params: { catagory_name: 'Posts' } },
      { params: { catagory_name: 'Other' } }


    ],
    fallback: false
  }


}


function CatagoryName({ data, catagory_name }) {

  return (
    <CatagoryView data={data} catagory_name={catagory_name} />
  )

}

export default CatagoryName