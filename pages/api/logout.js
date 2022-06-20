import { BACKEND_ROOT_URL } from "../../config";

import cookie from 'cookie';

export default async (req, res) => {

    if (req.method.toLowerCase() !== 'get'){
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({'error': `Method ${req.method} not allowed!`});
    }

    console.log("You just Hitit")

    res.setHeader('Set-Cookie', [cookie.serialize(
            'access', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 0, // expires now
                sameSite: 'strict',
                path: '/'
                }
            ),
            cookie.serialize(
                'refresh', '', {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    maxAge: 0, // expires now
                    sameSite: 'strict',
                    path: '/'
                }
            )
        ]
    );

    return res.status(200).json({"success": "You have logged Out Successfully"});



}