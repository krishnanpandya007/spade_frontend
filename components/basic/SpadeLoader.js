import React from 'react'
import styles from './SpadeLoader.module.css'
import Image from 'next/image';


export default function SpadeLoader({width, height, is_loading}) {

  return (
    <img className={styles.shimmer} width="40px" height="40px" src="/spade_logo_simple.png" />
  )
}

SpadeLoader.defaultProps = {
    width: '100%',
    height: '70vh',
    is_loading: false
}