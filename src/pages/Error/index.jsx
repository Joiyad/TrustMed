import React from 'react'
import Lottie from 'lottie-react'
import Animation from '../../assets/animations/70818-error-404-sin-fondo.json'
import styles from './Styles.module.scss'

const Error = () => {
  return (
    <div className={styles.container}>
        <Lottie animationData={Animation} />
    </div>
  )
}

export default Error