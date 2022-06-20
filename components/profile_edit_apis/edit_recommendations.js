import { FRONTEND_ROOT_URL } from '../../config/index'

export default async function edit_recommendations (switch_status, target_username=null) {

    const response = await fetch(`${FRONTEND_ROOT_URL}/api/profile/edit/recommendations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept' :'application/json'
        },
        body: JSON.stringify({
          switch_status,
          target_username
        })
      })


    return response

}