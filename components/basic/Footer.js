import styles from './Footer.module.css'
import Link from 'next/link'
import { useContext } from 'react';
import authContext from "./contexts/layout_auth_context"
import { Dialog, DialogTitle, Drawer, List, ListItem } from '@mui/material';
import React from 'react'
import styled from '@emotion/styled'
import { DOCS_ROOT_URL } from '../../config';

const EmailListItem = styled.li`

    &:hover{
        cursor: pointer;
    }

`

function Footer({username}) {

    const auth = useContext(authContext);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    return (
        <footer>

            <div className={styles.footer__main} style={{ backgroundImage: "url('/footer_bg.svg')", backgroundSize: 'cover' }}>
                <div className={styles.catagory_section_main}>

                    <div className={styles.catagory_section} >
                        {/* Quick Links */}
                        <h2>Quick Links</h2>
                        <ul>
                            <li> <Link href="/"><a>Home</a></Link></li>
                            <li> <a href={`${DOCS_ROOT_URL}about`}>About</a></li>
                            {auth.is_authenticated && <li> <Link href={`/view_profile/${username}/`}><a>My Profile</a></Link></li>}
                            <li> <Link href="/feedback"><a>Feedback</a></Link></li>
                            <li> <a href={`${DOCS_ROOT_URL}about#what-is-spade`}>What is Spade?</a></li>
                            <li> <a href={DOCS_ROOT_URL}>Docs</a></li>

                            {/* <li> <Link href="/report"><a>Report</a></Link></li> */}

                        </ul>
                            
                    </div>

                    <div className={styles.catagory_section} >
                        {/* Help and support */}
                        <h2>Help &amp; Support</h2>
                        <ul>
                            <li> <Link href="/help_and_support"><a>Help &amp; Support</a></Link></li>
                            {/* <li> <Link href="/"><a>Explore Tickets</a></Link></li> */}
                            {auth.is_authenticated && <li> <Link href="/profile/tickets"><a>Your Tickets</a></Link></li>}
                            {/* <li> <Link href="/"><a>Report Issue</a></Link></li> */}
                            {/* <li> <Link href="/"><a>What is Spade?</a></Link></li>
                            <li> <Link href="/"><a>How it works?</a></Link></li> */}

                        </ul>
                            
                    </div>

                    <div className={styles.catagory_section} >
                        {/* Help and support */}
                        <h2>Contact</h2>
                        <ul>
                            <li> <Link href="/contact"><a>Contact Us</a></Link></li>
                            <EmailListItem onClick={() => {setDialogOpen(true)}}>Email</EmailListItem>
                            <Dialog onClose={() => {setDialogOpen(false)}} open={dialogOpen}>
                                <DialogTitle>Contact Email</DialogTitle>
                                <List>
                                    <ListItem>team.spadebeta@gmail.com</ListItem>
                                </List>
                            </Dialog>
                            {/* <li> <Link href="/"><a>My Profile</a></Link></li>
                            <li> <Link href="/"><a>Feedback</a></Link></li>
                            <li> <Link href="/"><a>What is Spade?</a></Link></li>
                            <li> <Link href="/"><a>How it works?</a></Link></li> */}

                        </ul>
                            
                    </div>

                    <div className={styles.catagory_section} >
                        {/* Stay Connected */}
                        <h2>Stay Connected</h2>
                        <ul>
                            <li> <Link href="https://twitter.com/spade_community"><a>Twitter</a></Link></li>
                            {/* <li> <Link href="/"><a>Facebook</a></Link></li> */}
                            <li> <Link href="https://discord.com/channels/971334545783799850/971334546236772367"><a>Discord</a></Link></li>

                            {/* <li> <Link href="/"><a>My Profile</a></Link></li>
                            <li> <Link href="/"><a>Feedback</a></Link></li>
                            <li> <Link href="/"><a>What is Spade?</a></Link></li>
                            <li> <Link href="/"><a>How it works?</a></Link></li> */}

                        </ul>
                            
                    </div>

                </div>

                <center><p style={{marginTop: '13%', marginBottom: '0', paddingBottom: '1rem', color: '#FFFFFF80'}}>&copy; 2022 Spade Inc. All rights reserved.</p></center>

            </div>
        </footer>
    )
    
}

export default Footer
