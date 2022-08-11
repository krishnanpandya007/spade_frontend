import Link from 'next/link'
import { useRouter } from 'next/router'

export default function SocialConnectError() {

  const router = useRouter();

  return  (

    <center>

      <h2>Error Occured while Syncing info.</h2>
      <br/>
      {
        router.query?.error ? <b>Error Message:</b><span>{router.query.error}</span>
      }
      <br/>
      <br/>

      <p>You can also create account<span><Link href="create/account"><a href="create/account"> natively.</a></Link></span>


    </center>

  )

}
