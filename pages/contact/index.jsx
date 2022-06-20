import { Button, ButtonBase, TextField } from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import React, { useState } from "react";
import Layout from "../../components/basic/layout";
import submit_contact_us_form from "../../components/basic/apis/contact_us_submit"
import { defaultListboxReducer } from "@mui/base";
import { FRONTEND_ROOT_URL } from "../../config";

export default function Contact() {

    const [formData, setFormData] = useState({title: null, email: null, descr: null});

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // alert(String(formData));
        const { title, email, descr } = formData;
        const success = await submit_contact_us_form(title, descr, email)
        if(success) {
            setFormData({title: null, email: null, descr: null});
            alert("Contact Added Successfully!\nWe will get back to you soon!");
            window.location.href=FRONTEND_ROOT_URL
        }else{
            alert("Something went wrong!");
        }

    }
    return (

        <div style={{ margin: '5%' }}>

            <h2>Contact Us</h2>
            <div style={{border: '3px solid '+yellow[600], width: '50vw', borderRadius: '10px', borderLeft: '15px solid '+yellow[600] }}>
            <p style={{marginLeft: '4%'}} ><span style={{fontWeight: '800'}}>NOTE: </span> Any Query/Questions related to this platform, can be reach to us by submitting this form with appropriate details...</p>

            <p style={{marginLeft: '4%'}} >We&apos;ll reply your query on given email on your profile or you can provide new email to where we can reply on!</p>

            </div>

            <br/>
            <br/>
            <br/>
            <br/>
            <form onSubmit={handleFormSubmit}>
            <TextField required id="outlined-basic" label="Reason Title" name="title" onChange={handleChange} value={formData.title}/>
            <br/>
            <br/>
            <br/>

            
            <TextField name="descr" required multiline id="outlined-basic" rows={5} fullWidth placeholder="Please describe here..." onChange={handleChange} value={formData.descr}/>
            <br/>
            <br/>
            <TextField required={true} id="outlined-basic" label="Active Email" type="email" name="email" onChange={handleChange} value={formData.email}/>
            <br/>
            <br/>
            <br/>

            
            <Button type="submit" variant="contained" size="large" >Submit</Button>
            </form>
        </div>

    )

}