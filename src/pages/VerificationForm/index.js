import { Button, Input } from '@mui/material'
import React from 'react'
import styles from './Styles.module.scss'

const VerificationForm = () => {
    const handleSubmit = (e) => {
        console.log(e);
    }

  return (
    <div className={styles.form_container}>
        <Input className={styles.input} placeholder='Type product number...' variant="outlined" size="md" color="primary"/>
        <Button type='submit' variant='contained' size='md' onClick={(e) => handleSubmit(e)}>Submit</Button>
    </div>
  )
}

export default VerificationForm