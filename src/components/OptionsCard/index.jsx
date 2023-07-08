import { Button, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "./Styles.module.scss";

const OptionsCard = ({text, button1, button2, path1, path2}) => {
  const navigate = useNavigate();

  const handleClick1 = () => {
    navigate(path1);
  }

  const handleClick2 = () => {
    navigate(path2);
  }

  return (
    <div className={styles.card_container}>
        <Typography variant='h4'>{text}</Typography>
        <div className={styles.button_container}>
            <Button size="large" variant='contained' onClick={handleClick1}>{button1}</Button>
            <Button size="large" variant='outlined' onClick={handleClick2}>{button2}</Button>
        </div>
    </div>
  )
}

export default OptionsCard