import { blue } from '@mui/material/colors'
import React from 'react'
import Feed from './feed/Feed'

function SeeMore({slug, data}) {
  const [_data, setData] = React.useState(data);
  
  return (
    <div>
        
        <h2 style={{marginLeft: '5%', marginTop: '3%', fontSize: '1.9rem', fontFamily: 'Chivo', fontWeight: '900'}}>Search Results For : &nbsp;<span style={{color: blue[500], fontSize: '1.5rem', fontFamily: 'Roboto'}}> {String(slug).replace(/-/g, ' ')}</span></h2>

        <Feed data={_data} isProfileView setData={setData} hydrate_key={`search@${slug}`} />

    </div>
  )
}

export default SeeMore