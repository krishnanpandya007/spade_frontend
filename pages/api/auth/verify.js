import { BACKEND_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from "../../../config";

import cookie from 'cookie';

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({'error': `Method ${req.method} not allowed!`});
    }

   const cookies = cookie.parse(req.headers.cookie ?? '');
    const access = cookies.access ?? false;
    const refresh = cookies.refresh ?? false;
    const has_at = cookies.has_at ?? false;

    if(access){
        // Request For Account Information

        const user_info_response = await fetch(`${BACKEND_ROOT_URL}account/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${access}`
            }
        })
    
        const user_info_data = await user_info_response.json();


        if(user_info_response.status === 200 && !has_at) {

            res.setHeader('Set-Cookie', [
                cookie.serialize(
                    'has_at', "true", {
                        httpOnly: false,
                        secure: false, 
                        maxAge: 60*60*24*30*2, // 2 months
                        sameSite: 'strict',
                        path: '/'
                    }
            )])

        }

        return res.status(user_info_response.status).json({...user_info_data, 'login_needed': false, 'error': false});
        

    }else {

        if(refresh){

            const backend_response = await fetch(`${BACKEND_ROOT_URL}auth/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ refresh_token: refresh, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token' })
            }) 

            const backend_data = await backend_response.json();

            return res.status(backend_response.status).json({...backend_data, 'login_needed': false, 'error': false});


        }else {

            return res.status(401).json({'login_needed': true, 'error': 'No required credentials found!, Please re-login'});

        }

    }

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