
import React, { useContext } from 'react'
import Feed from './feed/Feed'
import authContext from '../components/basic/contexts/layout_auth_context'
import styles from './feed/Feed.module.css'

function ExploreExactPostView({data, post_id}) {

  const auth = useContext(authContext);

  const [_data, setData] = React.useState(data.slice(1));
  const [markedPost, setMarkedPost] = React.useState([data[0]])

  return (
    <div>
        <h2 style={{marginLeft: auth.is_on_mobile ? '2rem' : '5%', fontFamily: 'Changa', fontSize: '2.3rem'}}>Search Results</h2>
        {/* Exact View */}

      {/* ! Not updating */}
        <Feed hydrate_key={`specific_${post_id}`} data={markedPost} setData={setMarkedPost} isExploreView={true} marked autoOpenMarked={true} />

        <Feed hydrate_key={`specific_${post_id}`} filter_by={`post@${post_id}`} data={_data} setData={setData} isExploreView={true} />
    </div>
  )
}

export default ExploreExactPostView