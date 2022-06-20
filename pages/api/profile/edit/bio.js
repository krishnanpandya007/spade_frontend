// import { BACKEND_ROOT_URL } from "../../../config";
import authenticate from "../../authenticate";

import cookie from 'cookie'
import { BACKEND_ROOT_URL } from "../../../../config";





// Need to check if old_username is same as current user




export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;
        req.method = 'get'; // For authentication

        // try{
            const data = await authenticate(req, res, true); // Called by it-self (server)
        // } catch (err) {
        //     console.log(err)
        // }

        if (data.error){
            return res.status(401).json({error: 're-login needed'})

        }

        access = data.access;

        const {
            past_username,
            new_bio
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            past_username,
            new_bio     
        })

        // try{

            const apiResponse = await fetch(`${BACKEND_ROOT_URL}profile/edit/bio/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: body
            }).catch((err) => {console.log(err)})

            // const dataj = await apiResponse.json()

            if (apiResponse.status === 200){
                // Account Created Successfully
                return res.status(200).json({success: 'Bio. Updated'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Update Bio.'})
            }

        // } catch(e) {

        //     return res.status(500).json({error: 'Something went wrong'})

        // }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}