import { FRONTEND_ROOT_URL } from "../../config";

export default async function get_common_tags(){

    // console.log("CALLED")
        const response = await fetch(`${FRONTEND_ROOT_URL}api/get_common_tags/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const common_tags = await response.json();
        
        // console.log("HERE: ", common_tags)

    if (response.status !== 200){
        // Something went wrong
        return {data: [], error: 'Can\'t get common tags', is_user: false}
    }
    return {data: common_tags.data.common_tags, success: '', is_user: true}

}
