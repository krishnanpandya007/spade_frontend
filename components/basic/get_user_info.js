import { FRONTEND_ROOT_URL } from "../../config";

export default async function getUserInfo(){
    console.log("There we go")
    let res_message;
        const response = await fetch(`${FRONTEND_ROOT_URL}api/get_user_info/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        res_message = await response.json();
        



    console.log("There we go")

    if (response.status !== 200){
        // Something went wrong
        return {data: {}, error: 'Can\'t get user data', is_user: false}
    }
    return {data: res_message, success: '', is_user: true}

}

export async function getStaffUserInfo() {

    console.log("There we go")
    try{


        const response = await fetch(`${FRONTEND_ROOT_URL}api/get_staff_user_info/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).catch((err) => {console.log(err)})
        const res_message = await response.json();
    } catch (err) {
        console.log(err)
    }


    console.log("There we go")

    if (response.status !== 200){
        // Something went wrong
        return {data: {}, error: 'Can\'t get staff user data', is_staff: false}
    }
    return {data: res_message, success: '', is_staff: true}

}