import { FRONTEND_ROOT_URL } from "../../config";

export async function handle_action_post(username, post_id, choice, action){

    // Username: String
    // post__id: Number
    // choice: Array[like, dislike]
    // Action: Array['add', 'remove']
        const response = await fetch(`${FRONTEND_ROOT_URL}api/handle_action/post/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                post_id,
                choice,
                action
            })
        })

        const data = await response.json();


    if (response.status !== 200){
        // Some error ocurred

        return false;
    }

    return true;

}

export async function handle_action_create_comment(comment, username, post_id){


        const response = await fetch("api/create/comment/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                comment,
 
                post_id,
            })
        }).catch((err) => {console.log(err)})
        const data = await response.json();



    if (response.status !== 201){
        // Comment isnt created
        return [false, -1];

    }

    return [true, data.new_id];

}

export async function handle_action_comment(username, action, comment_id) {

        const response = await fetch('/api/handle_action/comment/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username,
                comment_id,
                
                action
            })
        }).catch((err) => {console.log(err)})
        const data = await response.json();


    if (response.status !== 200){
        // Some error ocurred
        return false;
    }

    return true;

}