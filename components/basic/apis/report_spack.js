import { FRONTEND_ROOT_URL } from "../../../config";

export async function report_spack_as_inappropriate(spack_id){

    const descr = prompt('Your In-Brief view that makes this spack inappropriate,')

    if(!descr) return -1; // user doesnt provide valid descr

    const report_response = await fetch(`${FRONTEND_ROOT_URL}api/report_post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({

            spack_id: spack_id,
            type: 'INAPPROPRIATE_SPACK',
            message: descr

        })
    })

    const success = report_response.status;
    
    return success ? 1 : 0

}

export async function report_spack_as_nonspack(spack_id){

    const report_response = await fetch(`${FRONTEND_ROOT_URL}api/report_post`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({

            spack_id: spack_id,
            type: 'NON_SPACK',
            message: -1

        })
    })

    const success = report_response.status;
    
    return success ? 1 : 0

}