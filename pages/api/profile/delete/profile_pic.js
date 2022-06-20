// import { BACKEND_ROOT_URL } from "../../../config";
import authenticate from "../../authenticate";

import cookie from 'cookie'
import { BACKEND_ROOT_URL } from "../../../../config";





// Need to check if old_username is same as current user




export default async (req, res) => {

    if(req.method.toLowerCase() === "get"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;


        try{

            const apiResponse = await fetch(`${BACKEND_ROOT_URL}profile/delete/profile_pic/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
            }).catch((err) => {console.log(err)})


            if (apiResponse.status === 204){
                // Removed ProfilePic Successfully
                return res.status(204).json({success: 'Profile Pic Removed!'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t remove profilePic'})
            }

        } catch(e) {

            return res.status(500).json({error: 'Something went wrong'})

        }


    }else{
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}