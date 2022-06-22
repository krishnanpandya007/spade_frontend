import { BACKEND_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from "../../config";

import cookie from 'cookie';



/// THIS MIGHT BE NOT EXCECUTING







export default async function login (req, res) {

    // console.log("Started")

    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({'error': `Method ${req.method} not allowed!`});
    }

    const {
        username,
        password
    } = req.body;

    const body_data = JSON.stringify({username: username, password: password, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'password'});

    const apiResponse = await fetch(`${BACKEND_ROOT_URL}auth/token/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body_data
    }).catch((err) => {console.log(err)});
    const apiData = await apiResponse.json();

    console.log("JIRA::", apiData)

    if(apiResponse.status !== 200){
        // Failed
        return res.status(apiResponse.status).json({"error": "Can't authenticate your account | Invalid Credentials", "info": apiData});

    }

    // console.log("Recieved Data: ", apiData);

    res.setHeader('Set-Cookie', [cookie.serialize(
            'access', apiData.access_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: apiData.expires_in, // [VARY]
                sameSite: 'strict',
                path: '/'
                }
            ),
            cookie.serialize(
                'refresh', apiData.refresh_token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: apiData.expires_in, // [VARY]
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ]
    );

    return res.status(200).json({"success": "You have logged In Successfully"});



}