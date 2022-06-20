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
            target_ticket_id,
            action
        } = req.body;

        // console.log("Post Id: ", post_id)

            console.log("BEFORE SENDING NEXT =-> DJANGO")
            const apiResponse = await fetch(`${BACKEND_ROOT_URL}help_and_support/handle-action/${target_ticket_id}/${action}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
            }).catch((err) => {console.log(err)})
            console.log("AFTER")

            const dataj = await apiResponse.json()

            console.log("AFTER AFTER")
            if (apiResponse.status === 201){
                // Ticket Updated Successfully
                return res.status(201).json({success: 'Action Updated'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update action'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}