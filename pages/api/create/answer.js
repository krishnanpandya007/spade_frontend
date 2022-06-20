import { BACKEND_ROOT_URL } from "../../../config";

import cookie from 'cookie'
import authenticate from "../authenticate";

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

            comment_data,
            target_ticket_id
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({

            descr: comment_data,
            target_ticket_id:target_ticket_id
        })



            const apiResponse = await fetch(`${BACKEND_ROOT_URL}help_and_support/create/answer/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})

            const dataj = await apiResponse.json()

            console.log(dataj);

            if (apiResponse.status === 201){
                // Account Created Successfully
                return res.status(201).json({success: 'Comment Created', data: dataj})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Create Comment', data: dataj})
            }



    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}