
import { Grid, Snackbar } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react"
import { useContext } from "react";
import { init_catagorized_posts_livedata } from "../caching";
import authContext from "../components/basic/contexts/layout_auth_context";

import Layout from "../components/basic/layout";
import Feed from "../components/feed/Feed";
import HomeInfo from "../components/HomeInfo";
import { BACKEND_ROOT_URL, DEFAULT_CATAGORY, FRONTEND_ROOT_URL } from "../config";
import Link from 'next/link'
import TodayOverview from "../components/basic/TodayOverview";

/*

POST - ${FRONTEND_ROOT_URL}api/get_posts_by_catagory {filter: } ==

*/

const catagories = ['gaming', 'coding', 'tips', 'bunch-hacks', 'cheats'];

function Home({data}) {
    console.log(typeof catagories.map((catagory_i, idx) => ({catagory: catagory_i, spacks: data[idx]})))

    return (

        <Grid container style={{width: '1500px', marginLeft: 'auto', marginRight: 'auto', padding: '2rem 1rem'}}>

            <Grid item style={{marginLeft: 'auto', marginRight: 'auto'}}>

                <Feed spack_groups={catagories.map((catagory_i, idx) => ({group_name: catagory_i, spacks: data[idx]}))} />

            </Grid>

            {/* Future Sidebar */}

        </Grid>

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
            catagories.map((catagory_i) => (
                {load_more_counter: 0, catagory: DEFAULT_CATAGORY, groupex: `tag:${catagory_i}`}
            ))
        )
    });
    
    const backend_data = await response.json();
    console.log("BACKEND_DATA:", backend_data)

    if(response.status === 200) {
        let i = 0;
        for(const posts of backend_data){
            i++;
            try{
    
                posts.map((post) => {
    
                    delete post.comments
                    delete post.likes
                    delete post.dislikes
                    
                })

                init_catagorized_posts_livedata(`posts_live_data/${DEFAULT_CATAGORY}/${catagories[i]}`, posts);
    
            } catch {/* ANY DATA_LOSS ERROR CAUSES TO PASS/CONTINUE */}
        }

    }

    return {

        props: {data: backend_data},
        revalidate: (2 * 60 * 60),        
    }


}

export default Home;
