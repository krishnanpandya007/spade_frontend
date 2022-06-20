import { FRONTEND_ROOT_URL } from "../../config";

export default async function get_filtered_posts(catagory) {


    const response = await fetch(`${FRONTEND_ROOT_URL}api/get_filtered_posts/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({catagory: catagory, quantity: 5})
    })

    return response;


}