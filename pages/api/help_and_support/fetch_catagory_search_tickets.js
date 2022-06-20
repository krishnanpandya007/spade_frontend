import { BACKEND_ROOT_URL } from "../../../config";

export default async (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const {search_query, catagory} = req.body;

    // try{
        const apiResponse = await fetch(`${BACKEND_ROOT_URL}help_and_support/get_catagory_search_query_tickets/${catagory}/${search_query}/`).catch((err) => {console.log(err)})
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