import React from 'react'
import styles from './SpadeLoader.module.css'



export default function SpadeLoader({width, height, is_loading}) {

  return (
    <div className={styles.spade_loader} style={{width, height, display: is_loading ? '' : 'none'}}>
        <div className={styles.spinner}>
            <img src="/spade_icon.svg" />
            <p>LOADING...</p>
            
        </div>
        
    </div>
  )
}

SpadeLoader.defaultProps = {
    width: '100%',
    height: '70vh',
    is_loading: false
}