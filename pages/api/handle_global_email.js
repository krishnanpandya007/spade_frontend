// import { BACKEND_ROOT_URL } from "../../../config";

import { BACKEND_ROOT_URL } from "../../config";

// import { BACKEND_ROOT_URL } from "../../../../config";




// Need to check if old_username is same as current user


export default async (req, res) => {


    if(req.method.toLowerCase() === "post"){

        const {
            email,
            send,
            verify,
            code
        } = req.body;

        // console.log("Post Id: ", post_id)

        const body = JSON.stringify({
            email,
            send,
            verify,
            code
        })

        try{

            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_global_email/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: body
            }).catch((err) => {console.log(err)})

            const data = await apiResponse.json()

            if (apiResponse.status === 200){
                // Account Created Successfully
                return res.status(200).json(data)
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Fetch search results'})
            }

        } catch(e) {

            return res.status(500).json({error: 'Something went wrong'})

        }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}