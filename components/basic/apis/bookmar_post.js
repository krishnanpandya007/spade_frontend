import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../../../config";

export async function bookmark_post(post_id){

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/bookmark`, {

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
    return status === 201 // Created Bookmark for user

}

export async function unbookmark_post(post_id){

    const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/unbookmark`, {

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

    return status === 201 // Created Bookmark for user

}