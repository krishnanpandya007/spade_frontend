export default async function edit_username (old_username, new_username) {

      const response = await fetch(`../../../api/profile/edit/username/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            new_username: new_username
          })
        }).catch((err) => {console.log(err)})


      return response

}