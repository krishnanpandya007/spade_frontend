import { FRONTEND_ROOT_URL } from "../../../config";

export async function fetch_profile_posts(mode) {

    const response = await fetch(`${FRONTEND_ROOT_URL}api/fetch_profile_posts/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify({
            mode
        })

    }).catch((err) => {console.error("Error: ", err)})

    const data = await response.json();

    return data;

}
