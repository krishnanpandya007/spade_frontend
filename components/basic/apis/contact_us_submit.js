import { FRONTEND_ROOT_URL } from "../../../config";

export default async function submit_contact_us_form(title, descr, email) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/contact_us/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            title,
            descr,
            email
        })  

    }).catch(err => { console.log(err) });

    return response.status === 201

}