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


        const {target_post_id, target_field, data} = req.body;console.log(target_post_id, target_field, data);
      
        const hours = 1;  
        let cacheResponse;  
        const cache_postid_to_url = cache.get;
        console.log("FULL_REVALIDATION_LOG", target_post_id, target_field, data)

        // Object.entries(cache_postid_to_url).map(item => {
        //     console.log("AndarBahar")
        //     //Item = [key, val]
            cache.keys().forEach((url) => {

                console.log("Andar")

                switch(target_field){
                    case 'likes':
                        // Update Likes on every url-path
                        cacheResponse = cache.get(url) || [];
                        
                        if (cache.get(url).length === 0) {
                            cache.put(url, data, hours * 1000 * 60 * 60);
                            break;
                        }
                        try{

                            cacheResponse = cacheResponse.map((val, idx) => {
                                if(val.id === Number(target_post_id)){
                                    console.log("Dta::", data)
    
                                    val.likes = data
                                }
    
    
                                return val;
                            })
                            console.log("Here Updated::", cacheResponse)
                        } catch (e) {

                            console.log("O bhai::", e)

                        }
                        // const hours = 1;

                        cache.put(url, cacheResponse, hours * 1000 * 60 * 60);
                     
                        break;
                        // res.status(204).end()
                        


                    case 'dislikes':
                        // Update Dislikes on every url-path
                        cacheResponse = cache.get(url) || [];

                        if (cacheResponse.length === 0) {
                            cache.put(url, data, hours * 1000 * 60 * 60);
                            break;
                        }
                        
                        cacheResponse = cacheResponse.map((val, idx) => {
                            if(val.id === Number(target_post_id)){
                                console.log("Dta::", data)
                                val.dislikes = data
                            }
                            return val;
                        })

                        // const hours = 1;

                        cache.put(url, cacheResponse, hours * 1000 * 60 * 60);
                        break;
                        
                        
                    case 'username':
                        // Update Dislikes on every url-path
                        cacheResponse = cache.get(url) || [];

                        if (cacheResponse.length === 0) {
                            cache.put(url, data, hours * 1000 * 60 * 60);
                            break;
                        }
                        
                        cacheResponse = cacheResponse.map((val, idx) => {
                            if(val.id === Number(target_post_id)){
                                console.log("Dta::", data)
                                val.author_name = data[0]
                            }
                            return val;
                        })

                        // const hours = 1;

                        cache.put(url, cacheResponse, hours * 1000 * 60 * 60);
                        break;
                        

                    case 'comments': 
                        // Update Comments on every url-path
                        cacheResponse = cache.get(url) || [];

                        if (cacheResponse.length === 0) {
                            cache.put(url, data, hours * 1000 * 60 * 60);
                            break;
                        }
                        
                        cacheResponse = cacheResponse.map((val, idx) => {
                            if(val.id === Number(target_post_id)){
                                val.comments = data
                            }
                            return val;
                        })

                        // const hours = 1;

                        cache.put(url, cacheResponse, hours * 1000 * 60 * 60);
                        break;
                        // res.status(204).end()
                    




                }


            })

        //   })

        res.status(204).end()

    }

} 