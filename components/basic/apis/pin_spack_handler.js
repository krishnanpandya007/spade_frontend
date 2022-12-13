import { bookmark_post, unbookmark_post } from "./bookmar_post";

function pin_spack_locally(spack_id){

    // Only responsible for Non-Authenticated Users
    // !Limitation: Its browser specific


    if(typeof window !== 'undefined'){

        let pinned_spacks = window.localStorage.getItem('pinned_spacks');

        if(pinned_spacks !== null){

            window.localStorage.setItem('pinned_spacks', JSON.stringify([...JSON.parse(pinned_spacks), spack_id]))

        }else{

            window.localStorage.setItem('pinned_spacks', JSON.stringify([spack_id]))

        }

    }

    return -1; // -1 indicates its saved as anonymous

}

async function pin_spack_globally(spack_id){

    /*
    
    Sync the spack_id log with cloud/server so its accessable through all devices

     - While LocalSync(anonymous pinning) only available for specific platform

    */

    const success = await bookmark_post(spack_id);

    return success ? 1 : 0

}

export async function pin_spack(spack_id, is_authenticated=false){

    return is_authenticated ? await pin_spack_globally(spack_id) : pin_spack_locally(spack_id);

}

export async function unpin_spack(spack_id, prev_pinning_returned_value){

    // prev_pinning_returned_value = -1 means unpin locally
    // prev_pinning_returned_value = 1 means unpin from cloud (globally)

    switch(prev_pinning_returned_value){

        case 0:
            return 0;
        case -1:
            if(typeof window !== 'undefined'){

                let pinned_spacks = window.localStorage.getItem('pinned_spacks');
        
                if(pinned_spacks !== null){
        
                    window.localStorage.setItem('pinned_spacks', JSON.stringify(JSON.parse(pinned_spacks).filter((val) => val !== spack_id)))
        
                }else{
        
                    window.localStorage.setItem('pinned_spacks', JSON.stringify([]))
        
                }
        
            }
            return 1;
        case 1:
            const success = await unbookmark_post(spack_id);
            return success;

        default: 
            return 0;


    }

}