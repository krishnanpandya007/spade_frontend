import { BACKEND_ROOT_URL } from "../../../config";

export default async function get_search_results(search_query, n_posts) {

    // try{
        const response = await fetch(`../../api/load_search_query_posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                search_query,
                n_posts
            })
        });
        const apiData = await response.json();


    if (response.status === 200){
        
        return apiData; // Either its true or false

    } else {
        return false;
    }

}