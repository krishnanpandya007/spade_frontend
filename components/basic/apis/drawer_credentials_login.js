import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../../../config";
 
export default async function login(username, password) {

    const login_response = await fetch(`${FRONTEND_ROOT_URL}api/login/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })

    const mes = await login_response.json();

    // console.log("Login Response: ", login_response)

    return login_response.status === 200;

}