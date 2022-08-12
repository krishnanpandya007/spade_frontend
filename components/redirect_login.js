export default async function redirect_login(res, login_url='/login') {

    //Returns Flag (if reditrect successfull or not)

    try{

        // console.log("Redirecting to login page")

        res.setHeader("location", login_url);
        res.statusCode = 302;
        res.end();

        return true;

    } catch(e) {

        // console.log(e)

        return false;

    }



}