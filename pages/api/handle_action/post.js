import { BACKEND_ROOT_URL } from "../../../config";


import cookie from 'cookie'
import authenticate from "../authenticate";
import cache from "memory-cache";

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const {
            post_id,
            choice,
            action
        } = req.body;



        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            post_id,
            choice,
            action
        })


            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})

            const dataj = await apiResponse.json()

            if (apiResponse.status === 201){

                // Revalidate cache
                
                cache.keys().forEach((key_url) => {
                    // For Each Catagory

                    console.log("KEY__url", key_url)
                    let cacheResponse = cache.get(key_url) || [];

                    if(cacheResponse){

                        Object(cacheResponse).keys().map((val, idx) => {
                            //val = id of live post data
                            if (val === post_id) {

                                choice.split(" ").map((choice, idx) => {

                                    if (choice === 'like') {

                                        if(action.split(" ")[idx] === 'add'){
                                            // Adding Like
                                            cacheResponse[val].likes.push(dataj.revalidate_data) // Push Likr username

                                        }else {
                                            // Removing Like
                                            cacheResponse[val].likes = cacheResponse[val].likes.filter((in_key) => in_key !== dataj.revalidate_data) // Push Likr username

                                        }

                                    } else if (choice === 'dislike') {

                                        if(action.split(" ")[idx] === 'add'){
                                            // Adding Like
                                            cacheResponse[val].dislikes.push(dataj.revalidate_data) // Push DisLikr username

                                        }else {
                                            // Removing Like
                                            cacheResponse[val].dislikes = cacheResponse[val].dislikes.filter((in_key) => in_key !== dataj.revalidate_data) // Push DisLikr username

                                        }

                                    }

                                })

                            }

                        })
                        
                    }
                    
                })

                // Account Created Successfully
                return res.status(200).json({success: 'Action Updated'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update action'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}