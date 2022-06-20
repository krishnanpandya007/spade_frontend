import { BACKEND_ROOT_URL } from "../../../config";

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const {
            first_name,
            last_name,
            username,
            password,
            re_password,
            email
        } = req.body;

        const body = JSON.stringify({
            first_name,
            last_name,
            username,
            password,
            re_password,
            email
        })


        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: body
        }).catch((err) => {console.log(err)})

        const data = await apiResponse.json()

        if (apiResponse.status === 201){
            console.log("HORRAAAAYYYYY")
            // Account Created Successfully
            return res.status(201).json({success: apiResponse.success})
        }else{
            return res.status(apiResponse.status).json({error: data.error})
        }

 

    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}