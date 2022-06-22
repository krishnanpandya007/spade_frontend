import { FRONTEND_ROOT_URL } from "../../config";

export default async function login (username, password) {

            const apiResponse = await fetch(`${FRONTEND_ROOT_URL}api/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({username, password})
            }).catch((err) => {console.log(err)});
            const data = await apiResponse.json();


        if (apiResponse.status !== 200){
            return {status: false, message: data.error};
        }

        return {status: true, message: data.success};

}