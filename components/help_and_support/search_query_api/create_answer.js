import { FRONTEND_ROOT_URL } from "../../../config";

export async function create_answer( comment_data , target_ticket_id ) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/create/answer/`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({comment_data, target_ticket_id})
        

    })

    const data = await response.json();

    return data;

}