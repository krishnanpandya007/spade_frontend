// import { BACKEND_ROOT_URL } from "../../../config";

import { get_posts_by_catagory } from "../../caching";
import { BACKEND_ROOT_URL } from "../../config";

import cookie from 'cookie'
// import { BACKEND_ROOT_URL } from "../../../../config";




// Need to check if old_username is same as current user


export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){


        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        const { filter } = req.body;

        const dataj = await get_posts_by_catagory(filter, access);

        return res.status(200).json(dataj);


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}