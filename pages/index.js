// import { Divider, Grid } from "@material-ui/core";

import { LoadingButton } from "@mui/lab";
import { Button, Grid } from "@mui/material";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react"
import { get_posts_by_catagory } from "../caching";
import { validate_user } from "../components/authenticate_user";
import Layout from "../components/basic/layout";
import TemporaryDrawer from "../components/basic/LoginDrawer";
import Feed from "../components/feed/Feed";
import HomeInfo from "../components/HomeInfo";

function Home({data, is_authenticated, user_info}) {

    const animation_controller = useAnimation();

    const [filterBy, setFilterBy] = React.useState('trending');
    const [currentData, setCurrentData] = React.useState(data);

    // const [isLoading, setIsLoading] = React.useState(false);

    const changeFilterBy = async (filter) => {

        setFilterBy(filter);

        const dataj = await get_posts_by_catagory(filter);

        console.log(dataj)

        animation_controller.start({y: [0, window.innerHeight/2,0, 0], opacity: [1, 0, 0, 1], scale: [1, 1, 1.1, 1] })


        if(dataj) {
            // data = dataj
            setTimeout(() => {
                
                setCurrentData(dataj)

            }, 500)
        }

    }

// Call logout to logout the user!
    return (



    <Layout mode={"home"} title="Home | Spade" content="home page of spade" includesFilters includesPostModal isAuthenticated={is_authenticated} changeFilterBy={changeFilterBy} userInfo={user_info}>
             <Grid container spacing={3}>
            <Grid item xs={8} justifyContent="center" alignItems="center">
                <motion.div  animate={animation_controller} transition={{duration: 1, x: { type: "spring", stiffness: 100 }}}>
                    <Feed data={currentData} filter_by={filterBy} setData={setCurrentData} is_authenticated={is_authenticated} userInfo={user_info} />

                </motion.div>

                {/* <center><LoadingButton loading={isLoading} onClick={() => {setIsLoading(currState => !currState)}} variant="outlined" size="small">Load More</LoadingButton></center>   */}
             </Grid>
             <Grid item xs={4} justifyContent="center" alignItems="center">
                    
                    <HomeInfo />
            </Grid>
             </Grid>
      </Layout>



    )

}

export async function getServerSideProps(context) {

    
    
    const response = await validate_user(context);
    
    console.log("HAIBABA: ", response.user_info, response.is_authenticated)
    
    const backend_data = await get_posts_by_catagory('trending');
    
    context.res.setHeader('Cache-Control', 'private, maxage=130000, stale-while-revalidate, must-revalidate')
    
    // Cache to client side as well

    // console.log(backend_data)


    return {
        props: {data: backend_data, is_authenticated: response.is_authenticated ,user_info: response.is_authenticated ? response.user_info : null}
    }


}

export default Home;