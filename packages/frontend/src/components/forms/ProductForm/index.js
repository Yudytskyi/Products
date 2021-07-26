import React from 'react';
import { Field } from 'react-final-form';
import Product from './Product';
import validate from './Validate';
import DownshiftInput from './DownshiftInput';
import colors from './colors';
import styles from './styles.module.scss';

const onSubmit = (values) => window.alert(JSON.stringify(values, 0, 2));

export const ProductForm = ({ formName, onSubmit }) => {
  return (
    <Product
      initialValues={{ productType: 'phone', dualSim: false }}
      onSubmit={onSubmit}
      validate={(values) => validate.check(values, formName)}
    >
      <Product.Page>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <Field
              name="productName"
              component="input"
              type="text"
              placeholder="Product Name"
              // validate={(values) => validate.length(values)}
            />
            <Product.Error name="productName" />
          </div>
        </div>
      </Product.Page>
      <Product.Page>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
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
            <Product.Error name="productType" />
          </div>
        </div>
      </Product.Page>
      <Product.Page>
        <div className={styles.formWrapper}>
          <div className={styles.inputWrapper}>
            <Field
              name="weight"
              component="input"
              type="number"
              min="1"
              placeholder="weight"
            />
            <Product.Error name="weight" />
          </div>
          <div className={styles.colorWrapper}>
            <Field
              name="color"
              items={colors}
              component={DownshiftInput}
              placeholder="color"
            />
            <Product.Error name="color" />
          </div>
          <div className={styles.inputWrapper}>
            <Field
              name="price"
              component="input"
              type="number"
              min="1"
              placeholder="price"
            />
            <Product.Error name="price" />
          </div>
          <div className={styles.inputWrapper}>
            <Field name="dualSim" component="input" type="checkbox" />
            <label>dual Sim</label>
          </div>
          <div className={styles.inputWrapper}>
            <Field name="graphicsCard" component="input" type="checkbox" />
            <Field
              name="graphicsCardName"
              component="input"
              type="text"
              placeholder="graphics card name"
            />
          </div>
        </div>
      </Product.Page>
    </Product>
  );
};
