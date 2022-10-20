import { BACKEND_ROOT_URL } from "../../config"

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const {model, model_id, field, needed_page} = req.body;

    const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/paginated/${model}/${model_id}/${field}/${needed_page}/`).catch((err) => {console.log(err)})
    const apiData = await apiResponse.json();
    return res.status(apiResponse.status).json(apiData);
    

}