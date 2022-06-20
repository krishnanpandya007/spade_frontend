import { BACKEND_ROOT_URL } from "../../config"

import cookie from 'cookie';
import authenticate from "./authenticate";

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }


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
    
    const { title, descr, email } = req.body;
    


    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/contact_us/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                title,
                descr,
                email
            })


        }).catch((err) => {console.log(err)})
    // } catch (err) {
    //     console.log(err)
    // }



    if (apiResponse.status !== 201){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(201).json({});
    // return Response({success: true, data: apiData}, 200)
    

}