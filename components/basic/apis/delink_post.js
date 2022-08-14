import { FRONTEND_ROOT_URL } from "../../../config";

export async function delink_post(post_id){

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/delink`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({

            post_id

        })

    })

    const status = await response.status;
    return status === 201 // Updated

}