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
            ...final_action_state
        } = req.body;
        console.log("#################################::", post_id, final_action_state)



        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            post_id: post_id,
            action_state: final_action_state
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

                    let cacheResponse = cache.get(key_url) || [];

                    if(cacheResponse){

                                cacheResponse.map((spack, idx) => {

                                    if(spack.id === post_id){
                                        Object.keys(final_action_state).map((field) => {

                                            if(final_action_state[field]){

                                                if(!(spack[field].includes(dataj.revalidate_data))){
                                                    spack[field].push(dataj.revalidate_data)
                                                }
                                            }else{

                                                spack[field] = spack[field].filter((val) => val !== dataj.revalidate_data)
                                            }

                                        })

                                    }

                                    return spack

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