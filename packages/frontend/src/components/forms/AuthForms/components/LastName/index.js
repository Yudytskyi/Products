import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import styles from '../styles.module.scss';
import {
  composeValidators,
  length,
  requiredField,
} from '../../../../../validate';

export const LastName = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper} id="lastName">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>last name</label>
          <span>►</span>
        </div>
        <Field
          name="lastName"
          component="input"
          type="text"
          placeholder="lastName"
          validate={composeValidators(require, length(3, 32))}
        />
        <Error name="lastName" />
      </div>
    </div>
  );
};
