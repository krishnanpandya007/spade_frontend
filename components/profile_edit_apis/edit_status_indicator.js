export default async function edit_status_indicator (old_username, new_statusIndicator) {


      const response = await fetch(`../../../api/profile/edit/status_indicator/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            new_statusIndicator: new_statusIndicator
          })
        }).catch((err) => {console.log(err)})


      return response

}