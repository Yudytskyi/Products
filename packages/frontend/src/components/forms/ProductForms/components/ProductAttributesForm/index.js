import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import {
  composeValidators,
  length,
  requiredField,
  price,
} from '../../../../../validate';
import DownshiftInput from './DownshiftInput';
import colors from './colors';
import styles from './styles.module.scss';

export const ProductAttributesForm = ({
  required,
  values: { productType, graphicsCard, graphicsCardName, dualSim },
}) => {
  const require = required ? requiredField : undefined;
  const [disabled, setDisabled] = useState(true);

  if (productType === 'phone') {
    graphicsCard = undefined;
    graphicsCardName = undefined;
  }
  if (productType === 'laptop') {
    dualSim = undefined;
  }
  if (productType === 'tablet') {
    graphicsCard = undefined;
    graphicsCardName = undefined;
    dualSim = undefined;
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>weight</label>
          <span>►</span>
        </div>
        <Field
          name="weight"
          component="input"
          type="number"
          min="1"
          placeholder="weight"
          validate={values => requiredField(values)}
        />
        <Error name="weight" />
      </div>
      <div className={styles.colorWrapper}>
        <div className={styles.label}>
          <label>color</label>
          <span>►</span>
        </div>
        <Field
          name="color"
          items={colors}
          component={DownshiftInput}
          placeholder="color"
          validate={composeValidators(require, length(3, 16))}
        />
        <Error name="color" />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>
          <label>price</label>
          <span>►</span>
        </div>
        <Field
          name="price"
          component="input"
          type="text"
          placeholder="price"
          validate={composeValidators(require, price)}
        />
        <Error name="price" />
      </div>
      {productType === 'phone' ? (
        <div className={styles.inputWrapper}>
          <div className={styles.label}>
            <label>dual sim</label>
            <span>►</span>
          </div>
          <Field name="dualSim" component="input" type="checkbox" />
          <label>dual sim</label>
        </div>
      ) : null}
      {productType === 'laptop' ? (
        <div className={styles.inputWrapper}>
          <div className={styles.label}>
            <label>graphics card</label>
            <span>►</span>
          </div>
          <Field
            name="graphicsCard"
            component="input"
            type="checkbox"
            onClick={() => setDisabled(!disabled)}
          />
          <Field
            name="graphicsCardName"
            component="input"
            type="text"
            placeholder="graphics card name"
            validate={composeValidators(length(5, 32))}
            disabled={disabled}
          />
          <Error name="graphicsCardName" />
        </div>
      ) : null}
    </div>
  );
};
