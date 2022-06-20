import redirect_login from "./redirect_login";

import cookie from 'cookie';
import { BACKEND_ROOT_URL, CLIENT_ID, CLIENT_SECRET } from "../config";


async function get_user_info(access_token) {

    console.log("InFunc. access: ", access_token)

    const user_info_response = await fetch(`${BACKEND_ROOT_URL}account/user/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    })

    const user_info_data = await user_info_response.json();

    if(user_info_response.status === 401){
        return { is_authenticated: false, message: 'Successfully Recieved User Information', user_info: user_info_data }

    }

    console.log(user_info_data) 

    return { is_authenticated: true, message: 'Successfully Recieved User Information', user_info: user_info_data }

}



export async function validate_user(context) {

    // If access is available then user is authenticated

    // console.log(cookies.access)

    // const response = context.res;


    const cookies = context.req.cookies;
    const access  = cookies.access ?? false;
    const refresh = cookies.refresh ?? false;

    console.log("In Function")


    if(access) {

        return await get_user_info(access);

    }else{
        
        if (refresh){

            console.log("In Refresh")

            // Set access token to client

            //NOTE: HARD_CODED_URL

            try{

                const backend_response = await fetch(`${BACKEND_ROOT_URL}auth/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({ refresh_token: refresh, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, grant_type: 'refresh_token' })
                }) 

                const backend_data = await backend_response.json();

                console.log("BACKEND_DATA: ", backend_data);

                let new_access = backend_data.access_token;
                let new_refresh = backend_data.refresh_token;
                let expires_in = backend_data.expires_in;

                // Set cookie on header
                context.res.setHeader('Set-Cookie', [cookie.serialize(
                        'access', new_access, {
                            httpOnly: true,
                            secure: false, // If in-production => true; else false // *****HARDCODED******
                            maxAge: expires_in, // In Seconds
                            sameSite: 'strict',
                            path: '/'
                            }
                        ),
                        cookie.serialize(
                            'refresh', new_refresh, {
                                httpOnly: true,
                                secure: false, // If in-production => true; else false // *****HARDCODED******
                                maxAge: expires_in, // In Seconds
                                sameSite: 'strict',
                                path: '/'
                                }
                            )
                    ]
                );

                return await get_user_info(new_access);

            } catch (e) {

                console.log(e)
                return {is_authenticated: false, message: 'Can\'t able to set Access token!'}

            }

        } else {

            // Re-login!!

            // const success = await redirect_login(context.res);




            return {is_authenticated: false, message: 'User needs to re-login'}

        }

    }

}