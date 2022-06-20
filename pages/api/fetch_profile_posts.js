// import { BACKEND_ROOT_URL } from "../../../config";


import cookie from 'cookie'
import { BACKEND_ROOT_URL } from '../../config';
export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const {

            mode

        } = req.body;

        // console.log("Post Id: ", post_id)


            const apiResponse = await fetch(`${BACKEND_ROOT_URL}account/load_posts/${mode}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                }
            }).catch((err) => {console.log(err)})

            const dataj = await apiResponse.json()

            if (await apiResponse.status === 200){
                // Account Created Successfully
                return res.status(200).json(dataj)
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t Load Posts'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}