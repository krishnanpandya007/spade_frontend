import React from 'react'
import styled from "@emotion/styled"
import styles from './CreatePostForm.module.css'

const StyledInput = styled('input')`

padding: 1rem 1.5rem;
border-radius: 10px;
border-bottom: 2px solid white;
background-color: #ffffff70;
border: none;
font-size: 1.2rem;
font-family: Chivo, monospace;
letter-spacing: 1px;
flex: 1;
outline: none;

&:focus{

    outline: 3px solid #ffffff90;

}


&::placeholder{
    font-family: Poppins;
    color: #ffffff;
    font-weight: 500;
    letter-spacing: 0;
    font-size: 0.99rem;
}

`

const CustomButton = styled('button')`

height: 48px;
aspect-ratio: 1;
background-color: white;
box-shadow:0px 4px 4px rgba(0, 0, 0, 0.25);
border: none;
border-radius: 10px;
outline: none;
display: grid;
place-items: center;

&:focus{

    outline: 3px solid #ffffff90;

}


`

const CustomTagsContainer = styled('div')`

width: 100%;
padding: 1rem;
border-radius: 10px;
background-color: #ffffff30;
height: clamp(200px, 22vh, 300px);
margin: 1.5rem 0;
text-align: center;
font-family: Poppins, monospace;
font-size: 0.9rem;
color: #ffffff60;
position: relative;

`

const CustomTagsContainerCore = styled('div')`

display: flex;
flex-wrap: wrap;
flex-direction: row;


`

const CustomTag = styled('div')`

padding: 0.5rem 1rem;
border-radius: 100px;
background-color: white;
color: #00000090;
font-family: Chivo;
font-weight: 500;
height: auto;
display: flex;
align-items: center;
gap: 0.5rem;
margin-right: 0.8rem;
margin-bottom: 0.8rem;
justify-content: space-between;

& button:focus{

    outline: 3px solid #e74c3c70;

}


`

function SlugifyTagName (tag_name) {

    var special_symbols = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/;

    if (special_symbols.test(tag_name)){
        // Contains Special Chars
        return 0;
    }else{
        // Valid Tag Name
        return tag_name.replace(/\s+/g, '-').toLowerCase();
    }
}

function CreatePostTagManager({ tags, addTag, removeTag }) {

    const [showTrendingTags, setShowTrendingTags] = React.useState(false);
    const [tagValue, setTagValue] = React.useState('');

  return (
    <React.Fragment>
        <div style={{display: 'flex', alignItems: 'center', width: '100%', gap: '1.5rem'}}>
            <StyledInput value={tagValue} onChange={(e) => {setTagValue(e.target.value)}} onKeyDown={(e) => {e.key === 'Enter' && (addTag(SlugifyTagName(tagValue)) || setTagValue(''))}} placeholder='Smash up a Tag' maxLength={20} />
            <CustomButton onClick={() => {addTag(SlugifyTagName(tagValue));setTagValue('')}}>
                <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="black"/>
                </svg>
            </CustomButton>

        </div>

        <CustomTagsContainer>

            {showTrendingTags ? 
                <div className={styles.jiggly_jelly} style={{ padding: '1rem', borderRadius: '15px', zIndex:1, backgroundColor: '#ffffff', position: 'absolute', right: '1rem', bottom: '1rem'}}>
                    <button onClick={() => {addTag('call-of-duty')}} style={{color: 'black', background: 'none', borderRadius: '10px', padding: '0.3rem', border: 'none', fontFamily: 'Poppins', fontSize: '0.9rem'}}>call-of-duty</button><br/>
                    <button onClick={() => {addTag('valorant')}} style={{color: 'black', background: 'none', borderRadius: '10px', padding: '0.3rem', border: 'none', fontFamily: 'Poppins', fontSize: '0.9rem'}}>valorant</button><br/>
                    <button onClick={() => {addTag('coding')}} style={{color: 'black', background: 'none', borderRadius: '10px', padding: '0.3rem', border: 'none', fontFamily: 'Poppins', fontSize: '0.9rem'}}>coding</button><br/>
                    <button onClick={() => {addTag('gaming')}} style={{color: 'black', background: 'none', borderRadius: '10px', padding: '0.3rem', border: 'none', fontFamily: 'Poppins', fontSize: '0.9rem'}}>gaming</button><br/>
                    
                    <hr/>

                    <div style={{display: 'flex', alignItems :'center', justifyContent: 'space-between'}}>

                        <b style={{fontFamily: 'Chivo', color: '#b7b7b7'}}>Trending</b>
                        <button onClick={() => {setShowTrendingTags(false)}} style={{marginLeft: 'auto', padding: '0', margin: '0', background: 'none', border: 'none'}}>
                            <svg style={{color: '#00000095'}} width="17" height="17" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                </div>
            : <CustomButton onClick={() => {setShowTrendingTags(true)}} style={{position: 'absolute', right: '0', bottom: '0', transform: 'scale(0.6)', aspectRatio: '11/9', opacity: '0.9'}}>
                
                        <svg width="25" height="25" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 3.25V1H13.25" stroke="#2329D6" strokeWidth="2" strokeLinecap="square"/>
            <path d="M2 8.5L6.39529 4.19378L9.32548 7.06459L14.75 1.75" stroke="#2329D6" stroke-Width="2" stroke-Linecap="square"/>
            </svg>

                </CustomButton>}
           {
            tags.length === 0?
            <div style={{width: '100%', height: '100%', display :'grid', placeItems: 'center'}}> No Tags, currently</div>:
            <CustomTagsContainerCore>
                {
                    tags.map((tag, idx) => (

                        <CustomTag className={styles.jiggly_jelly} key={idx}>
                            {tag}
                            {/* add focus bg */}
                            <button onClick={(e) => {removeTag(tag)}} style={{boxShadow: 'none', padding: '0', background:'none', border: 'none', display: 'grid', placeItems: 'center', borderRadius: '100px'}}>
                                <svg width="15" height="15" preserveAspectRatio='none' viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                            </button>
                        </CustomTag>

                    ))
                }

            </CustomTagsContainerCore>
            }


        </CustomTagsContainer>
        <center style={{color: 'white', fontFamily: 'Chivo', fontSize: '0.9rem'}} >Make it Reachable to relevant users.</center>
    </React.Fragment>
  )
}

export default CreatePostTagManager