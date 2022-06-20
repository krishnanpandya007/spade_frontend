import { FRONTEND_ROOT_URL } from "../../../config";

export async function create_ticket({title, descr, catagory}) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/create/ticket/`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({title, descr, catagory})
        

    })

    const data = await response.json();

    return data.data;

}