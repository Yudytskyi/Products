import React from 'react';
import styles from './styles.module.scss';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.rotating} />
    </div>
  );
};

export default Spinner;
