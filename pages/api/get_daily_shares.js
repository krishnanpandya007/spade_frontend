import { BACKEND_ROOT_URL } from "../../config"

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const {type, needed_page, specific_id} = req.body;

    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/load_ds/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                ds_type: type, // "audio" | "text"
                needed_page: needed_page, // Int(1, ...) each page contains 5 posts(MAX)
                specific_id: specific_id
            })

        }).catch((err) => {console.log(err)})
        const apiData = await apiResponse.json();
    // } catch (err) {
    //     console.log(err)
    // }


    // console.log("Data::-> ", apiData);

    // if (apiResponse.status !== 200){

    //     // Failure
    //     return res.status(400).json({error: true, data: {}});

        
    // }
    return res.status(apiResponse.status).json(apiData);
    // return Response({success: true, data: apiData}, 200)
    

}