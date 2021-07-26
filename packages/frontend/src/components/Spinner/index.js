import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import styles from './Spinner.module.sass';

const size =
  window.innerWidth < window.innerHeight
    ? window.innerWidth / 2
    : window.innerHeight / 2;

const override = css`
  border-color: #46568a;
  border: 30px solid #46568a;
  animation: animation-s8tf20 1s 0s infinite cubic-bezier(1, 0, 1, 0.6);
`;

const Spinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader css={override} size={size} />
    </div>
  );
};

export default Spinner;
