import React from 'react';
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
  values,
  values: { productType: type, graphicsCard },
}) => {
  const require = required ? requiredField : () => undefined;

  if (type === 'phone') {
    values.graphicsCard = values.graphicsCardName = undefined;
  }
  if (type === 'laptop') {
    values.dualSim = undefined;
  }
  if (type === 'tablet') {
    values.graphicsCard = values.graphicsCardName = values.dualSim = undefined;
  }

  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper} id="weight">
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
          validate={values => require(values)}
        />
        <Error name="weight" />
      </div>
      <div className={styles.colorWrapper} id="color">
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
      <div className={styles.inputWrapper} id="price">
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
      {type === 'phone' && (
        <div className={styles.inputWrapper} id="dualSim">
          <div className={styles.label}>
            <label>dual sim</label>
            <span>►</span>
          </div>
          <Field name="dualSim" component="input" type="checkbox" />
          <label>dual sim</label>
        </div>
      )}
      {type === 'laptop' && (
        <div className={styles.inputWrapper} id="graphicsCard">
          <div className={styles.label}>
            <label>graphics card</label>
            <span>►</span>
          </div>
          <Field name="graphicsCard" component="input" type="checkbox" />
          <Field
            name="graphicsCardName"
            component="input"
            type="text"
            placeholder="graphics card name"
            validate={composeValidators(length(5, 32))}
            disabled={!graphicsCard}
          />
          <Error name="graphicsCardName" />
        </div>
      )}
    </div>
  );
};
