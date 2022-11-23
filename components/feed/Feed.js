import { motion } from 'framer-motion'
import React from 'react'

function Feed({ spack_groups }) {
  return (
    
    spack_groups.map((spack_group, idx) => (

        // animation delay not working
        <motion.div animate={{scale: [0.8, 1], animationDelay: 0.1*idx}} style={{border: '1px solid red'}} key={idx}>
            <SpackGroup {...spack_group} />
        </motion.div>

    ))

  )
}

function SpackGroup({group_name, spacks}){

    return(
        <span>{group_name}</span>
    )

}

export default Feed

