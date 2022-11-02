import { useState } from 'react';
import { FRONTEND_ROOT_URL } from '../../../config';
import PaginatorModal from '../PaginatorModal';
import Comment from './Comment'


function CommentBody({comments, username}) {

    const [anchorEl, setAnchorEl] = useState(null);

    const likes_user_fetcher = async (needed_page_no) => {
        const response = await fetch(`${FRONTEND_ROOT_URL}api/get_paginated_data/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                model: 'comment',
                model_id: anchorEl.getAttribute('data-commentid'),
                field: anchorEl.getAttribute('data-action'),
                needed_page: needed_page_no
            })
        })

        const dataj = await response.json();


        if(response.status !== 200){
            return {error: true, has_next:false, data: []}
        }

        return {error: false, has_next: dataj.has_next, data: dataj.data}

    }

    const paginator_item_click_handler = (username) => {
        window.location.href = `${FRONTEND_ROOT_URL}view_profile/${username}`
    }

    return (
        <div>

            {

            Boolean(anchorEl) && <PaginatorModal title={"Comment Likes"} open={Boolean(anchorEl)} action_cb={paginator_item_click_handler} fetcher={likes_user_fetcher} anchorEl={anchorEl} handleClose={() => {setAnchorEl(null)}} />
            }
            {comments?
                comments.map((val, index) => (
                    <Comment val={val} key={index} is_liked={val.likes.includes(username)} c_id={val.id} setAnchorEl={setAnchorEl} username={username} />
                )):
                <h4 style={{fontFamily: 'Chivo', fontStyle: 'italic', color: '#b9b9b9'}}>Loading Comments...</h4>
            }
        </div>
    )
}

export default CommentBody
