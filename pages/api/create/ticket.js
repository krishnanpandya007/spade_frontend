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

            title,
            descr,
            catagory
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({

            title,
            descr,
            catagory
        })



            const apiResponse = await fetch(`${BACKEND_ROOT_URL}help_and_support/create/ticket/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})


            const dataj = await apiResponse.json();

            if (apiResponse.status === 201){
                // Ticket Created Successfully
                return res.status(201).json({success: 'Ticket Created', data: dataj})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Create Ticket'})
            }



    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}