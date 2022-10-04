// import { Favorite, FavoriteBorderOutlined } from '@material-ui/icons';

import { Favorite, FavoriteBorderOutlined } from '@mui/icons-material';
import { Avatar, Divider, IconButton } from '@mui/material';
import { pink } from '@mui/material/colors';
import React, { useEffect } from 'react'
import { handle_action_comment } from '../handle_action';

export default function Comment({is_liked, val, username}) {

    const [isLiked, setIsLiked] = React.useState(is_liked);
    const [likeCount, setLikeCount] = React.useState(val.likes.length);

    

    // useEffect(() => {

    //     setLikeCount(val.likes.length) // reset to get valid offset

        // if(isLiked){
        //     setLikeCount(likeCount - 1);
        // }else if(!isLiked){
        //     setLikeCount(likeCount + 1)
        // }

    // }, [isLiked])

    const handlePostLike = async () => {


            const success = await handle_action_comment(username, isLiked ? "remove" : "add", val.id)



        if (success) {

            if(isLiked){
                setLikeCount(likeCount - 1);
            }else{
                setLikeCount(likeCount + 1)
            }
            
            setIsLiked(!isLiked);
        }else{
            console.error("can't add your action to this comment");
        }
        

    }






// Why so utaval to like every comment BC








  return (
    <>
        <div style={{width: '100%', display: 'flex'}}>
            <div style={{flex: 1, paddingTop: '2ch', paddingLeft: '3ch', display: 'flex', justifyContent: 'space-around', flexDirection: 'column'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                <Avatar src={val.author_profilepic} style={{width: '45px', height: '45px'}} color="primary">{val.author_username ? val.author_username[0].toUpperCase() : null}</Avatar>
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center'}}>

                    <IconButton onClick={handlePostLike} >
                        
                        { isLiked ? <Favorite style={{color: pink[500]}} />
                        // If username in comments.likes show favourute
                        : <FavoriteBorderOutlined /> }
                    </IconButton>
                    {likeCount}
                </div>
            </div>
            <div style={{flex: 14, paddingLeft: '3%'}}>
                <h3 style={{display: 'inline-block', justifyContent: 'baseline', marginTop: '45px'}}>{val.author_username} </h3><h4 style={{color: "grey", display: 'inline-block'}}> &nbsp; ({val.time_since})</h4>
                <h4>{val.descr}</h4>
            </div>
        </div>
        <Divider variant="middle" />
    </>
  )
}
