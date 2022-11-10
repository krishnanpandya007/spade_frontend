import { CheckOutlined, Compress } from '@mui/icons-material'
import { Alert, AlertTitle, CircularProgress, LinearProgress } from '@mui/material'
import React from 'react'
import imageCompression from 'browser-image-compression'
import { useEffect } from 'react'
import { IMAGE_COMPRESSION_THRESHOLD } from '../../config'

const compressionOptions = {

    maxSizeMB: 1,
    maxWidthOrHeight: 500,
    useWebWorker: true

}

function ImageCompressor({imgs, setImgs, success_cb}) {

    const [compressionState, setCompressionState] = React.useState('compressing') // compressing | compressed | false => false means error
    console.log("Im In")
    useEffect(async () => {

        setCompressionState('compressing');

        let copy_imgs = imgs;

        for(const image of Object.keys(imgs)){

            if((imgs[image].content.size / 1024 / 1024) < IMAGE_COMPRESSION_THRESHOLD){
                continue;
            }

            let compressedFile = await imageCompression(imgs[image].content, compressionOptions);
            copy_imgs[image].content = compressedFile;

        }

        // Finally sync with global state
        setImgs(copy_imgs);
        setCompressionState('compressed')

        success_cb(true); // If now its unable to compress force to submit as it is!

    }, [])

    return (
    <Alert severity='info' icon={compressionState === 'compressing' ? <CircularProgress size={15} /> : <CheckOutlined /> }>

        <AlertTitle>Seamless Compression</AlertTitle>

        Original Size: <b>{Object.keys(imgs).reduce((acc, curr) => acc + Math.ceil((imgs[curr].content?.size)/1024/1024), 0)}MB</b> will be compressed to save your data. 🙂
        
        <br/>
        <br/>
        <a style={{textDecoration: 'underline', opacity: '0.7'}} href="https://docs.spadebeta.in/feature/seamless-compression">Know more.</a>
    </Alert>
  )
}

export default ImageCompressor