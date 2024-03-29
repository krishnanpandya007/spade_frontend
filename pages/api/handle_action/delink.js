import { BACKEND_ROOT_URL } from "../../../config";


import cookie from 'cookie'

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;


        const {

            post_id
        } = req.body;

        // console.log("Post Id: ", post_id)



            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/delink/${post_id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            }).catch((err) => {console.log(err)})

            if (apiResponse.status === 201){
                // Account Created Successfully
                return res.status(201).json({success: 'Post De-Linked'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update action'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}