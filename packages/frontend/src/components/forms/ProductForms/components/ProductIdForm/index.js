import React from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import { requiredField } from '../../Validate';
import styles from '../styles.module.scss';

export const ProductIdForm = ({ required }) => {
  const require = required ? requiredField : undefined;

  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>product id</label>
          <span>►</span>
        </div>
        <Field
          name="productId"
          component="input"
          type="number"
          min="1"
          placeholder="Product Id"
          validate={require ? values => requiredField(values) : undefined}
        />
        <Error name="productId" />
      </div>
    </div>
  );
};
