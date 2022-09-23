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


            console.log("BEFORE SENDING NEXT =-> DJANGO")
            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/post/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})
            console.log("AFTER")

            const dataj = await apiResponse.json()

            console.log("AFTER AFTER")
            if (apiResponse.status === 201){


                // Revalidate cache
                
                cache.keys().forEach((key_url) => {
                    // For Each Catagory
                    let cacheResponse = cache.get(key_url) || [];

                    if(cacheResponse){

                        cacheResponse.map((val, idx) => {

                            if (val.id === post_id) {

                                let remainingTime = JSON.parse(cache.exportJson())[key_url].expire - Date.now()
                                console.warn("Remaining time: ", remainingTime)

                                choice.split(" ").map((choice, idx) => {

                                    if (choice === 'like') {

                                        if(action.split(" ")[idx] === 'add'){
                                            // Adding Like
                                            val.likes.push(dataj.revalidate_data) // Push Likr username

                                        }else {
                                            // Removing Like
                                            val.likes = val.likes.filter((in_key) => in_key !== dataj.revalidate_data) // Push Likr username

                                        }

                                    } else if (choice === 'dislike') {

                                        if(action.split(" ")[idx] === 'add'){
                                            // Adding Like
                                            val.dislikes.push(dataj.revalidate_data) // Push Likr username

                                        }else {
                                            // Removing Like
                                            val.dislikes = val.dislikes.filter((in_key) => in_key !== dataj.revalidate_data) // Push Likr username

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