import { BACKEND_ROOT_URL } from "../../../../config";
import FormData from "form-data";
import cookie from 'cookie';
import fs from "fs";
import { formidable } from "formidable";
//set bodyparser
// export const config = {
//     api: {
//       bodyParser: false
//     }
// }


export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){
        // Register new account

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;
       
        if (!access){
            return res.status(403).json({error: "user not authenticated"})
        }

        const sendFormBackend = async (fields, files) => {
            let form_data = new FormData();
 
            Object.keys(files).map((file, index) => {
                form_data.append(file,fs.readFileSync(files[file].filepath), files[file].originalFilename);
            })

            console.log("About to hit")

            const response = await fetch(`${BACKEND_ROOT_URL}profile/edit/profile_pic/`, {
                method: 'POST',
                headers: {

                    'Authorization': `Bearer ${access}`,
                    'Accept': 'application/json',


                },
                body: form_data
            });
            const data = await response.json();
            
            console.log("BUMBUM:::", data)
            if(data.error){
                return res.status(401).json({error: data.error})
            }
            return data
        }

        try{
            const data = await new Promise((resolve, reject) => {
                const form = new formidable.IncomingForm()
            
                form.parse(req, async (err, fields, files) => {

                    const data = await sendFormBackend(fields, files)
                    if (err) reject({ err })
                    resolve({ err, fields, files })
                }) 
            })
            return res.status(200).json({success: 'Profile Pic. Updated'})

        } catch(e) {

            console.log("reason::", e)

            return res.status(500).json({error: 'Can\'t able to create account!'})

        }




    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json(JSON.stringify({error: `Method ${req.method} not allowed`}));
    }

}