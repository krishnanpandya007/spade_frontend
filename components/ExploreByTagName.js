import { colors, Typography } from '@mui/material'
import authContext from '../components/basic/contexts/layout_auth_context'
import React, { useContext } from 'react'
import Feed from './feed/Feed'

function ExploreByTagName({data, tagname}) {

  const auth = useContext(authContext);
  const [_data, setData] = React.useState(data);

  return (
      <div>
        <Typography fontWeight="600" variant="h4" style={{paddingLeft: auth.is_on_mobile ? '2rem' : '20vw', paddingTop: '4%', margin: '0'}}>Posts Related: <span style={{color:'#2196f3'}}>&nbsp; {tagname}</span></Typography>

        {/* <Typography fontWeight="600" variant="h4" style={{marginLeft: '0', display: 'block'}}>Posts Related:  </Typography> */}

        <Feed hydrate_key={`tag@${tagname}`} data={_data} setData={setData} />
      </div>
  )
}

export default ExploreByTagName