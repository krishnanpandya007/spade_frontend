import { createContext } from "react";

const PostModalContext = createContext({

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
        open: false,
    // },

        set_open: (to) => {},
        like: (action) => {},
        dislike: (action) => {},
        edit_comments: (new_comments) => {},

        set_likes: (new_likes_count, new_is_liked) => {},
        set_dislikes: (new_dislikes_count, new_is_disliked) => {},
        set_data: (new_data) => {}

    // },


})

export default PostModalContext