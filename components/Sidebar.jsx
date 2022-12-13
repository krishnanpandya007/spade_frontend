import { Avatar, Divider, Grow, List, ListItem, ListItemAvatar, ListItemText, useTheme } from '@mui/material'
import React from 'react'
import styles from './Sidebar.module.css'
import { motion } from 'framer-motion'
import Link from 'next/link';
import { Bolt, Image, Launch } from '@mui/icons-material';
import { FRONTEND_ROOT_URL } from '../config';
function Sidebar() {

    const theme = useTheme();

  return (
    <React.Fragment>
        {/* <Fade in timeout={1.2}> */}
        <motion.div animate={{opacity: [0, 1]}} transition={{delay: 0.8, duration: 0.5}}>

            <h3 className={styles.sidebar_header} style={{borderLeft: `4px solid ${theme.palette.mode === 'dark' ? '#ffffff' : '#000000'}80`}} data-themeinverse={theme.palette.mode !== 'dark' ? '#ffffff80' : '#00000080'}>Today&apos;s <span style={{color: '#5956F5', opacity: 1}}> Spack</span></h3>

            <motion.article className={styles.todays_spack_main}>

                <motion.p animate={{y: [15, 0], opacity: [0, 1]}} transition={{delay: 1.2, duration: 0.5}} className={styles.todays_spack_descr}>Making the post is most violated of all time including people around world at night.</motion.p>


                <address ><Link href="/"><a href="/" rel="author" style={{fontWeight: '400', fontStyle: 'normal', opacity: '0.6'}}> @ dizzy_dope </a></Link></address>

            </motion.article>
        </motion.div>
        {/* </Fade> */}

        <motion.div animate={{y: [-10, 0], opacity: [0, 1]}} transition={{delay: 1.7, duration: '0.5'}}>

            <motion.div className={styles.create_spack_main}>
                <svg width="103.5" height="52.5" viewBox="0 0 138 70"  fill="none" style={{scale: '1', position: 'absolute', right: '3rem', top: '0', zIndex: '-2'}} xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0.5C0 18.9325 7.26962 36.6101 20.2096 49.6439C33.1496 62.6777 50.7001 70 69 70C87.2999 70 104.85 62.6777 117.79 49.6439C130.73 36.6102 138 18.9326 138 0.50001L69 0.5H0Z" fill="#D9D9D9"/>
                </svg>
                <svg width="60" height="60" viewBox="0 0 80 80" fill="none" style={{scale: '1', position: 'absolute', right: '1rem', top: '0', zIndex: '-1'}} xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0C0 10.6087 4.21427 20.7828 11.7157 28.2843C19.2172 35.7857 29.3913 40 40 40C50.6087 40 60.7828 35.7857 68.2843 28.2843C75.7857 20.7828 80 10.6087 80 6.03983e-06L40 0H0Z" fill="#FBB454"/>
                </svg>


                <h4>Have Spack in Mind?</h4>
                <p>Crack it up, with easy publish</p>

                <div className={styles.actions_container}>
                    <a href="www.google.com">Learn More</a>
                    <Link href="/create/spack">
                        <a href="/create/spack">

                            <Bolt />
                            {/* <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_60_59)">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.4944 0.0672568C14.8476 0.218397 15.0518 0.591428 14.9886 0.970392L13.4837 10H20.8333C21.1488 10 21.4375 10.1783 21.5787 10.4607C21.7198 10.743 21.6893 11.0808 21.4998 11.3334L11.4999 24.6667C11.2694 24.974 10.8587 25.0838 10.5055 24.9328C10.1522 24.7817 9.94813 24.4087 10.0113 24.0297L11.5162 15H4.16664C3.85101 15 3.56246 14.8217 3.42129 14.5393C3.28014 14.257 3.31059 13.9192 3.49998 13.6667L13.4999 0.333397C13.7305 0.0260425 14.1412 -0.0838836 14.4944 0.0672568ZM5.83331 13.3333H12.4999C12.7449 13.3333 12.9775 13.4411 13.1358 13.628C13.2941 13.8149 13.3622 14.062 13.3219 14.3037L12.2171 20.9327L19.1667 11.6667H12.4999C12.255 11.6667 12.0224 11.5589 11.8641 11.372C11.7058 11.1851 11.6377 10.938 11.678 10.6964L12.7828 4.06737L5.83331 13.3333Z" fill="#F8F8F8"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_60_59">
                                <rect width="25" height="25" fill="white"/>
                                </clipPath>
                                </defs>
                            </svg> */}
                            LightUp Spack
                        </a>
                    </Link>
                </div>

            </motion.div>

            <ShowTrendingFolks />
        </motion.div>

    

    </React.Fragment>
    
  )
}



 function ShowTrendingFolks(){

    const [folks, setFoliks] = React.useState([]);

    const fetch_trending_folks = async() => {
        const result = await fetch(`${FRONTEND_ROOT_URL}api/get_trending_folks`);
    
    
        const folks_json = await result.json();
    
        if(result.status === 200){
            setFoliks(folks_json)
        } else {
            setFoliks([])
        }
    }

    React.useEffect(fetch_trending_folks, [])

    if(folks.length === 0){return (<p>Loading...</p>)}

    return (

        <React.Fragment>

            <motion.div animate={{y: [10, 0], opacity: [0, 1]}} transition={{delay: 2, duration: '0.3'}}>

                <h3 style={{fontFamily: 'Poppins', fontSize: '1.35rem'}}>Trending Folks</h3>

            </motion.div>

            <motion.div animate={{y: [10, 0], opacity: [0, 1]}} transition={{delay: 2.5, duration: '0.3'}}>

                <List sx={{borderRadius: '15px', border: '1px solid #c4c4c4', marginBottom: '0.3rem', padding: '1rem 0.5rem'}}>

                    {folks.map((folk, idx) => (
                        // <Grow in key={folk.username}>
                            <ListItem key={idx}>
                                <ListItemAvatar>
                                <Avatar src={folk.profile_pic} />
                                </ListItemAvatar>
                                <ListItemText primary={folk.username} secondary={`${folk.first_name} ${folk.last_name}`} />
                                <Link href={`/view_profile/${folk.username}`}><a href={`/view_profile/${folk.username}`} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Reach Out &nbsp; <Launch style={{width :'1.3ch', height: '1.3ch'}} /></a></Link>
                            </ListItem>
                            // <Divider variant="inset" component="li" />
                        // </Grow>
                    ))}

                </List>
                <a target="_blank" href="/spade_trending_folks_public_explaination.pdf" style={{paddingTop: 'rem !important', fontFamily: 'Rubik', fontSize: '0.8rem', textDecoration: 'underline', opacity: '0.65'}}>How it works?</a>
                

            </motion.div>
        </React.Fragment>


    )

}

export default Sidebar