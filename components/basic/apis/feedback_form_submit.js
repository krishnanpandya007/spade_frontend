import { FRONTEND_ROOT_URL } from "../../../config";

export default async function submit_feedback_form(rating, descr) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/feedback/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            experience: rating,
            descr: descr
        })  

    }).catch(err => { console.log(err) });

    return response.status === 201

}