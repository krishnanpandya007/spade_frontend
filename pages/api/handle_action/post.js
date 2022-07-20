import { BACKEND_ROOT_URL } from "../../../config";


import cookie from 'cookie'
import authenticate from "../authenticate";

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
            if (apiResponse.status === 200){
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