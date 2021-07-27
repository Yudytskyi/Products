import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import styles from './styles.module.scss';
import validate from './Validate';
import { ReactSVG } from 'react-svg';
import { eye_visible_svg, eye_invisible_svg } from './icons';

const Error = ({ name }) => (
  <Field
    name={name}
    subscription={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span className={styles.error}>{error}</span> : null
    }
  />
);

export const LoginSignupForm = ({ formName, onSubmit }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{ role: 'admin' }}
      validate={(values) => validate.check(values, formName)}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <ul className={styles.formWrapper} id="inputList">
            <li className={styles.inputWrapper} name="firstName">
              Product{' '}
              <Field
                name="firstName"
                component="input"
                placeholder="First name"
                type="text"
              />
              <Error name="firstName" />
            </li>
            <li className={styles.inputWrapper} name="lastName">
              <Field
                name="lastName"
                component="input"
                placeholder="Last name"
                type="text"
              />
              <Error name="lastName" />
            </li>
            <li className={styles.inputWrapper} name="userName">
              <Field
                name="userName"
                component="input"
                placeholder="Nick name"
                type="text"
              />
              <Error name="userName" />
            </li>
            <li className={styles.inputWrapper} name="email">
              <Field
                name="email"
                component="input"
                placeholder="Email"
                type="text"
              />
              <Error name="email" />
            </li>
            <li className={styles.inputWrapper} name="password">
              <Field
                name="password"
                component="input"
                placeholder="Password"
                type={isShowPassword ? 'text' : 'password'}
              />
              <div
                className={styles.showPassword}
                onMouseDown={() => setIsShowPassword(true)}
                onMouseUp={() => setIsShowPassword(false)}
              >
                <ReactSVG
                  className={styles.showPasswordIcon}
                  src={isShowPassword ? eye_invisible_svg : eye_visible_svg}
                />
              </div>
              <Error name="password" />
            </li>
            <li className={styles.inputWrapper} name="repass">
              <Field
                name="repass"
                component="input"
                id="repass"
                placeholder="Repeat password"
                type="password"
              />
              <Error name="repass" />
            </li>
            <li className={styles.inputWrapper} name="role">
              <li className={styles.role}>
                <label>
                  <Field
                    name="role"
                    component="input"
                    type="radio"
                    value="admin"
                  />{' '}
                  Admin
                </label>
                <label>
                  <Field
                    name="role"
                    component="input"
                    type="radio"
                    value="user"
                  />{' '}
                  User
                </label>
                <label>
                  <Field
                    name="role"
                    component="input"
                    type="radio"
                    value="guest"
                  />{' '}
                  Guest
                </label>
              </li>
            </li>
            <button type="submit" onSubmit={handleSubmit}>
              <span id="submit">{formName}</span>
            </button>
          </ul>
        </form>
      )}
    />
  );
};
