import { BACKEND_ROOT_URL } from "../../config";

import cookie from 'cookie';

export default async (req, res, callByServer=false) => {


    // let callByServer = false;

    if (req.method.toLowerCase() !== 'get'){

        return callByServer ? {error: true} : res.status(405).json({"error": `method ${req.method} not allowed`, 'is_authenticated': false});

    }


    const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;
    const refresh = cookies.refresh ?? false;

    // console.log("total cookies: ", req.headers.cookie);
    console.log("Access ",access, "Refresh: ", refresh);

    if (!(access) && !(refresh)){
        return callByServer ? {error: true} : res.status(200).json({'is_authenticated': false, 'error': 'No tokens found to authenticate user'});

    }

    if (!(access)){

        console.log("Current REFRESH 0xCCFF: ", refresh)
        // we have refresh but not access
        // try{
            const apiResponse = await fetch(`${BACKEND_ROOT_URL}api/token/refresh/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    refresh
                })
            }).catch((err) => {console.log(err)});
            const apiData = await apiResponse.json();
        // } catch (err) {
        //     console.log(err)
        // }


        console.log("DEBUG: ", apiData);

        if (apiResponse.status !== 200){

            

            return callByServer ? {error: true} :res.status(500).json({"error": "can't get new access token!", "is_authenticated": false});

        }

        res.setHeader('Set-Cookie', [cookie.serialize(
                'access', apiData.access, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 20, // an hour
                    sameSite: 'strict',
                    path: '/'
                    }
                )
            ]
        );
        console.log("Generated New!!", apiData.access)
        
        return callByServer ? {error:false, access: apiData.access} : res.status(200).json({'success': 'Successfully added new access token', 'is_authenticated': true})

    }

    return callByServer ? {error:false, access: access} : res.status(200).json({'success': 'user is already verified!', 'is_authenticated': true});



}