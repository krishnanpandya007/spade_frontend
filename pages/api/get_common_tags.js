import { BACKEND_ROOT_URL } from "../../config"


export default async (req, res) => {


    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    console.log("GONE>>>>>>")

        const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/load_common_tags/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
   
            }

        }).catch((err) => {console.log(err)})

            console.log("CAMEEEEEEE")
        const apiData = await apiResponse.json();

        console.log(apiData)

    if (apiResponse.status !== 200){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(200).json({success: true, data: apiData});
    // return Response({success: true, data: apiData}, 200)
    

}