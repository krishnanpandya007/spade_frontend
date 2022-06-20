export function onlyWithAuth(C_function, P_auth) {

    if (P_auth.is_authenticated) {

        return C_function 

    } else {

        P_auth.set_open_drawer(true, "Sign-In Required!")

        return ()=>{}
    }

}