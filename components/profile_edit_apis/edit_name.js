export default async function edit_name (first_name, last_name, past_username) {


      const response = await fetch(`../../../api/profile/edit/name/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            new_name: first_name+' '+last_name,
          //   last_name: last_name,
            past_username: past_username
          })
        })


      return response

}