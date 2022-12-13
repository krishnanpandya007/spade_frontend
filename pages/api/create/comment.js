import { BACKEND_ROOT_URL } from "../../../config";
import cache from "memory-cache"
import cookie from 'cookie'
import authenticate from "../authenticate";

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account


        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const {

            post_id,
            comment
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({

            post_id,
            comment
        })



        const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/create/comment/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: body
        }).catch((err) => {console.log(err)})

        return res.status(apiResponse.status).json({})



    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}