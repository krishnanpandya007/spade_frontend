import { BACKEND_ROOT_URL } from "../../../config";

import cache from "memory-cache"
import cookie from 'cookie'
import authenticate from "../authenticate";

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const {

            comment_id,
            action

        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({

            comment_id,
            action
            
        })



            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/comment/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})

            const dataj = await apiResponse.json()

            if (apiResponse.status === 200){
                // Account Created Successfully

                cache.keys().forEach((key_url) => {
                    // For Each Catagory
                    let cacheResponse = cache.get(key_url) || [];

                    if(cacheResponse){

                        Object(cacheResponse).keys().map((val, idx) => {

                            if (val === dataj.parent_post_id) {

                                cacheResponse[val].comments.push(dataj.new_comment_serializer_data)

                            }

                        })
                        
                    }
                    
                })

                return res.status(200).json({success: 'Action Updated'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update action'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}