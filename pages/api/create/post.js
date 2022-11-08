import { BACKEND_ROOT_URL } from "../../../config";

import authenticate from "../authenticate";
import FormData from "form-data";
// import multiparty from 'multiparty';
// import formidable from "formidable";
// Formidable
import cookie from 'cookie';
// import { Formidable } from "formidable";
import formidable from "formidable";
import fs from "fs"
//set bodyparser
export const config = {
    api: {
      bodyParser: false
    }
}

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){

        console.log("Inside")
        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;


        const sendFormBackend = async (fields, files) => {
            let form_data = new FormData();
            form_data.append('title', fields.title);
    
            form_data.append('descr', fields.descr);
            form_data.append('tags', fields.tags);
 
            Object.keys(files).map((file, index) => {
                form_data.append(file,fs.readFileSync(files[file].filepath), files[file].originalFilename);
            })



            const response = await fetch(`${BACKEND_ROOT_URL}apio/create/post/`, {
                method: 'POST',
                headers: {

                    'Authorization': `Bearer ${access}`,
                    'Accept': 'application/json',


                },
                body: form_data
            });
            const data = await response.json();
            
            if(data.error){
                return res.status(response.status).json(data)
            }
            return data
        }

        try{
            
            const data = await new Promise((resolve, reject) => {
                const form = new formidable.IncomingForm()
            
                form.parse(req, async (err, fields, files) => {

                    const data = await sendFormBackend(fields, files)
                    if (err) reject({ err })


                    return res.status(201).json(data)
                    resolve({ err, fields, files })
                }) 
            })

        } catch(e) {

            console.log("reason::", e)

            return res.status(500).json({error: true, message: 'Can\'t able to create account!'})

        }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}