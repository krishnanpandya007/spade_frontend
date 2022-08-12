

export default async function AuthenticateUser(){

    const response = await fetch("/api/authenticate/", {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).catch((err) => {console.log(err)});
    const data = await response.json();
    // console.log("DEBUG: ", data.is_authenticated);
    return data.is_authenticated;





}