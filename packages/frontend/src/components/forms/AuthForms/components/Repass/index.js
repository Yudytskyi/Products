import React, { useState } from 'react';
import { ReactSVG } from 'react-svg';
import { Field } from 'react-final-form';
import { Error } from '..';
import styles from '../styles.module.scss';
import {
  eye_visible_svg,
  eye_invisible_svg,
} from '../../../../../assets/icons';

export const Repass = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.formWrapper} id="repass">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>repeat password</label>
          <span>►</span>
        </div>
        <Field
          name="repass"
          component="input"
          type={visible ? 'text' : 'password'}
          placeholder=" repeat password"
        />
        <div
          className={styles.showPassword}
          onMouseDown={() => setVisible(true)}
          onMouseUp={() => setVisible(false)}
        >
          <ReactSVG
            className={styles.showPasswordIcon}
            src={visible ? eye_invisible_svg : eye_visible_svg}
          />
        </div>
        <Error name="repass" />
      </div>
    </div>
  );
};
