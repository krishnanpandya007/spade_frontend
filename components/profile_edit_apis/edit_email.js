export default async function edit_email (old_username, new_email) {

      const response = await fetch(`../../../api/profile/edit/email/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' :'application/json'
          },
          body: JSON.stringify({
            past_username: old_username,
            new_email: new_email
          })
        })

      return response

}

export async function send_verification_code (email) {

  const response = await fetch(`../../../api/profile/edit/send_verification_email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept' :'application/json'
    },
    body: JSON.stringify({email})
  })

return response

}

export async function verify_verification_code (username, email, verification_code) {

  const response = await fetch(`../../../api/profile/edit/verify_verification_code/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept' :'application/json'
    },
    body: JSON.stringify({username, email, verification_code})
  })

  return response

}