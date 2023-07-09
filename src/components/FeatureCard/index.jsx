import { Typography } from '@mui/material'
import React from 'react'
import styles from './Styles.module.scss'

const FeatureCard = ({title, description, imageLink}) => {
  return (
    <div className={styles.card_container}>
        <div className={styles.image_container}><img alt="logo" src={imageLink} width="100px" /></div>
        <Typography variant='h5' sx={{textAlign:"center", marginBottom:'20px'}}>{title}</Typography>
        <Typography variant='body2' sx={{color:'#7F7E7F', textAlign:"center"}}>{description}</Typography>
    </div>
  )
}

export default FeatureCard