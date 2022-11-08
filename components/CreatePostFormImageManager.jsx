import styled from '@emotion/styled'
import { AttachFile } from '@mui/icons-material';
import styles from './CreatePostForm.module.css'
import React from 'react'

const CustomImagesContainer = styled('div')`

display: flex;
flex-direction: row;
align-items: center;
justify-content: flex-start;
gap: 0.8rem;
overflowX: auto;


`

const CustomAttachFile = styled('button')`

background: none;
transition: 0.2s ease-in;

&:hover{

    cursor:pointer;
    box-shadow: 0 0 0 3px #516BEB80;
    transform: translateY(-2px);

}

&:focus{

    outline: 4px solid #516BEB80;

}


`

function CreatePostFormImageManager({images, handleImages}) {

    const fileInputRef = React.useRef(null);
    const addImage = (file) => {

        if(!file) return; // File selection failed

        // Generate preview blob URL;

        handleImages({...images, [`image_${Object.keys(images).length + 1}`]: { content: file, name: file.name, blob_url:  URL.createObjectURL(file)}})

    }

    const removeImage = (code) => {
        // Code E 1 | 2 | 3 | 4

        let tmp_images = {};

        for (let i = 0; i < Object.keys(images).length;i++){

            if((i+1) > code){

                tmp_images[`image_${i}`] = images[`image_${i+1}`];

            }else if((i+1) < code){

                tmp_images[`image_${i+1}`] = images[`image_${i+1}`];
            }

 

        }

        handleImages(tmp_images)

    }

  return (
    <React.Fragment>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '1rem'}}>

            <h2 style={{ fontFamily: 'Chivo', fontWeight: '900', marginBlockStart: '0', fontSize: '1.6rem' }}>Choose or Drop,</h2><span style={{fontFamily: 'Poppins, monospace', letterSpacing: '2px', color: '#A1A1A1', fontSize: '0.9rem'}}>{Object.keys(images).length}/4</span>
        
        </div>

        <CustomImagesContainer>

            {
                Object.keys(images).map((img, idx) => (

                    <div className={styles.jiggly_jelly} key={img.name} style={{position: 'relative', width: '100px', marginRight: '0.4rem', flexShrink: '0'}}>

                        <img height="100" width="100" style={{borderRadius: '15px', objectFit: 'cover'}} src={images[img].blob_url}>
                        
                            {/* Adding Shader for removeImage button */}
                        </img>


                        <div style={{width: '100%', display: 'flex', alignItems: 'end', padding: '0.4rem', justifyContent: 'flex-end', position: 'absolute', height: '40%', transform: 'translateY(-100%)', borderRadius: '0 0 15px 15px', background: 'linear-gradient(to top, black, transparent)'}}>

                            <button onClick={() => {removeImage(idx+1)}} style={{marginLeft: 'auto', padding: '0', margin: '0', background: 'none', border: 'none'}}>
                                <svg style={{color: 'white'}} width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </button>
{/* 1, 2, 3, 4 */}
                        </div>

                        <center style={{fontFamily: 'Chivo', fontWeight: 'lighter', fontSize: '0.8rem', marginTop: '0.3rem'}}>Image-{{ 0: 'A', 1: 'B', 2: 'X', 3: 'Y'}[idx]}</center>
                    
                    </div>
                ))
            }


            <input style={{display: 'none'}} ref={fileInputRef} accept="image/*" onChange={(e) => {addImage(e.target.files[0])}} multiple type="file" />

            {
                Object.keys(images).length < 4 && 
                    <CustomAttachFile onDrop={(e) => {e.preventDefault();addImage(e.dataTransfer.files[0])}} onDragOver={(e) => {e.preventDefault()}} onClick={() => {fileInputRef.current.click()}} style={{ height: '100px', width: '100px', flexShrink: '0', display: 'grid', placeItems: 'center', border: '1px dashed #516BEB', borderRadius: '15px', transform: 'translateY(-0.8rem)'}}>

                        <AttachFile style={{color: '#516BEB'}} />

                        {/* <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.60019 3.30001C9.60019 2.96864 9.33156 2.70001 9.0002 2.70001C8.66883 2.70001 8.4002 2.96864 8.4002 3.30001V8.40001H3.3002C2.96883 8.40001 2.7002 8.66864 2.7002 9.00001C2.7002 9.33138 2.96883 9.60001 3.3002 9.60001H8.4002V14.7C8.4002 15.0313 8.66883 15.3 9.0002 15.3C9.33156 15.3 9.60019 15.0313 9.60019 14.7V9.60001H14.7002C15.0315 9.60001 15.3002 9.33138 15.3002 9.00001C15.3002 8.66864 15.0315 8.40001 14.7002 8.40001H9.60019V3.30001Z" fill="#516BEB"/>
                        </svg> */}

                        <center style={{color: '#516BEB', fontFamily: 'Poppins, Roboto, Chivo, monospace'}}>Attach Pic</center>

                    </CustomAttachFile>

            }



        </CustomImagesContainer>

    </React.Fragment>
  )
}

export default CreatePostFormImageManager