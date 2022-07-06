import { BACKEND_ROOT_URL } from "../../../config"

import cookie from 'cookie';

export default async (req, res) => {

    console.log("Inside")

    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access = cookies.access ?? false;

    console.log("My Access::", access)

        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/social_profile/submit_info/`, {
            method: 'POST',
            headers: {
                
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access}`
            },
            body: JSON.stringify(req.body)

        }).catch((err) => {console.log(err)})
    const apiData = await apiResponse.json();


    // console.log("Data::-> ", apiData);
    return res.status(apiResponse.status).json(apiData);
    // return Response({success: true, data: apiData}, 200)
    

}