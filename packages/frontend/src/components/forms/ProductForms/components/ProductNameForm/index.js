import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import {
  composeValidators,
  length,
  requiredField,
} from '../../../../../validate';
import styles from '../styles.module.scss';

export const ProductNameForm = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper} id="productName">
        <div className={styles.label}>
          <label>product name</label>
          <span>►</span>
        </div>
        <Field
          name="productName"
          component="input"
          type="text"
          placeholder="Product Name"
          validate={composeValidators(require, length(3, 32))}
        />
        <Error name="productName" />
      </div>
    </div>
  );
};
