import { BACKEND_ROOT_URL } from "../../config"

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    // ! NOT CONSIDERING AUTH STATE OF USER

    const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/get_trending_folks/`).catch((err) => {console.log(err)})
    const apiData = await apiResponse.json();
    return res.status(apiResponse.status).json(apiData);
    
}