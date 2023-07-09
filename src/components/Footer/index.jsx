import { Typography } from '@mui/material'
import React from 'react'
import styles from './Styles.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer_container}>
        <Typography variant='body1' sx={{textAlign:'center', fontWeight:'bold'}}>Made with ❤️ by Joiyad Khan</Typography>
    </div>
  )
}

export default Footer