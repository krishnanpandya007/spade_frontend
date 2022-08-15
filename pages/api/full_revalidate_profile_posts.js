// THis is actually re-validates full cache-data for account posts
import cache from 'memory-cache'

export default async function revalidate(req, res) {


    if(req.method.toLowerCase() !== 'post') {

        res.setHeader('Accept', ['POST'])
        res.status(400).json({'error': "Method Not Allowed"})

    }

    // What if cache expires but not the path related to postid (updation)
    // Validation of request that it actually comes from backend (Django)
    //   Client Key Access
  

    // const router = useRouter();


    const secret_key = req.headers['secret-key']

    if((secret_key ?? false) && secret_key === "98h(F*H(F$&*H87fH$*&gtoL:TW$)*HF*84f") {

        // Could be backend making the request

        //REVALIDATE POST VIEW


        const { data, target_author } = req.body;



        cache.keys().forEach((url) => {

            if(url === `cache_posts/created_posts/${target_author}/`){


                cache.put(url, data, 1000 * 60 * 60) // Cache Forever


            }

        })

        
        res.status(204).end()

    }else{
        res.status(401).end()
    }

} 