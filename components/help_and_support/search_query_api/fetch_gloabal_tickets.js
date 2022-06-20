import {
    BACKEND_ROOT_URL,
    FRONTEND_ROOT_URL
} from "../../../config";

export async function fetch_gloabal_tickets(search_query) {

    // try{
    const response = await fetch(`${FRONTEND_ROOT_URL}api/help_and_support/fetch_global_tickets/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            search_query: search_query
        })
    });
    const apiData = await response.json();

    console.log(apiData.data)

    return apiData.data;

}