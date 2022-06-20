import { FRONTEND_ROOT_URL } from "../../../config";

export default async function handle_ticket_like( target_ticket_id , action ) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/ticket/`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({target_ticket_id, action})
        

    })

    // const data = await response.json();

    return response.status === 201;

}