/* Checks if {access, refresh} token is valid or expired returns true if it is False otherwise */


export default async function verify(token_type) {

    try{
        const response = await fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                verify_token_type: token_type
            })
        }).catch((err) => {console.log(err)});
        const apiData = await response.json();
    } catch (err) {
        console.log(err)
    }


    if (response.status === 200){
        
        return apiData.is_valid; // Either its true or false

    } else {
        return false;
    }

}