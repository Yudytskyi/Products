import React, { useState } from 'react';
import { Field } from 'react-final-form';
import { Error } from '..';
import DownshiftInput from './DownshiftInput';
import colors from './colors';
import styles from './styles.module.scss';

export const ProductAttributesForm = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div className={styles.formWrapper}>
      <div className={styles.inputWrapper}>
        <Field
          name="weight"
          component="input"
          type="number"
          min="1"
          placeholder="weight"
        />
        <Error name="weight" />
      </div>
      <div className={styles.colorWrapper}>
        <Field
          name="color"
          items={colors}
          component={DownshiftInput}
          placeholder="color"
        />
        <Error name="color" />
      </div>
      <div className={styles.inputWrapper}>
        <Field
          name="price"
          component="input"
          type="number"
          min="1"
          placeholder="price"
        />
        <Error name="price" />
      </div>
      <div className={styles.inputWrapper}>
        <Field name="dualSim" component="input" type="checkbox" />
        <label>dual Sim</label>
      </div>
      <div className={styles.inputWrapper}>
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
          disabled={disabled}
        />
        <Error name="graphicsCardName" />
      </div>
    </div>
  );
};
