import {Avatar, Box, Button, Chip, CircularProgress, Container, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, List, ListItem, ListItemAvatar, ListItemText, Modal, OutlinedInput, Paper, Snackbar, TextField, Tooltip, Typography } from '@mui/material'

import { Add, AddPhotoAlternateOutlined, AttachFile, AttachFileOutlined, CloudUploadOutlined, Delete, DeleteOutlined, FileCopyOutlined, FolderSpecialOutlined, RemoveCircleOutline, RemoveCircleOutlined, RemoveOutlined } from '@mui/icons-material';

import React, { useContext, useEffect } from 'react';
import PostModal from './basic/PostModal';

import { Alert } from '@mui/material';
import { styled } from '@mui/system';
import { BACKEND_ROOT_URL, FRONTEND_ROOT_URL } from '../config';
import PostModalContext from './basic/contexts/post_modal_context';
import authContext from './basic/contexts/layout_auth_context';
import SnackbarContext from './basic/contexts/snackbar_context';
// import { LoadingButton } from '@mui/lab';
// import LoadingButton from '@material-ui/core/Loa'
// LoadingButton
// import Alert from '@material-ui/core/Alert'

const Input = styled('input')({
    display: 'none',
});


function GetFileExtention (file){
    if(file){
        return file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2);
    }else{
        return null;
    }
}


function CreatePostForm({ChangeChipData, chip_data}) {

    const [editorData, setEditorData] = React.useState('');
    const [tagInputValue, setTagInputValue] = React.useState('');
    const [invalidTagStatus, setInvalidTagStatus] = React.useState({is_invalid: false, message: ''})
    const [publishing, setPublishing] = React.useState(false)
    const [postTitle, setPostTitle] = React.useState('');

    // const [attachedFiles, setAttachedFiles] = React.useState(Object.freeze({image_a: {name: null, content: null}, image_b: {name: null, content: null}, image_x: {name: null, content: null}, image_y: {name: null, content: null}}))
    const [imageA, setImageA] = React.useState(null)
    const [imageB, setImageB] = React.useState(null)
    const [imageX, setImageX] = React.useState(null)
    const [imageY, setImageY] = React.useState(null)


    const editorRef = React.useRef()
    const [ editorLoaded, setEditorLoaded ] = React.useState( false )
    const { CKEditor, ClassicEditor} = editorRef.current || {}

    const [tags, setTags] = React.useState(new Array({key: 0, value: 'something'}, {key: 1, value: 'anotherThing'}))   
    const [imageModalOpen, setImageModalOpen] = React.useState(false);
    const [postModalOpen, setPostModalOpen] = React.useState(false);

    const [dummy, setDummy] = React.useState('');

    const postModal = useContext(PostModalContext);
    const auth = useContext(authContext);
    const snackbar = useContext(SnackbarContext);

    const handleImageModalOpen = () => setImageModalOpen(true);

    const handleImageModalClose = () => setImageModalOpen(false);

    
    const handlePostModalOpen = () => {

        postModal.set_data({
            post_id: -1,
            title: postTitle,
            descr: editorData,
            author: auth.user_data.username ?? "username",
            profile_pic: auth.user_data.profile_pic,
            create_mode: true,
            open: true,
            likes_count: 0,
            dislikes_count: 0,
            images: [],
            is_liked:false,
            is_disliked: false,
            is_bookmarked: false,
            len_tags: chip_data.length,


        })

    };

    const handlePostModalClose = () => {
        postModal.set_open(false);
    };

    

    const handleSnackbarClose = () => {
        setInvalidTagStatus({is_invalid: false, message: ''})
    }

    const handlePostTitleChange = (InputEvent) => {
        setPostTitle(InputEvent.target.value)
    }

    const handlePublish = () => {
        setPublishing(!publishing)
    }

    const IncreaseHeightOfEditor = () => {
        var element = document.querySelector('[aria-label="Rich Text Editor, main"]');
        element.style.minHeight = '300px'
    }

    const FocusCkEditor = () => {
        var element = document.querySelector('[aria-label="Rich Text Editor, main"]');
        element.focus();
    }

    const handleFileAttachmentChange = (event, file_id) => {
        if(!event.target.files[0]){
            console.warn("Invalid Image Upload formation found!")

            return
        }
        console.log("FileName: " + event.target.files[0])

        
        switch (file_id) {
            case "a":
                // setAttachedFiles({image_a: {name: event.target.files[0].name, content: event.target.files[0]}, image_b: attachedFiles.image_b, image_x: attachedFiles.image_x, image_y: attachedFiles.image_y});
                setImageA(event.target.files[0])

                break;

            case "b":


                setImageB(event.target.files[0])
                console.log(imageB);
                break;

            case "x":


                // setAttachedFiles({image_x: {name: event.target.files[0].name, content: event.target.files[0]}, image_a: attachedFiles.image_a, image_b: attachedFiles.image_b, image_y: attachedFiles.image_y});
                setImageX(event.target.files[0])
                console.log(imageX);
                // console.log(attachedFiles);
                break;
    
            case "y":


                setImageY(event.target.files[0])
                console.log(imageY);
                // setAttachedFiles({image_y: {name: event.target.files[0].name, content: event.target.files[0]}, image_a: attachedFiles.image_a, image_x: attachedFiles.image_x, image_b: attachedFiles.image_b});
                // console.log(attachedFiles);
                break;

            default:
                console.warn("Invalid Change formation found!")
                break;

        }

        // setAttachedFiles({image_a: (file_id==='a' ? {name: event.files[0].name, content: 'full content'} : attachedFiles[image_a]), image_b: (file_id==='b' ? {name: event.files[0].name, content: 'full content'} : attachedFiles[image_b]), image_x: (file_id==='x' ? {name: event.files[0].name, content: 'full content'} : attachedFiles[image_x]), image_y: (file_id==='y' ? {name: event.files[0].name, content: 'full content'} : attachedFiles[image_y])})


        //After knowing file_id set the updated value in state (variable)


    }

     const removeImage = (event, image_id) => {
        switch (image_id[image_id.length - 1]) {
            case "a":
                // setAttachedFiles({image_a: {name: null, content: ''}, image_b: attachedFiles.image_b, image_x: attachedFiles.image_x, image_y: attachedFiles.image_y});
                setImageA(null)
                console.log(imageA);
                // console.log(attachedFiles);
                break;
            case "b":
                // setAttachedFiles({image_b: {name: null, content: ''}, image_a: attachedFiles.image_a, image_x: attachedFiles.image_x, image_y: attachedFiles.image_y});
                setImageB(null)
                console.log(imageB);
                // console.log(attachedFiles);

                break;

            case "x":
                // setAttachedFiles({image_x: {name: null, content: ''}, image_a: attachedFiles.image_a, image_b: attachedFiles.image_b, image_y: attachedFiles.image_y});
                setImageX(null)
                console.log(imageX);
                // console.log(attachedFiles);

                break;
    
            case "y":
                // setAttachedFiles({image_y: {name: null, content: ''}, image_a: attachedFiles.image_a, image_x: attachedFiles.image_x, image_b: attachedFiles.image_b});
                setImageY(null)
                console.log(imageY);
                // console.log(attachedFiles);

                break;

            default:
                console.warn("Invalid Remove Action found!")
                break;
        }
     } 


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



    const DeleteTag = (tag_name) => {

        let new_chipData = chip_data
        let decreaser = 0;
        let target_index = -1;
        for(let i = 0; i < new_chipData.length; i++){
            if(new_chipData[i].label === tag_name){
                decreaser = 1;
                target_index = i;
                continue;
            }
            new_chipData[i].key -= decreaser
        }

        ChangeChipData([...new_chipData.slice(0, target_index), ...new_chipData.slice(target_index+1, new_chipData.length)])
        // setChipData([{}])
    }

    const AddTag = () => {

        let val = SlugifyTagName(tagInputValue);
        if (val){

            console.log(chip_data.length)
            for(let i = 0; i < chip_data.length; i++){
                if(chip_data[i].label === val){
                    return;
                }
            }
            ChangeChipData([...chip_data, {key: (chip_data.length > 0 && Object.keys(chip_data[0]).length === 2 ? chip_data[chip_data.length - 1].key + 1 : 1), label: val}])
        }else{
            setInvalidTagStatus({is_invalid: true, message: 'Try entering tag-name without special characters...'})
        }
    }
 
    const HandleTagInputChange = (event) => {
        setTagInputValue(event.target.value)
        
        // console.log(tagInputValue)
    }

    const handleFormSubmit = async () => {


            let form_data = new FormData();
 
            // var csrftoken = getCookie('csrftoken');
            // console.log(csrftoken);

            form_data.append('title', postTitle);
            // // form_data.append('image_1',attachedFiles.image_a.content.content);
            // // console.log(attachedFiles.image_a.content);
            form_data.append('descr', editorData);
            // console.log(chip_data)
            form_data.append('tags', chip_data.map((val, idx) => val.label).join(','))

            // form_data.append('upload_preset', 'spade_assets');

            // for(let i = 0; chip_data && i < chip_data.length; i++){

            //     form_data.append('tags', chip_data[i].label);
            // }
            
            // console.log("Type:MANUAL::asd ", attachedFiles.image_a.content.content);
            
            if(imageA){

                form_data.append('image_1',imageA, "image_1."+GetFileExtention(imageA));
            }else{
                form_data.append('image_1', null);
                
            }

            if(imageB){

                form_data.append('image_2',imageB, "image_2."+GetFileExtention(imageB));
            }else{
                form_data.append('image_2', null);
                
            }

            if(imageX){

                form_data.append('image_3',imageX, "image_3."+GetFileExtention(imageX));
            }else{
                form_data.append('image_3', null);
                
            }

            if(imageY){

                form_data.append('image_4',imageY, "image_4."+GetFileExtention(imageY));
            }else{
                form_data.append('image_4', null);
                
            }

                const response = await fetch(`${FRONTEND_ROOT_URL}api/create/post/`, {
                    method: 'POST',
                    headers: {
                        // 'Content-Type': 'multipart/form-data; boundary=98feb59a8abe4bfb95a7321f536ed800',
                        'Accept': 'application/json',
                        // 'X-CSRFToken': csrftoken
                    },
                    body: form_data
                })

                const data = await response.json();

                snackbar.open(data.error ? "error" : "success", data.message)                



    }

    useEffect( () => {
        editorRef.current = {
            CKEditor: require( '@ckeditor/ckeditor5-react' ).CKEditor, //Added .CKEditor
            ClassicEditor: require( '@ckeditor/ckeditor5-build-classic' ),
        }
        setEditorLoaded( true )
    }, [] );




        // MAKkING NEW OBJECTS FOR EVERY ONE (IMAGE_A) (IMAGE_B) ()...





    return (
        <div>
        {/* <div> */}
        <PostModal/>
        <Modal
            aria-labelledby="unstyled-modal-title"
            aria-describedby="unstyled-modal-description"
            open={imageModalOpen}
            onClose={handleImageModalClose}
            // BackdropComponent={Backdrop}
            style={{border: 'none', display: 'grid', placeItems: 'center'}}
           
        >
            <Box sx={{backgroundColor: '#f5f5f5', padding: '0.8% 1%', borderRadius: '8px', width: '20vw'}}>

            <Typography variant="h6" >
                Attach Images
            </Typography>
            <br />
            <Divider />

            <List dense={false}>
              
                    {[imageA, imageB, imageX, imageY].map((file, index) => (
                <ListItem key={index}>
                    {/* < div key={index} > */}
                    <ListItemAvatar>

                    <label htmlFor={"contained-button-file-" + String(index+1)}>
                        
                        <Input accept="image/*" id={"contained-button-file-" + String(index+1)} onChange={(e) => {handleFileAttachmentChange(e, String.fromCharCode((index<2 ? index+97 : 121-(3-index))))}} multiple type="file" />
                        <Tooltip title={"Attach Image " + String.fromCharCode((index<2 ? index+65 : 89-(3-index)))} >
                            <IconButton variant="contained" component="span">
                                <AttachFile />
                            </IconButton>
                        </Tooltip>
                    </label>
                    </ListItemAvatar>
                    <ListItemText primary={"Image " + String.fromCharCode((index<2 ? index+65 : 89-(3-index)))} secondary={file ? (file?.name.length < 43 ? file?.name : file?.name.slice(0, 38) + ' ...') : 'Not attached yet!'} />
                    <ListItemAvatar>

                        
                        <Tooltip title={"Remove Image " + String.fromCharCode((index<2 ? index+65 : 89-(3-index)))} >
                            <IconButton disabled={!file} onClick={(e) => {removeImage(e, String.fromCharCode((index<2 ? index+97 : 121-(3-index))))}} variant="contained" component="span">
                                <DeleteOutlined />
                            </IconButton>
                        </Tooltip>
                    </ListItemAvatar>
                    {/* </div> */}
  
            </ListItem>
                ))
                }
              
            </List>

            </Box>
            
        </Modal>
        {/* </div> */}

            <label htmlFor="createpostform_title" style={{marginBottom: '5%'}}><strong>Title</strong></label>
            <br />
            <br />
            <TextField variant="standard" onChange={(e) => {handlePostTitleChange(e)}} placeholder="Ex.. Top 10 ways to kill campers" id="createpostform_title" style={{width: '50%', marginBottom: '5%', backgroundColor: 'rgba(0, 0, 0, 0)', fontFamily: 'sans-serif'}} />
            <br />
            <label htmlFor="createpostform_descr"  onClick={FocusCkEditor}><strong>Description</strong></label>
            <br />
            <br />

            
            {editorLoaded ? <CKEditor
                editor={ ClassicEditor }
                data={editorData}
                onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);           
                } }
                onChange={ (event, editor ) => {
                const data = editor.getData()
                setEditorData(data);
                } }
            /> : <p style={{color: 'gray'}}>Loading Editor...</p>}
            <br />
            <Button variant="outlined" style={{textTransform: 'capitalize'}} endIcon={<AddPhotoAlternateOutlined />} onClick={() => setImageModalOpen(!imageModalOpen)}>Insert Images</Button>
            <br />
            <br />

            <label htmlFor="outlined-name"><strong>Tags</strong></label>
            <br />
            <br />
            <div  
                style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    padding: 0.5,
                    margin: 0,
                    border: '1px solid rgba(0, 0, 0, 0.2)',
                    height: '20vh',
                    width: '30vw',
                    overflow: 'auto auto',
                    
                   
                }}
                // component="ul"

            >
                {chip_data.length>0 && typeof chip_data[0] === 'object' && Object.keys(chip_data[0]).length !== 0 && chip_data.map((data) => {
                  

                    return (
                    // <ListItem key={data.key} style={{width: 'auto', height: '2rem'}}>
                        <Chip
                        key={data.key}
                        label={data.label}
                        onDelete={() => {DeleteTag(data.label)}}
                        style={{margin: '2%', padding: '1%'}}
                        
                        />
                    // </ListIte/m>
                    );
                })}

            </div>
            {/* <br /> */}
            <br />
            <FormControl style={{ margin: 0, width: '35ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-name">Add Tag</InputLabel>
            <OutlinedInput
                id="outlined-name"
                label="Add Tag"
                placeholder="Keyword-related-to-topic"
                // placeholder="Add Tag"
                value={tagInputValue}
                onChange={HandleTagInputChange}
                endAdornment={
                    <InputAdornment position="end">
                        <Tooltip title="Add to taglist" >
                            <IconButton
                            aria-label="add tag"
                            onClick={AddTag}
                            edge="end"
                            style={{
                                borderRadius: '8px'
                            }}
                            >
                            {/* {values.showPassword ? <VisibilityOff /> : <Visibility />} */}
                            <Add />
                            </IconButton>
                        </Tooltip>
                    </InputAdornment>
                }
                
            />
            </FormControl>
            <div id="alert-message" style={{position: 'relative', height: '3ch', marginTop: '3ch'}}>
                
                {invalidTagStatus.is_invalid ? <Alert severity="warning" style={{position: 'absolute'}} onLoad={setTimeout(() => {
                  setInvalidTagStatus({is_invalid: false, message: ''})
                }, 4000)}> {invalidTagStatus.message} </Alert> : null}
            </div>
          
                {/* <Button variant="contained" onClick={handleImageModalOpen} endIcon={<AddPhotoAlternateOutlined />} component="span" style={{textTransform: 'capitalize', backgroundColor:'#516BEB', color: '#f5f5f5'}}>
                Upload 
                </Button> */}
                
            {/* <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
            </label> */}
            {/* <br /> */}
            {/* <br /> */}
            {/* <Divider variant="middle"/> */}
            {/* <br /> */}
            {/* <br /> */}
            {/* <div className="submit-btn" style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}> */}

                <Button variant="contained" disabled={false} onClick={handlePostModalOpen} style={{textTransform: 'capitalize', color: '#f5f5f5', backgroundColor: '#892CDC', padding: '1% 1.5%', marginRight: '5%'}}>Review </Button>
                <Button variant="contained" disabled={false} onClick={handleFormSubmit} style={{textTransform: 'capitalize', color: '#f5f5f5', backgroundColor: '#892CDC', padding: '1% 1.5%'}}>&nbsp;Publish</Button>

            {/* </div> */}
        </div>
    )
}

export default CreatePostForm;
