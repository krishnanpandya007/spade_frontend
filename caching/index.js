import cache from 'memory-cache'
import { BACKEND_ROOT_URL } from '../config';



export async function get_posts_by_tagname(tag_name) {

    
    const url = 'cache_posts/tag_name/';
    
    const cachedResponse = cache.get(url + tag_name + '/');

    if (cachedResponse) {

        return cachedResponse;

    } else {

    // (Set) or Re-validate

    const hours = 24;

    const total_miliseconds = hours * 1000 * 60 * 60;

    const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/tag/${tag_name}/`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    });

    // console.log("*********FETCHED********")

    const data = await response.json();

    // const post_ids = data.map((val, idx) => val.id)

    // //Update in the records
    // update_cache_postids_to_url(post_ids, url + catagory + '/');


    // console.log(data)

    cache.put(url + tag_name + '/', data, total_miliseconds);
    
    return data;

    }


}



export async function get_posts_by_author(author) {

    
    const url = 'cache_posts/created_posts/';
    
    const cachedResponse = cache.get(url + author + '/');

    if (cachedResponse) {

        return cachedResponse;

    } else {

    // (Set) or Re-validat${BACKEND_ROOT_URL}
    const response = await fetch(`${BACKEND_ROOT_URL}account/load_profile/`,{
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        },
        body: JSON.stringify({
            username: author
        })
    });

    // console.log("*********FETCHED********")

    const data = await response.json();


    // const post_ids = data.map((val, idx) => val.id)

    // //Update in the records
    // update_cache_postids_to_url(post_ids, url + catagory + '/');


    // console.log(data)

    cache.put(url + author + '/', data); // Cache-Forever
    
    return data;

    }


}


export async function get_relevant_posts_by_searchquery(search_query) {


    const url = 'cache_posts/relevant_posts/';
    
    const cachedResponse = cache.get(url + search_query + '/');

    if (cachedResponse) {

    return cachedResponse;

    } else {

    // (Set) or Re-validate

    const hours = 24;

    const total_miliseconds = hours * 1000 * 60 * 60;

    const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/search_query/${search_query}/`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    });

    // console.log("*********FETCHED********")

    const data = await response.json();

    // const post_ids = data.map((val, idx) => val.id)

    // //Update in the records
    // update_cache_postids_to_url(post_ids, url + catagory + '/');


    // console.log(data)

    cache.put(url + search_query + '/', data, total_miliseconds);
    
    return data;

    }


}


export async function get_relevant_posts_by_postid(id) {

    
    const url = 'cache_posts/relevant_posts/';
    
    const cachedResponse = cache.get(url + id + '/');

    if (cachedResponse) {

    return cachedResponse;

    } else {

    // (Set) or Re-validate

    const hours = 24;

    const total_miliseconds = hours * 1000 * 60 * 60;

    const response = await fetch(`${BACKEND_ROOT_URL}apio/get_posts/post_id/${id}/`,{
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
    });

    // console.log("*********FETCHED********")

    const data = await response.json();

    // const post_ids = data.map((val, idx) => val.id)

    // //Update in the records
    // update_cache_postids_to_url(post_ids, url + catagory + '/');


    // console.log(data)

    cache.put(url + id + '/', data, total_miliseconds);
    
    return data;

    }


}

export async function get_posts_by_catagory(catagory, access=false) {

    let headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

    if(access){
        headers['Authorization'] = `Bearer ${access}`
    }

    const url = 'cache_posts/catagory/';
    
    const cachedResponse = cache.get(url + catagory + '/');

    if (cachedResponse) {

    return cachedResponse;

    } else {

    // (Set) or Re-validate

    const hours = 1;

    const total_miliseconds = hours * 1000 * 60 * 60;

    const response = await fetch(`${BACKEND_ROOT_URL}apio/load_posts/`,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
        quantity: 5,
        catagory: catagory
        })
    });

    // console.log("*********FETCHED********")
    // console.log("Status::", response.status)

    const data = await response.json();

    // const post_ids = data.map((val, idx) => val.id)

    // //Update in the records
    // update_cache_postids_to_url(post_ids, url + catagory + '/');


    // console.log(data)

    cache.put(url + catagory + '/', data, total_miliseconds);
    
    return data;

    }


}