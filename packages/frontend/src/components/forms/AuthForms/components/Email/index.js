import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import styles from '../styles.module.scss';
import {
  composeValidators,
  email,
  requiredField,
} from '../../../../../validate';

export const Email = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper} id="email">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>email</label>
          <span>►</span>
        </div>
        <Field
          name="email"
          component="input"
          type="text"
          placeholder="email"
          validate={composeValidators(require, email)}
        />
        <Error name="email" />
      </div>
    </div>
  );
};
