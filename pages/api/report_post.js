import cookie from 'cookie'
import { BACKEND_ROOT_URL } from '../../config';
export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;


        const {
            spack_id,
            type: report_type,
            message
        } = req.body;

        // console.log("Post Id: ", post_id)


// {type: 'INAPPROPRIATE_SPACK' | 'NON_SAPCK', message: 'This thins cadfs....' | null}
            const apiResponse = await fetch(`${BACKEND_ROOT_URL}apio/handle_action/report/post/${spack_id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${access}`
                },
                body: JSON.stringify({report_type, message})
            }).catch((err) => {console.log(err)})

            if (apiResponse.status === 201){
                // Account Created Successfully
                return res.status(201).json({success: true, message:'Report Successfull'})
            }else{
                return res.status(apiResponse.status).json({error: 'Can\'t add Report'})
            }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}