
import React from 'react'
import Feed from './feed/Feed'

import styles from './feed/Feed.module.css'

function ExploreExactPostView({data}) {
  return (
    <div>
        <h2 style={{marginLeft: '5%', fontFamily: 'Changa', fontSize: '2.3rem'}}>Search Results</h2>
        {/* Exact View */}
        <Feed data={[data[0]]} isExploreView={true} marked autoOpenMarked={true} />

        <Feed data={data.slice(1)} isExploreView={true} />
    </div>
  )
}

export default ExploreExactPostView