import React from 'react';
import { Field } from 'react-final-form';
import styles from '../styles.module.scss';

export const Role = () => {
  return (
    <div className={styles.formWrapper} id="role">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>role</label>
          <span>►</span>
        </div>
        <div className={styles.type}>
          <label>
            <Field name="role" component="input" type="radio" value="admin" />{' '}
            admin
          </label>
          <label>
            <Field name="role" component="input" type="radio" value="user" />{' '}
            user
          </label>
          <label>
            <Field name="role" component="input" type="radio" value="guest" />{' '}
            guest
          </label>
        </div>
      </div>
    </div>
  );
};
