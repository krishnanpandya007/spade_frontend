// import { Grid, Avatar, Tooltip, TextField } from '@material-ui/core'

import { Avatar, Button, Chip, Container, Divider, FormControl, IconButton, useTheme, InputLabel,  MenuItem,  Modal,  Select, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
// import { Add, AddCircle, AddOutlined, AddPhotoAlternateOutlined, Edit } from '@material-ui/icons';
import Link from 'next/link'

import { Edit } from '@mui/icons-material';
import getUserInfo from './basic/get_user_info';
import get_common_tags from './basic/get_common_tags';
// import { useTheme } from '@emotion/react';

const avatar_image_size = 60 // 75px

const status_color = '#65C18C'

const status_text = 'Chilling'


const status_indicator_colors = {

  'Do not disturb': '#FF1700',
  Available: '#65C18C',
  Offline: '#DFD3C3',
  Away: '#FFBD35',
  Busy: '#4C3F91'

}



export default function HomeInfo({authInstance}) {


    const [tagsLoading, setTagsLoading] = React.useState(false);
    const [commonTags, setCommonTags] = React.useState([]);
    const theme = useTheme();

    useEffect( async () => {

      setTagsLoading(true);
      const common_tags = await get_common_tags();
      setCommonTags(common_tags.data);
      setTagsLoading(false)

    }, [])

    const handleFilterChange = (e) => {
        setFilterBy(e.target.value)
    }

  return (
    <>
    
    <Container sx={{p: '0rem',mt: '5vh', width: '25vw',border: '1px solid', borderRadius: '5px'}}>
        <h2>Explore by Tags</h2>
        {/* <Divider light={true}/> */}
        {tagsLoading ? 
          <Skeleton variant="text" style={{width: '80%', height: '50%'}} />
        :
          commonTags?.map((val, idx) => {
            return (
              <Link key={idx} href={`/explore/tag/${val}`}>
                <Button variant="outlined" size="small"  style={{margin: '0.8rem 1rem 0.8rem 0'}} >{val}</Button>
              </Link>
            )
          })
        }

        <br />
        <br />

    </Container>
        <br/>

        <br/>
    <Container sx={{ borderRadius: '20px 5px 30px 5px', border: '1px solid #0099FF', width: '25vw', position: 'relative'}}>
    <p style={{ marginBlock: '0', padding: '0.25rem 0.5rem', border: '1px solid #0099FF', borderRadius: '5px', position: 'absolute', top: '-1rem', backgroundColor: theme.palette.mode === 'dark' ? '#071D2D' : 'white', letterSpacing: '1px', fontSize: '0.7rem' }}>NEW FEATURE</p>
    <svg style={{position: 'absolute', left: '0', borderRadius: '20px 5px 0 0'}} preserveAspectRatio="none" width="100%" height="115" viewBox="0 0 482 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_2_7)">
      <path d="M0 23V34.5H48.2V103.5H96.4V69H144.6V34.5H192.8V80.5H241H289.2V57.5H337.4V115H385.6V34.5H433.8V92H482V0H433.8H385.6H337.4H289.2H241H192.8H144.6H96.4H48.2H0V23Z" fill="#0099FF" fillOpacity="0.13"/>
      </g>
      <defs>
      <clipPath id="clip0_2_7">
      <path d="M0 20C0 8.95431 8.95431 0 20 0H477C479.761 0 482 2.23858 482 5V95C482 106.046 473.046 115 462 115H20C8.9543 115 0 106.046 0 95V20Z" fill="white"/>
      </clipPath>
      </defs>
    </svg>


        <h2 style={{fontWeight: '800', fontFamily: 'Poppins', marginBlockStart: '1.3rem', marginBlockEnd: '0.5rem'}}>Take a Tour to</h2>
        <h2 style={{fontWeight: '800', color: '#0099FF', fontFamily: 'Poppins', fontSize: '2rem', marginBlockStart: '0'}}>Daily Share</h2>

        <p style={{ fontFamily: 'Poppins', marginBlockStart: '0', fontSize: '0.8rem', opacity: '0.9' }}>A newly launched feature to this platform, allows users to record their today rare shots by audio/text and share to others as well.</p>
        <br/>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.6rem'}}>

        <Link href="/explore/daily_share">
          <a style={{ display: 'flex', marginRight: '0' , alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: '#0099FF', borderRadius: '13px 5px 13px 5px', padding: '0 1rem' }}>
            <p style={{marginBlock: '0.75rem', fontSize: '0.95rem', fontWeight: '600', color: 'white' }}>Take a Glance</p>
            <svg  style={{ margin: '0 0 0 0.5rem' }} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z" fill="white"/>
            </svg>

          </a>
        </Link>
        <a href="https://docs.spadebeta.in/feature-daily-share">

        <Button variant="standard"  >Explore in Docs</Button>
        </a>

        </div>

    </Container>



    </>
  )
}
