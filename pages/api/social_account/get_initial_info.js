import { BACKEND_ROOT_URL } from "../../../config"

import cookie from 'cookie';

export default async (req, res) => {

    console.log("Inside")

    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access = cookies.access ?? false;

    console.log("My Access::", access)

        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/social_profile/common_info/`, {
            method: 'GET',
            headers: {
                
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            }

        }).catch((err) => {console.log(err)})
        const apiData = await apiResponse.json();


    console.log("Data::-> ", apiData);

    if (apiResponse.status !== 200){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(200).json(apiData);
    // return Response({success: true, data: apiData}, 200)
    

}