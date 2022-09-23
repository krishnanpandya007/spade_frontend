// import { BACKEND_ROOT_URL } from "../../../config";
import authenticate from "../../authenticate";

import cookie from 'cookie'
import { BACKEND_ROOT_URL } from "../../../../config";
import cache from "memory-cache"




// Need to check if old_username is same as current user




export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;
        req.method = 'get'; // For authentication

        const data = await authenticate(req, res, true); // Called by it-self (server)


        if (data.error){
            return res.status(401).json({error: 're-login needed'})

        }

        access = data.access;

        const {

            new_username
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
  
            new_username     
        })

        try{

            const apiResponse = await fetch(`${BACKEND_ROOT_URL}profile/edit/username/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})

            const data = await apiResponse.json()

            if (apiResponse.status === 200){
                // Account Created Successfully


                // Revalidate cache
                
                cache.keys().forEach((key_url) => {
                    // For Each Catagory
                    let cacheResponse = cache.get(key_url) || [];

                    if(cacheResponse){

                        cacheResponse.map((val, idx) => {

                            if (val.author_name === data.old_username) {

                                val.author_name = new_username

                            }

                        })
                        
                    }
                    
                })

                return res.status(200).json({success: 'Username Updated'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update Username'})
            }

        } catch(e) {

            return res.status(500).json({error: 'Something went wrong'})

        }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}