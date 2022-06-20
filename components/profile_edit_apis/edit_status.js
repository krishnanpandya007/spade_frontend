export default async function edit_status (old_username, new_status) {

      const response = await fetch(`../../../api/profile/edit/status/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            new_status: new_status
          })
        }).catch((err) => {console.log(err)})


      return response

}