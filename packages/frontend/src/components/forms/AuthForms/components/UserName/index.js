import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import styles from '../styles.module.scss';
import {
  composeValidators,
  length,
  requiredField,
} from '../../../../../validate';

export const UserName = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper} id="userName">
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>user name</label>
          <span>►</span>
        </div>
        <Field
          name="userName"
          component="input"
          type="text"
          placeholder="userName"
          validate={composeValidators(require, length(3, 32))}
        />
        <Error name="userName" />
      </div>
    </div>
  );
};
