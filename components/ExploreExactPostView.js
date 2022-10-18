
import React, { useContext } from 'react'
import Feed from './feed/Feed'
import authContext from '../components/basic/contexts/layout_auth_context'
import styles from './feed/Feed.module.css'

function ExploreExactPostView({data}) {

  const auth = useContext(authContext);

  const [_data, setData] = React.useState(data.slice(1));

  return (
    <div>
        <h2 style={{marginLeft: auth.is_on_mobile ? '2rem' : '5%', fontFamily: 'Changa', fontSize: '2.3rem'}}>Search Results</h2>
        {/* Exact View */}
        <Feed data={[data[0]]} isExploreView={true} marked autoOpenMarked={true} />

        <Feed data={_data} setData={setData} isExploreView={true} />
    </div>
  )
}

export default ExploreExactPostView