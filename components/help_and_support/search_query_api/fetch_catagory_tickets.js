import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from "../../../config";

export async function fetch_catagory_search_tickets(catagory, search_query) {

    console.log("Called")
    const response = await fetch(`${FRONTEND_ROOT_URL}api/help_and_support/fetch_catagory_search_tickets/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ catagory, search_query })
    });

    const data = await response.json();

    return data.data;

}