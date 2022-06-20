export default async function edit_bio (old_username, new_bio) {



      const response = await fetch(`../../../api/profile/edit/bio/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            new_bio: new_bio
          })
        })

      return response

}