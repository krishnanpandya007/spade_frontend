
import { Grid } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react"
import { useContext } from "react";
import { init_catagorized_posts_livedata } from "../caching";
import authContext from "../components/basic/contexts/layout_auth_context";

import Layout from "../components/basic/layout";
import Feed from "../components/feed/Feed";
import HomeInfo from "../components/HomeInfo";
import { BACKEND_ROOT_URL, CATAGORIES, DEFAULT_CATAGORY, FRONTEND_ROOT_URL } from "../config";
import Link from 'next/link'
import TodayOverview from "../components/basic/TodayOverview";
import Sidebar from "../components/Sidebar";

/*

POST - ${FRONTEND_ROOT_URL}api/get_posts_by_catagory {filter: } ==

*/


function Home({data}) {

    const auth = useContext(authContext)

    console.log("Home data", data)

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>

            <div style={{ width: '1500px', display: 'flex', flexDirection: 'row-reverse', padding: '2rem 1rem'}} justifyContent="space-between" >


                <motion.div animate={!(auth.is_on_mobile) && {width: ['75%', '55%']}} transition={{ease: 'easeInOut', duration: 0.7}}  style={{width: auth.is_on_mobile ? '100%' : '55%', paddingLeft: 'auto' , paddingRight :'auto'}} >

                    <Feed spack_groups={CATAGORIES.map((catagory_i, idx) => ({group_name: catagory_i, spacks: data[idx] ? data[idx][catagory_i] : null}))} />

                </motion.div>

                {  !(auth.is_on_mobile) && 
                <motion.div animate={{width: ['0%', '30%'], marginRight: ['0%', '15%']}} style={{padding: '1rem'}} >
                    <Sidebar />
                </motion.div>}
                {/* Future Sidebar */}

            </div>
        </div>

    )


}



export async function getStaticProps(context) {

    /*
    
    
    Tell backend not to send Comments and Likes,Dislikes just send content, tags, etc...

    Now A cache with ${catagory} key holds some live data like comments, dislikes, likes etc...

    it can be easily revalidated because its memcache so we dont force to build whole UI all the time for this chunks
    
    */
    
    
    const response = await fetch(`${BACKEND_ROOT_URL}apio/load_posts/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(
            CATAGORIES.map((catagory_i) => (
                {load_more_counter: 0, catagory: DEFAULT_CATAGORY, groupex: `tag:${catagory_i}`, is_indepeth_view: true}
            ))
        )
    });
    
    const backend_data = await response.json();

    if(response.status === 200) {
        backend_data.map((posts) => {
            if(posts){

                try{
        
                    
                    init_catagorized_posts_livedata(`posts_live_data/${DEFAULT_CATAGORY}/${Object.keys(posts)[0]}`, Object.values(posts)[0]);
                    Object.values(posts)[0].map((post) => {
        
                        delete post.likes
                        delete post.dislikes
                        delete post.bookmarks
                        
                    })
        
                } catch {/* ANY DATA_LOSS ERROR CAUSES TO PASS/CONTINUE */}
            }else{
            }
        })

    }

    return {

        props: {data: backend_data},
        revalidate: (2 * 60 * 60),        
    }


}

export default Home;
