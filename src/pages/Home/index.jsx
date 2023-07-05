import React from 'react'
import styles from './Styles.module.scss'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className={styles.home}>
      <div>
        <Link href="/verify">
          <Button variant='outlined'>Login</Button>
        </Link>
      </div>
      <div>
        <Link to="/login">
          <Button variant='outlined'>Verify product</Button>
        </Link>
      </div>
    </div>
  )
}

export default Home