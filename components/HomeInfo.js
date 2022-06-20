// import { Grid, Avatar, Tooltip, TextField } from '@material-ui/core'

import { Avatar, Button, Chip, Container, Divider, FormControl, IconButton, InputLabel,  MenuItem,  Modal,  Select, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import React, { useEffect } from 'react'
// import { Add, AddCircle, AddOutlined, AddPhotoAlternateOutlined, Edit } from '@material-ui/icons';
import Link from 'next/link'

import { Edit } from '@mui/icons-material';
import getUserInfo from './basic/get_user_info';
import get_common_tags from './basic/get_common_tags';

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



export default function HomeInfo() {


    const [tagsLoading, setTagsLoading] = React.useState(false);
    const [commonTags, setCommonTags] = React.useState([]);

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
    
    <Container sx={{p: '0rem',mt: '5vh', width: '25vw',border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px'}}>
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


    </>
  )
}
