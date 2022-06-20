import { BACKEND_ROOT_URL } from "../../config";

import cookie from 'cookie';

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'post'){
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({'error': `Method ${req.method} not allowed!`});
    }

   const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;
        const refresh = cookies.refresh ?? false;

    const {
        verify_token_type
    } = req.body;

    if(verify_token_type === 'refresh'){
        if(refresh){

            try{
                const apiResponse = await fetch(`${BACKEND_ROOT_URL}api/verify/`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            token: refresh
                                        })
                                    }).catch((err) => {console.log(err)});
            } catch (err) {
                console.log(err)
            }
            

            if(apiResponse.status === 200){
                return res.status(200).json({'is_valid': true});

            }else{
                return res.status(200).json({'is_valid': false});

            }
        
        }else{
            return res.status(400).json({'error': `Can't validate your crediantials`});

        }
    }else if(verify_token_type === 'access'){
        if(access){

            try{
                const apiResponse = await fetch(`${BACKEND_ROOT_URL}api/verify/`, {
                                        method: 'GET',
                                        headers: {
                                            'Content-Type': 'application/json',
                                            'Accept': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            token: access
                                        })
                                    }).catch((err) => {console.log(err)});
            } catch (err) {
                console.log(err)
            }
            

            if(apiResponse.status === 200){
                return res.status(200).json({'is_valid': true});

            }else{
                return res.status(200).json({'is_valid': false});

            }
        
        }else{
            return res.status(400).json({'error': `Can't validate your crediantials`});

        }
    }else{
        return res.status(400).json({'error': `No such token types found`});
        
    }



}