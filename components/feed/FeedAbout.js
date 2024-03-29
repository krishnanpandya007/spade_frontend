// import React from 'react'
import PropTypes from 'prop-types'
// import { Avatar, Chip, Divider, Grid, Paper } from '@material-ui/core'

import { Avatar, Chip, Divider, Grid, Link, Stack } from '@mui/material';
import React from 'react';
import { FRONTEND_ROOT_URL } from '../../config';
// import avatar_pic from './avatar_1.jpg'


const random_colors = []


function FeedAbout({username, tags, created_on, profile_pic, first_name, last_name}) {



    return (
        <React.Fragment>

            <Link href={`${FRONTEND_ROOT_URL}view_profile/${username}`} style={{textDecoration: 'none'}}>
                <a href={`${FRONTEND_ROOT_URL}view_profile/${username}`} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem'}}>

                    <Chip 
                        // avatar={<Avatar />} 
                        avatar={profile_pic ? <Avatar src={profile_pic} /> : first_name && last_name ? <Avatar style={{backgroundColor: '#e4704a', color: 'whitesmoke', fontWeight: '700'}} >{first_name[0]+last_name[0]}</Avatar>: <Avatar />}

                        label={username}
                        variant="outlined"
                        style={{margin: `0.5rem`}}
                    />

                </a>
            </Link>

            <Divider variant="middle" light style={{marginBottom: '0.5rem'}} />
            {/* <Chip label="No tags included" color="default" variant='outlined' sx={{transform: 'scale(0.8)', borderRadius: '8px', margin: defaultMargin, marginLeft: '0'}} /> */}
            {(tags.length > 0?
                        <>
                            {
                                tags.map((tag, i) => 
                                    <Chip label={tag} color='primary' variant='outlined' key={i} sx={{margin: '0px', transform: 'scale(0.8)'}} />
                                )
                            }
                        </>
                        :
                        <Chip label="No tags included" color="default" variant='outlined' sx={{margin: '0px', transform: 'scale(0.8)', borderRadius: '8px'}} />)}

            <h5 style={{ position: 'absolute', left: '0', bottom :'0', padding: '0.5rem', backgroundColor: 'transparent', fontWeight: '400', margin: '0', backgroundColor: 'transparent', borderRadius: '5px' }}>{created_on}</h5>

            
        </React.Fragment>
    )
}

FeedAbout.propTypes = {

    username: PropTypes.string.isRequired,
    tags: PropTypes.array,
    created_on: PropTypes.string.isRequired,

}
export default FeedAbout
