import React from 'react';
import { Field } from 'react-final-form';
import { Error, validate } from '..';
import styles from '../styles.module.scss';

export const ProductIdForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <Field
          name="productId"
          component="input"
          type="number"
          min="1"
          placeholder="Product Id"
          validate={(values) => validate.required(values)}
        />
        <Error name="productId" />
      </div>
    </div>
  );
};
