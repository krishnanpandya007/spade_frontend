import cache from "memory-cache";

export default (req, res) => {


    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: "Method not allowed!", data: {}});
    }

    const { cache_key: catagory } = req.body;

    const results = cache.get(catagory) || [];

    console.log("Results::", results)

    return res.status(200).json({success: true, data: results});
    

}