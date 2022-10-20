import { Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, OutlinedInput, Select, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';
import styles from './CreateTicket.module.css'
import { Box } from '@mui/system';
import { create_ticket } from './help_and_support/search_query_api/create_ticket';
import authContext from './basic/contexts/layout_auth_context';
import { onlyWithAuth } from './basic/hofs';

function CreateTicket() {

    const router = useRouter()

    const auth = useContext(authContext);

    const [open, setOpen] = React.useState(false);
    const [ticketData, setTicketData] = React.useState({ title: '', descr: '', catagory: null });

    
    const handleCreateTicket = async () => {

      if(!auth.is_authenticated){

        auth.set_open_drawer(true, "Login Requied!")

      }
      
      const ticketCreateData = await create_ticket(ticketData);
      
      if (ticketCreateData.success){
        
        alert('[SUCCESS] Ticket Added!')
        
        // Reirect to ticket page FRONTEND_ROOT_URL/explore/ticket/:ticket_id
        router.push(`/explore/ticket/${ticketCreateData.ticket_id}`)
        
      }else{
        
        alert('[ERROR] Ticket Not Created')
        
      }
      
    } 
    
    
    useEffect(() => {

      setTicketData({...ticketData, catagory: router.query.catagory})

    }, [router.query.catagory])
     


    const breadcrumbs = [
        <Link underline="hover" key="1" color="inherit" href="/help_and_support" onClick={() => {}}>
            Help & Support
        </Link>,

        <Link underline="hover" key="2" color="inherit" href="/help_and_support/catagory/profile" onClick={() => {}}>
            Profile 
        </Link>,
        <Typography key="3" color="primary" style={{ textTransform: 'capitalize' }}>
            Create Ticket
        </Typography>
        ];

  return (
    <div style={{margin: '3rem'}}>

<Dialog disableEscapeKeyDown open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle>Select Catagory</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Catagory</InputLabel>
              <Select
                native
                value={ticketData.catagory}
                onChange={(e) => { setTicketData({...ticketData, catagory: e.target.value}) }}
                input={<OutlinedInput label="Catagory" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value={"Profile"}>Profile</option>
                <option value={"Bugs-and-glitch"}>Bugs And Glitches</option>
                <option value={"My-app"}>My App</option>
                <option value={"Posts"}>Posts</option>
                <option value={"Other"}>Other</option>

              </Select>
            </FormControl>
            
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setOpen(false) }}>Cancel</Button>
          <Button onClick={() => { setOpen(false) }}>Ok</Button>
        </DialogActions>
      </Dialog>

        <Breadcrumbs   separator="›" aria-label="breadcrumb" style={{ margin: '2% 0px 4rem 0px'}}>
            {breadcrumbs}
        </Breadcrumbs>

        {/* Title For Ticket */}
        <div style={{display: 'inline-block', fontFamily: 'Changa'}}>
            <h1>Title</h1>
            <input type="text" value={ticketData.title} onChange={  (e) => { setTicketData({...ticketData, title: e.target.value}) }} placeholder="Problem Indication (in-brief)" className={ styles.title_field }/>
        </div>
        <div style={{display: 'inline-block', fontFamily: 'Changa', marginLeft: '5%', position: 'relative'}}>
            <h1>Catagory</h1>
            <input type="text" disabled placeholder={ ticketData.catagory } className={ styles.catagory_field }/>
            <button onClick={() => { setOpen(true) }} className={styles.change_catagory_btn}>CHANGE</button>
        </div>

        <div style={{fontFamily: 'Changa', marginTop: '5%', width: 'calc(60vw - 6rem)'}}>
            <h1>Describe your issue</h1>
            {/* <input type="text" disabled placeholder={ currentCatagory } className={ styles.catagory_field }/> */}
            <textarea value={ticketData.descr} onChange={(e) => { setTicketData({...ticketData, descr: e.target.value}) }} className={ styles.describe_field } rows="8" cols="100" placeholder="Describe your issue in detail"></textarea>
            <br />
            <br />

            {/* <button onClick={handleCreateTicket} className={styles.submit_ticket_btn}>Submit Ticket</button> */}
            <button onClick={() => {handleCreateTicket()}} className={styles.submit_ticket_btn}>Submit Ticket</button>
          
        </div>

    </div>
  )
}

export default CreateTicket