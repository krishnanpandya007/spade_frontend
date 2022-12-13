import cache from "memory-cache";

export default (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const { cache_keys: catagories } = req.body;
    
    let result = {};
    catagories.map((catagory) => {

        result[catagory] = JSON.parse(JSON.stringify(cache.get(catagory) || []));

    })
    if(typeof req.body.username !== 'undefined'){

        let username = req.body.username;

        // Object.keys(result).map((catagory) => {
            for(const catagory in result){
                    
                if(result[catagory] && result[catagory].length){
                    // if it contains spacks then compute values
                
                    result[catagory].map((spack_live_data, idx) =>{
    
                        if ( spack_live_data.id ===  cache.get(catagory)[idx].id){
                            spack_live_data.is_liked = spack_live_data.likes.includes(username)
                            spack_live_data.is_disliked = spack_live_data.dislikes.includes(username)
                            spack_live_data.is_bookmarked = spack_live_data.bookmarks.includes(username)
    
                            spack_live_data.likes = spack_live_data.likes.length
                            spack_live_data.dislikes = spack_live_data.dislikes.length
    
                        }
    
                    } )
                
                }

            }

    }




    return res.status(200).json({success: true, data: result});
    

}