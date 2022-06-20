import { BACKEND_ROOT_URL } from "../../config";
import cookie from 'cookie'
// import { BACKEND_ROOT_URL } from "../../config"

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access_token = cookies.access ?? false;

    


    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/notifications/new/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }


        }).catch((err) => {console.log(err)})
    // } catch (err) {
    //     console.log(err)
    // }


    const data = await apiResponse.json();

    if (apiResponse.status !== 200){

        // Failure
        return res.status(400).json({error: true, data: {}});

        
    }
    return res.status(200).json(data);
    // return Response({success: true, data: apiData}, 200)
    

}