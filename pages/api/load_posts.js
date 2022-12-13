// import { BACKEND_ROOT_URL } from "../../../config";

import { BACKEND_ROOT_URL } from "../../config";

// import { BACKEND_ROOT_URL } from "../../../../config";




// Need to check if old_username is same as current user


export default async (req, res) => {

    console.log("KPKPKP:::", req)

    if(req.method.toLowerCase() === "post"){


        // console.log("Post Id: ", post_id)

        const body = JSON.stringify(req.body)

        try{

            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/load_posts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: body
            }).catch((err) => {console.log(err)})

            const data = await apiResponse.json()
            console.log("Recieved Load MoreData:", data[0])

                // Account Created Successfully
            return res.status(apiResponse.status).json(data)

        } catch(e) {

            return res.status(500).json({error: 'Something went wrong'})

        }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}