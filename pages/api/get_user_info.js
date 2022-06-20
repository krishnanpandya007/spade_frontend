import { BACKEND_ROOT_URL } from "../../config"

import cookie from 'cookie';
import authenticate from "./authenticate";

export default async (req, res) => {

    console.log("Inside")

    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access = cookies.access ?? false;
    console.log("API_________________   Access: ", access)
    // req.method = 'get'; // For authentication
    // // try{
    //     const data = await authenticate(req, res, true); // Called by it-self (server)
    // // } catch (err) {
    // //     console.log(err)
    // // }

    // console.log("Somethin: ", data)

    // if (data.error){
    //     return res.status(401).json({error: 're-login needed'})

    // }
    // access = data.access
    

    // console.log("Updated Access Token: ", access)
    
    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/user/`, {
            method: 'GET',
            headers: {
                
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            }

        }).catch((err) => {console.log(err)})
        const apiData = await apiResponse.json();
    // } catch (err) {
    //     console.log(err)
    // }


    console.log("Data::-> ", apiData);

    if (apiResponse.status !== 200){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(200).json(apiData);
    // return Response({success: true, data: apiData}, 200)
    

}