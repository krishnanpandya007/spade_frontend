
import { Grid, Snackbar } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react"
import { useContext } from "react";
import { init_catagorized_posts_livedata } from "../caching";
import authContext from "../components/basic/contexts/layout_auth_context";

import Layout from "../components/basic/layout";
import Feed from "../components/feed/Feed";
import HomeInfo from "../components/HomeInfo";
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../config";
import Link from 'next/link'

function Home({data, is_authenticated, user_info}) {

    const animation_controller = useAnimation();

    const [filterBy, setFilterBy] = React.useState('trending');
    const [currentData, setCurrentData] = React.useState(data);


    const [ openSnackbar, setOpenSnackbar ] = React.useState(false);

    // const [isLoading, setIsLoading] = React.useState(false);

    // useEffect(() => {
    //     window.onload = () => {

    useEffect(() => {
        let timer_id = setTimeout(() => {
            
            // snackbar.open("simple", "Check out PPL's interesting Daily Share(s)", true, () => {window.location.href = `${FRONTEND_ROOT_URL}explore/daily_share`})

            setOpenSnackbar(true)

        }, 5000)

        return () => {

            clearTimeout(timer_id)

        }

    }, [])

    //     }
    // })

    const changeFilterBy = async (filter) => {

        setFilterBy(filter);

        const res = await fetch(`${FRONTEND_ROOT_URL}api/get_posts_by_catagory`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter
            })
        })

        const dataj = await res.json();

        animation_controller.start({y: [0, window.innerHeight/2,0, 0], opacity: [1, 0, 0, 1], scale: [1, 1, 1.1, 1] })


        if(dataj) {
            // data = dataj
            setTimeout(() => {
                
                setCurrentData(dataj)

            }, 500)
        }

    }

    const action = (
        <React.Fragment>
            <Link href={`/explore/daily_share`} style={{ backgroundColor: '#516BEB' }}>
                <a href={`/explore/daily_share`} style={{ background: 'linear-gradient(135deg, #516BEB, #90A1F2, #516BEB)', fontWeight: '600', fontFamily: 'Poppins', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                    Take A Tour
                </a>
            </Link>
            {/* <Button color="secondary"  onClick={() => {window.location.href = `${FRONTEND_ROOT_URL}explore/daily_share`}} >Take A view</Button> */}

        </React.Fragment>
      );

// Call logout to logout the user!
    return (



    <Layout currentFilterBy={filterBy} mode={"home"} title="Spade" content="home page of spade" includesFilters includesPostModal isAuthenticated={is_authenticated} changeFilterBy={changeFilterBy} userInfo={user_info}>
             {/* <Grid container spacing={3}> */}
            <Snackbar  anchorOrigin={{horizontal: 'center', vertical: 'bottom'}} onClose={() => setOpenSnackbar(false)} open={openSnackbar} message="Explore Daily Share(s) everyone shared!" action={action} />


            <ThinWrapper animation_controller={animation_controller} currentData={currentData} filterBy={filterBy} setCurrentData={setCurrentData} is_authenticated={is_authenticated} user_info={user_info} />
             {/* <Grid item xs={4} justifyContent="center" alignItems="center">
                    <HomeInfo />
                    </Grid>
                </Grid> */}
      </Layout>



    )

}

function ThinWrapper({animation_controller, currentData, filterBy, setCurrentData, is_authenticated, user_info}) {

    // useEffect(() => {



    // }, [action])

    const auth = useContext(authContext);

    return (
        <>

    {auth.is_authenticated && <TodayOverview />}
        
    {auth.is_on_mobile ?
        <div style={{width: '100vw'}}>
            <motion.div style={{width: '100vw'}} animate={animation_controller} transition={{duration: 1, x: { type: "spring", stiffness: 100 }}}>
                <Feed data={currentData} filter_by={filterBy} setData={setCurrentData} is_authenticated={is_authenticated} userInfo={user_info} />

            </motion.div>
        {/* <center><LoadingButton loading={isLoading} onClick={() => {setIsLoading(currState => !currState)}} variant="outlined" size="small">Load More</LoadingButton></center>   */}
        </div>
    :
        <Grid container spacing={0}>                    

            <div style={{width: '65vw'}}>
                <motion.div style={{width: '65vw'}} animate={animation_controller} transition={{duration: 1, x: { type: "spring", stiffness: 100 }}}>
                    <Feed data={currentData} filter_by={filterBy} setData={setCurrentData} is_authenticated={is_authenticated} userInfo={user_info} />

                </motion.div>
            {/* <center><LoadingButton loading={isLoading} onClick={() => {setIsLoading(currState => !currState)}} variant="outlined" size="small">Load More</LoadingButton></center>   */}
            </div>
            <Grid item xs={4} justifyContent="center" alignItems="center">
        
                <HomeInfo authInstance={auth} />
            </Grid>
        </Grid>}
                

        </>

    )

}

export async function getStaticProps(context) {

    /*
    
    
    Tell backend not to send Comments and Likes,Dislikes just send content, tags, etc...

    Now A cache with ${catagory} key holds some love data like comments, dislikes, likes etc...

    it can be easily revalidated because its memcache so we dont force to build whole UI all the time for this chunks
    
    
    
    
    */
    
    
    const response = await fetch(`${BACKEND_ROOT_URL}apio/load_posts/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            quantity: 5,
            catagory: "trending"
        })
    });
    
    const backend_data = await response.json();

    if(response.status === 200) {


        init_catagorized_posts_livedata("posts_live_data/trending", backend_data);

        try{

            backend_data.map((post) => {

                delete post.comments
                delete post.likes
                delete post.dislikes

            })

        } catch {}

    }

    return {

        props: {data: backend_data},
        revalidate: (2 * 60 * 60),        
    }


}

export default Home;
