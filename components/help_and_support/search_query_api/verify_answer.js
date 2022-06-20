import { FRONTEND_ROOT_URL } from "../../../config";

export async function verify_answer( target_ticket_id , target_answer_id ) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/verify/ticket/`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({target_answer_id, target_ticket_id})
        

    })

    const { success } = await response.json();

    if (success) {

        return true;

    } else {
            
        return false;
    
    }

}
/*

export default async function verify_answer(ticket_id, answer_id) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/verify/ticket/`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        body: JSON.stringify({comment_data, target_ticket_id})
        

    })

    const { success } = await response.json();

    if (success) {

        return true;

    } else {
            
        return false;
    
    }

}
*/