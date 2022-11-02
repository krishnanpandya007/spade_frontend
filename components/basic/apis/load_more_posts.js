import { FRONTEND_ROOT_URL } from "../../../config";

export default async function load_more_posts(filter_by, loadMoreCounter){


        
    const response = await fetch(`${FRONTEND_ROOT_URL}api/load_more_posts/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            filter_by: filter_by,
            load_more_counter: loadMoreCounter
        }) 
    });
    
    const more_posts_data = await response.json();

    return { response, more_posts_data }

}