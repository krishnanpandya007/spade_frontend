import { BACKEND_ROOT_URL } from "../../config";

// import { BACKEND_ROOT_URL } from "../../../config";
export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const {
            auth_token, 
            new_password,
            re_new_password
        } = req.body;

        const body = JSON.stringify({
            auth_token, 
            new_password,
            re_new_password
        })


        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/reset-password-by-email/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body
        }).catch((err) => {console.log(err)})

        return res.status(apiResponse.status).json()


 

    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}