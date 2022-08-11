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



        const {
            username,
            email,
            verification_code
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            past_username: username,
            email,
            verification_code   
        })

        let apiResponse

        if(access){

            apiResponse = await fetch(`${BACKEND_ROOT_URL}profile/edit/email/verify_verification_code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
    
                },
                body: body
            }).catch((err) => {console.log(err)})
        } else {
            apiResponse = await fetch(`${BACKEND_ROOT_URL}profile/edit/email/verify_verification_code/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
    
                },
                body: body
            }).catch((err) => {console.log(err)})
            
        }

        const dataj = await apiResponse.json()

        if (apiResponse.status === 200){
            // Account Created Successfully
            console.log("asdsdd")
            return res.status(200).json({success: "Verification successfull!"})
        }else if ( apiResponse.status === 200 && dataj.error){
            console.log("ASDSAD")

            return res.status(200).json({error: 'Verification Code is Invalid!'})
            
        }
        else{
            return res.status(apiResponse.status).json({error: 'Can\'t send Verification Code'})
        }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}