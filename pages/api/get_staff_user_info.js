import { BACKEND_ROOT_URL } from "../../config"

import cookie from 'cookie';

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    console.log("There we go")
    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access = cookies.access ?? false;
    const refresh = cookies.refresh ?? false;

    if (refresh && !access){
        console.log("Refreshing new access token");
        // Authenticate User Again to get new token

        try{
            const response = await fetch(`${BACKEND_ROOT_URL}api/token/refresh/`,{
                method: 'POST',
                data: JSON.stringify({refresh})
            }).catch((err) => {console.log(err)})
            const data = await response.json();
        } catch (err) {
            console.log(err)
        }

        if(response.status !== 200){
            // Can't able to refresh access token
            return res.status(500).json({error: true, data: {}});
    
        }

        // Setting a new access token to user
        res.setHeader('Set-Cookie', [cookie.serialize(
                            'access', data.access, {
                                httpOnly: true,
                                secure: process.env.NODE_ENV !== 'development',
                                maxAge: 60*60, // an hour
                                sameSite: 'strict',
                                path: '/'
                                }
                            )
                        ]
                    );

        access = data.access;

    }

    try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/is-staff/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            }

        }).catch((err) => {console.log(err)})
        const apiData = await apiResponse.json();
    } catch (err) {
        console.log(err)
    }


    console.log("Data::-> ", apiData);

    if (apiResponse.status !== 200){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(200).json({success: true, data: apiData});
    // return Response({success: true, data: apiData}, 200)
    

}