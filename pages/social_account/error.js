import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SocialConnectError() {

  const router = useRouter();

  return  (

    <center>

      <h2>Error Occured while Syncing info.</h2>
      <br/>
      {
        router.query?.error ? <b>Error Message:<span>{router.query.error}</span></b>:null
      }
      <br/>
      <br/>

      <p>You can also create account<span><Link href="create/account"><a href="create/account"> natively.</a></Link></span></p>


    </center>

  )

}
