// import { CheckCircleOutlineRounded } from "@material-ui/icons";
import { CheckCircleOutlineRounded } from "@mui/icons-material";
import PropTypes from "prop-types"
// import useState from 'react'
import { useEffect } from "react";

function ImageBody({images, createMode}) {

    const imagesHeight = 400;
    const imagesWidth = 400;

    useEffect(() => {
    console.log('http://localhost:8000'+images[0])        
    }, [])

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>


                {   !createMode ?

                    ( images[0] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={'http://localhost:8000'+images[0]}
                    
                    width={!images[0] && imagesWidth}
                    height={imagesHeight}
                    id="display_image_a"
                    style={{backgroundColor: 'red'}}
                    // style={{backgroundImage: `url(${images[3]})`}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    <div style={{display: 'grid', placeItems: 'center', width: `${imagesWidth}px`, height: `${imagesHeight}px`, border: '1px solid grey', borderRadius: '6px'}}>
                        <h3 style={{color: 'grey'}}>{imagesWidth} x {imagesHeight}</h3>
                    </div>
                    }
                    {/* <Badge badgeContent={<CheckCircleOutlineRounded />} style={{border: '1px solid red', width: '10%'}}> */}
                    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <h4 style={{borderColor: 'grey', border: '1px solid', padding: '0.5% 1.3%', borderRadius: '5px'}}>Image-A</h4>
                        {   createMode && images[0]?

                        <CheckCircleOutlineRounded color="primary" style={{marginLeft: '2%'}} />:null

                        }
                    </div>

                    {/* </Badge> */}
                </div>
                <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}> 


                {   !createMode ?

                    ( images[1] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={createMode ? images[1] : 'http://localhost:8000'+images[1]}
                    alt="Picture of the author"
                    height={imagesHeight}
                    width={!images[1] ? imagesWidth : 'auto'}
                    id="display_image_a"
                    // style={{border: `red`}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    <>
                    <div style={{display: 'grid', placeItems: 'center', width: `${imagesWidth}px`, height: `${imagesHeight}px`, border: '1px solid grey', borderRadius: '6px'}}>
                        <h3 style={{color: 'grey'}}>{imagesWidth} x {imagesHeight}</h3>
                    </div>
                    </>
                    }
                    {/* <Badge badgeContent={<CheckCircleOutlineRounded />} style={{border: '1px solid red', width: '10%'}}> */}
                    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <h4 style={{borderColor: 'grey', border: '1px solid', padding: '0.5% 1.3%', borderRadius: '5px'}}>Image-B</h4>
                        {   createMode && images[1]?

                        <CheckCircleOutlineRounded color="primary" style={{marginLeft: '2%'}} />:null

                        }
                    </div>

                </div>
                <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}>



                {   !createMode ?

                    ( images[2] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={createMode ? images[2] : 'http://localhost:8000'+images[2]}
                    alt="Picture of the author"
                    height={imagesHeight}
                    // height={imagesHeight}
                    width={!images[2] ? imagesWidth : 'auto'}
                    id="display_image_a"
                    // style={{backgroundImage: `url(${images[3]})`}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    <div style={{display: 'grid', placeItems: 'center', width: `${imagesWidth}px`, height: `${imagesHeight}px`, border: '1px solid grey', borderRadius: '6px'}}>
                        <h3 style={{color: 'grey'}}>{imagesWidth} x {imagesHeight}</h3>
                    </div>
                    }
                    {/* <Badge badgeContent={<CheckCircleOutlineRounded />} style={{border: '1px solid red', width: '10%'}}> */}
                    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <h4 style={{borderColor: 'grey', border: '1px solid', padding: '0.5% 1.3%', borderRadius: '5px'}}>Image-X</h4>
                        {   createMode && images[2]?

                        <CheckCircleOutlineRounded color="primary" style={{marginLeft: '2%'}} />:null

                        }
                    </div>

                </div>
                <div style={{flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly'}}> 

                {   !createMode ?

                    ( images[3] && 
                        <img
                    // src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                    src={'http://localhost:8000'+images[3]}
                    alt="Picture of the author"
                    height={imagesHeight}
                    width={!images[3]  ? imagesWidth : 'auto'}
                    // height={imagesHeight}
                    id="display_image_a"
                    // style={{backgroundImage: `url(${images[3]})`}}
                    /> || 
                    <div style={{width: 3/2*imagesWidth, height: imagesHeight, display: 'grid', placeItems: 'center', border: `1px solid ${'#bdbdbd'}`, borderRadius: '4px'}} >No Attachment</div>
                    ):
                    <div style={{display: 'grid', placeItems: 'center', width: `${imagesWidth}px`, height: `${imagesHeight}px`, border: '1px solid grey', borderRadius: '6px'}}>
                        <h3 style={{color: 'grey'}}>{imagesWidth} x {imagesHeight}</h3>
                    </div>
                    }
                    {/* <Badge badgeContent={<CheckCircleOutlineRounded />} style={{border: '1px solid red', width: '10%'}}> */}
                    <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <h4 style={{borderColor: 'grey', border: '1px solid', padding: '0.5% 1.3%', borderRadius: '5px'}}>Image-Y</h4>
                        {   createMode && images[3]?

                        <CheckCircleOutlineRounded color="primary" style={{marginLeft: '2%'}} />:null

                        }
                    </div>

                </div>
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
