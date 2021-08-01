import React from 'react';
import { Field } from 'react-final-form';
import styles from '../styles.module.scss';

export const ProductTypeForm = () => {
  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper} id="productType">
        <div className={styles.label}>
          <label>product type</label>
          <span>►</span>
        </div>
        <div className={styles.type}>
          <label>
            <Field
              name="productType"
              component="input"
              type="radio"
              value="phone"
            />{' '}
            phone
          </label>
          <label>
            <Field
              name="productType"
              component="input"
              type="radio"
              value="tablet"
            />{' '}
            tablet
          </label>
          <label>
            <Field
              name="productType"
              component="input"
              type="radio"
              value="laptop"
            />{' '}
            laptop
          </label>
        </div>
      </div>
    </div>
  );
};
