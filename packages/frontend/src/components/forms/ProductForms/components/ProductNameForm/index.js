import React from 'react';
import { Field } from 'react-final-form';
import { Error, validate } from '..';
import styles from '../styles.module.scss';
// import validate from '../../Product/Validate';

export const ProductNameForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <Field
          name="productName"
          component="input"
          type="text"
          placeholder="Product Name"
          validate={(values) => validate.length(values)}
        />
        <Error name="productName" />
      </div>
    </div>
  );
};
