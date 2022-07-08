import { BACKEND_ROOT_URL } from "../../../config";
import cookie from 'cookie'
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

        const { access_token, refresh_token, expires_in } = data;

        res.setHeader('Set-Cookie', [cookie.serialize(
          'access', access_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // If in-production => true; else false // *****HARDCODED******
              maxAge: expires_in, // In Seconds
              sameSite: 'strict',
              path: '/'
              }
          ),
          cookie.serialize(
            'refresh', refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production", // If in-production => true; else false // *****HARDCODED******
                maxAge: expires_in, // In Seconds
                sameSite: 'strict',
                path: '/'
                }
            )
      ]
  );


        // if (apiResponse.status === 201){
        //     console.log("HORRAAAAYYYYY")
        //     // Account Created Successfully
        //     return res.status(201).json({success: apiResponse.success})
        // }else{
            return res.status(apiResponse.status).json(data)
        // }

 

    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}