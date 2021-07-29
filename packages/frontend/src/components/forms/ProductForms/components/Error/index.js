import { Field } from 'react-final-form';
import styles from './styles.module.scss';

export const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span className={styles.error}>{error}</span> : null
    }
  />
);
