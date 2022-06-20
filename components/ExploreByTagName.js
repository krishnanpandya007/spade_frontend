import { colors, Typography } from '@mui/material'
import React from 'react'
import Feed from './feed/Feed'

function ExploreByTagName({data, tagname}) {
  return (
      <div>
        <Typography fontWeight="600" variant="h4" style={{paddingLeft: '20vw', paddingTop: '4%', margin: '0'}}>Posts Related: <span style={{color:'#2196f3'}}>&nbsp; {tagname}</span></Typography>

        {/* <Typography fontWeight="600" variant="h4" style={{marginLeft: '0', display: 'block'}}>Posts Related:  </Typography> */}

        <Feed data={data} />
      </div>
  )
}

export default ExploreByTagName