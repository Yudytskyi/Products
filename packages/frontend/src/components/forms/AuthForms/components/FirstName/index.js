import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import styles from '../styles.module.scss';
import {
  composeValidators,
  length,
  requiredField,
} from '../../../../../validate';

export const FirstName = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper} id="firstName">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>first name</label>
          <span>►</span>
        </div>
        <Field
          name="firstName"
          component="input"
          type="text"
          placeholder="firstName"
          validate={composeValidators(require, length(3, 32))}
        />
        <Error name="firstName" />
      </div>
    </div>
  );
};
