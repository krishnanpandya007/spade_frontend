import { createContext } from 'react'

const authContext = createContext({

    is_authenticated: false,
    drawer_title: "Let&apos;s Connect !",
    open_drawer :false, // Only triggered by external sources (href) & (Protectted Buttons) 
    user_data: {
        username: null,
        profile_pic: null,
        first_name: null,   
        last_name: null
    },
    authenticate: ()=> {},
    de_authenticate: () => {},
    set_user_data: (username, profile_pic, first_name, last_name)=>{},
    set_open_drawer: (value,title=null) => {}
})

export default authContext;