import React, { useEffect } from 'react';
import Head from 'next/head';
import AuthenticateUser from './authenticate_user';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import getUserInfo, { getStaffUserInfo } from './get_user_info';
import ErrorPage from 'next/error'
import { Divider } from '@mui/material';
import TemporaryDrawer from './LoginDrawer';
import authContext from './contexts/layout_auth_context';
import PostModal from './PostModal';
import PostModalContext from './contexts/post_modal_context';
import { handle_action_post } from './handle_action';
import MHeader from '../../mobile_components/Header';

// import getUserInfo from './get_user_info';

function Layout({ title, children,includesFilters,changeFilterBy, currentFilterBy,isAuthenticated, userInfo, mode, includesPostModal, PostModalData}) {

  const [user, setUser] = React.useState({is_authenticated: isAuthenticated});

  const [isOnMobile, setIsOnMobile] = React.useState(false);

  const [drawer, setDrawer] = React.useState({ open_drawer: false, drawer_title: "Let&apos;s Connect !" })

  const [userData, setUserData] = React.useState(userInfo ?? { username: null, profile_pic: null, first_name: null, last_name: null });

  // if(includesFilters){

    const [postModalData, setPostModalData] = React.useState({

      open: false,
      post_id: null,
      title: null,
      author: "Loading ...",
      profile_pic: null,
      descr: "",
      images: [], // [A, B, X, Y]
      tags: [],
      comments: null,
      likes_count: 0, 
      dislikes_count: 0, 
      is_liked: false,
      is_disliked: false,
      is_bookmarked: false,
      len_tags: 0,
      create_mode: false,
      // controller: {

      // },
      
  });

  // }

  const set_open = (to_state) => {

    console.log("called...")

    setPostModalData({...postModalData, open: to_state})

  }

  const set_likes = (new_likes_count, new_is_liked) => {

    setPostModalData({...postModalData, likes_count: new_likes_count, is_liked: new_is_liked})

  }

  const set_dislikes = (new_dislikes_count, new_is_disliked) => {

    setPostModalData({...postModalData, dislikes_count: new_dislikes_count, is_disliked: new_is_disliked})

  }

  const set_data = (new_data) => {
    setPostModalData(new_data);

  }

  const set_comments = (new_comments) => {

    setPostModalData({...postModalData, comments: new_comments})

  }

  const like = async () => {

    let action = "";
    let choice = "like";

    if(!postModalData.is_liked){
      action = "add";
    }else{
      action = "remove";
    }
    if(postModalData.is_disliked){
      action += " remove"
      choice += " dislike"
    }

    const result = await handle_action_post(userData.username, postModalData.post_id, choice, action);
      
    if(!result){
      alert("Something went wrong!")
      return;
    }

    if(!postModalData.is_liked){
      set_likes(postModalData.likes_count + 1, true)
    }else{
      set_likes(postModalData.likes_count - 1, false)

    }
    if(postModalData.is_disliked){
      set_dislikes(postModalData.dislikes_count - 1, false)
    }


  }



// Order of data in API-call ex. send remove first and add afterwards




  const dislike = async () => {

    let action = "";
    let choice = "dislike";

    if(!postModalData.is_disliked){
      action = "add";
    }else{
      action = "remove";
    }
    if(postModalData.is_liked){
      action += " remove"
      choice += " like"
    }

    const result = await handle_action_post(userData.username, postModalData.post_id, choice, action);
      
    if(!result){
      alert("Something went wrong!")
      return;
    }
    // Update UI

    if(!postModalData.is_disliked){
      set_dislikes(postModalData.dislikes_count + 1, true)
    }else{
      set_dislikes(postModalData.dislikes_count - 1, false)
    }
    if(postModalData.is_liked){
      set_likes(postModalData.likes_count - 1, false)
    }


  }


  const authenticate = () => {

    setDrawer({ open_drawer: false })
    setUser({is_authenticated: true});
  }

  const de_authenticate = () => {
    setDrawer({ open_drawer: false })

    setUser({ is_authenticated: false});

  }

  const set_open_drawer = (value, title=null) => {

    if (value) {

      setDrawer({ open_drawer: value, drawer_title: title ??  "Let's Connect !" })
    } else {
      
      setDrawer({ open_drawer: value })

    }



  }

  const set_user_data = (username_, profile_pic_, first_name_, last_name_) => {

    console.log("Called", username_, profile_pic_, first_name_, last_name_)
    // setUser({ is_authenticated: user.is_authenticated, user_data: { username: username_, profile_pic: profile_pic_, first_name: first_name_, last_name: last_name_ }});
    setUserData({ username: username_, profile_pic: profile_pic_, first_name: first_name_, last_name: last_name_ });
  }
  // if(typeof window !== 'undefined'){
    // const isOnMobile2 = React.useMemo(() => {
    //   return window.innerWidth < 1200
    // }, [window ? window.innerWidth : null])

  // }

  // if(window ? window.innerWidth < 1200 : false){
  //   setIsOnMobile(true);
  // }

    

    useEffect(() => {

      if(typeof window !== 'undefined'){

        function handleResize() {
          if(window.innerWidth < 1200){

            setIsOnMobile(true);

          }else{
            setIsOnMobile(false)
          }
        }

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }


    }, [])


  return (
    
    <>
    <Head>
        <title>{title}</title>
        
    </Head>

    <authContext.Provider value={{is_authenticated: user.is_authenticated, is_on_mobile: isOnMobile,drawer_title: drawer.drawer_title,open_drawer: drawer.open_drawer, set_open_drawer: set_open_drawer,authenticate: authenticate, de_authenticate: de_authenticate, user_data: userData, set_user_data: set_user_data}}>
    <Header isMobile={isOnMobile} currentFilterBy={currentFilterBy} user_data={userData} includesFilters={includesFilters} changeFilterBy={changeFilterBy} mode={mode}/>
    {/* <Header currentFilterBy={currentFilterBy} user_data={userData} includesFilters={includesFilters} changeFilterBy={changeFilterBy} mode={mode}/> */}
    {/* <Divider /> */}
      {includesPostModal ? 
          <PostModalContext.Provider value={{...postModalData,set_open: set_open, like: like, dislike: dislike, set_likes: set_likes, set_dislikes: set_dislikes, set_comments: set_comments, set_data: set_data}}>
            <PostModal />
            {children}
          </PostModalContext.Provider>:  
        children} 
            {/* {children} */}


      {/* { children } */}
    
      <Footer username={userData.username}/>
    </authContext.Provider>



    </>

  )
  
}

Layout.defaultProps = {
    userMustAuthenticated: false,
    mode: null
}

export default Layout;
