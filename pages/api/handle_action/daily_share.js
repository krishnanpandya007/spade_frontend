import { BACKEND_ROOT_URL } from "../../../config";


import cookie from 'cookie'
import authenticate from "../authenticate";

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const {
            ds_id,
            action, // "like" | "unlike" | "report" | "delete"
            reason
        } = req.body;



        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            ds_id,
            action,
            reason
        })


            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/daily_share/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})
            // console.log("AFTER")

            // console.log("AFTER AFTER")
            // if (apiResponse.status === 201){
            //     // Account Created Successfully
            //     return res.status(201).json({success: 'Action Updated'})
            // }else{
                return res.status(apiResponse.status).json({})
            // }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}