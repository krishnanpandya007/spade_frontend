export default async function edit_reset_password (old_username, old_password, new_password) {


      const response = await fetch(`../../../api/profile/edit/reset_password/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            old_password: old_password,
            new_password: new_password
          })
        })

        
        const data = await response.json();
        
        if(response.status !== 200){
          return false;
        }

      return data

}