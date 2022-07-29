import { FRONTEND_ROOT_URL } from "../../../config";

export async function fetch_profile_posts_frontend(mode) {

    console.log("MODEEE:", mode)

    const response = await fetch(`${FRONTEND_ROOT_URL}api/get_profile_posts_by_mode/`, {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: JSON.stringify({
            fetch_mode: mode
        })

    })

    const data = await response.json();

    return data;

}
