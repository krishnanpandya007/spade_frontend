import { FRONTEND_ROOT_URL } from "../../config"

export default async function logout() {



    const response = await fetch(`${FRONTEND_ROOT_URL}api/logout/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).catch((err) => {console.log(err)})

    return response

}