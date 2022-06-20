import React from 'react'
import { BACKEND_ROOT_URL } from '../../config'


// Supposed to cache number(result) for 5 second

export async function getServerSideProps(context) {

  const response = await fetch(`${BACKEND_ROOT_URL}account/user/`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ya29.A0ARrdaM9ozOF4hrmhiVyi2HvRWLpxTQc5B8L9THdwtUGxfxlCmPpGm7tOSBSLFrD3M6P4CW3LNAccGhYS80b4CT3lS4Rp1YLdfVtQryl0QsoghnCNen-mxj2vDk3xkDkIZ3ZauzKabVqDJ35FatPfbcMpeDHT'
    }
  })

  const body = await response.json();

  console.log(body)

  return {
    props: {body: JSON.stringify(body)}
  }

}

function Index(props) {
  return (
    <div>{props.body}</div>
  )
}

export default Index