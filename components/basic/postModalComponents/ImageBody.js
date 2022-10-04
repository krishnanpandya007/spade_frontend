// import { CheckCircleOutlineRounded } from "@material-ui/icons";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import PropTypes from "prop-types"
// import useState from 'react'
import { useContext, useEffect } from "react";
import { BACKEND_ROOT_URL } from "../../../config";
import authContext from "../contexts/layout_auth_context";

function ImageBody({images, createMode}) {

    const auth = useContext(authContext)


    const imagesHeight = auth.is_on_mobile ? 'auto' : 400;
    const imagesWidth = auth.is_on_mobile ? window.innerWidth * 0.6 : 400;


    return (
        <div style={{display: 'flex', flexWrap: 'wrap', marginTop: '2rem'}}>
                {createMode && <div >
                        <h2 style={{color: 'grey'}}>Attached Images will be Shown here.</h2>
                    </div>}
                <strong style={{marginTop: '0.9rem'}}>Image - A</strong>
                <br/>
                <br/>

                {   !createMode ?

                    ( images[0] && 
                       <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={BACKEND_ROOT_URL.slice(0,-1)+images[0]}
                    
                    
                    id="display_image_a"
                    style={{ width: '100%'}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    null
            }
                <br/>
                <strong style={{marginTop: '0.9rem'}}>Image - B</strong>


                {   !createMode ?

                    ( images[1] && 
                        <img
                    src={createMode ? images[1] : BACKEND_ROOT_URL.slice(0,-1)+images[1]}
                    style={{ width: '100%'}}
                    id="display_image_a"
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    null
                    }
                    

                <strong style={{marginTop: '0.9rem'}}>Image - X</strong>



                {   !createMode ?

                    ( images[2] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={createMode ? images[2] : BACKEND_ROOT_URL.slice(0,-1)+images[2]}
                    style={{ width: '100%'}}
                    id="display_image_a"
                    // style={{backgroundImage: `url(${images[3]})`}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    null
                    }
                    {/* <Badge badgeContent={<CheckCircleOutlineRounded />} style={{border: '1px solid red', width: '10%'}}> */}
                    

                <strong style={{marginTop: '0.9rem'}}>Image - Y</strong>


                {   !createMode ?

                    ( images[3] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={BACKEND_ROOT_URL.slice(0,-1)+images[3]}
                    style={{ width: '100%'}}
                    id="display_image_a"
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    null
                }


        </div>
    )
}

export default ImageBody

ImageBody.propTypes = {

    images: PropTypes.array

}

ImageBody.defaultProps = {

    images: [null, null, null, null] // Length Of 4 always (A, B, X, Y)

}
