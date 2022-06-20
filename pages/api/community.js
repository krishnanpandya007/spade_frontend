import { BACKEND_ROOT_URL } from "../../config";
import cookie from 'cookie'
// import { BACKEND_ROOT_URL } from "../../config"

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const cookies = cookie.parse(req.headers.cookie ?? '');
    let access_token = cookies.access ?? false;

    const {
        target_user,
        action
    } = req.body;

    const body = JSON.stringify({ target_user, action })

    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/community/${action}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: body


        }).catch((err) => {console.log(err)})
    // } catch (err) {
    //     console.log(err)
    // }

    // if (apiResponse.status !== 200){

        // Failure
        return res.status(apiResponse.status).json();

        
    // }?
    // return res.status(200).json(data);
    // return Response({success: true, data: apiData}, 200)
    

}