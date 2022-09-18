import { BACKEND_ROOT_URL } from "../../../config";
import FormData from "form-data";
// import multiparty from 'multiparty';
// import formidable from "formidable";
// Formidable
import cookie from 'cookie';
// import { Formidable } from "formidable";
import formidable from "formidable";
import fs from "fs"
import { request } from "http";
//set bodyparser
export const config = {
    api: {
      bodyParser: false
    }
}

export default async (req, res) => {

    if(req.method.toLowerCase() === "post"){

        const cookies = cookie.parse(req.headers.cookie ?? '');
        let access = cookies.access ?? false;

        let returning_data

        const sendFormBackend = async (fields, files) => {
            let form_data = new FormData();
            form_data.append('title', fields.title);
    
            form_data.append('content_type', fields.content_type ); // audio|text
            if(fields.content_type === 'text'){
                form_data.append('text', fields.text)
            }else{
                Object.keys(files).map((file, index) => {
                    form_data.append(file,fs.readFileSync(files[file].filepath), files[file].originalFilename);
                })

            }
            console.log("here", form_data)
 



            const response = await fetch(`${BACKEND_ROOT_URL}apio/create/daily_share/`, {
                method: 'POST',
                headers: {

                    'Authorization': `Bearer ${access}`,
                    'Accept': 'application/json',

                },
                body: form_data
            });
            const data = await response.json();
            returning_data = data;

            // if(data.error){
                return res.status(response.status).json(data)
            // }
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
            return res.status(201).json(returning_data)

        } catch(e) {

            console.log("reason::", e)

            return res.status(500).json({error: true, message: 'Can\'t able to create account!'})

        }


    }else{
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({error: `Method ${req.method} not allowed`});
    }

}