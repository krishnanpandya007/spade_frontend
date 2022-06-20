import { BACKEND_ROOT_URL } from "../../config"

import cookie from 'cookie';
import authenticate from "./authenticate";

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const {catagory, quantity} = req.body;

    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/load_posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                catagory: catagory,
                quantity: quantity
            })

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
    return res.status(200).json({success: true, data: apiData});
    // return Response({success: true, data: apiData}, 200)
    

}