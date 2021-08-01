import React, { useState, useLayoutEffect } from 'react';
import { AuthForms } from '../../components/forms';
import { useDispatch } from 'react-redux';
import {
  loginRequest,
  signupRequest,
  logoutRequest,
} from '../../redux/actions/authActions/authActionCreators';
import styles from './styles.module.scss';
import { animationEffects } from './animationEffects';

const AuthPage = () => {
  const [currentForm, setCurrentForm] = useState('login');

  useLayoutEffect(() => animationEffects(currentForm));

  const dispatch = useDispatch();
  const requests = {
    login: values => {
      dispatch(loginRequest(values));
    },
    signup: values => {
      dispatch(signupRequest(values));
    },
    logout: values => dispatch(logoutRequest(values)),
  };

  const onSubmit = (formName, values) => {
    window.alert(JSON.stringify({ formName, ...values }, 0, 2));
    requests[currentForm](values);
  };

  const AuthForm = () => AuthForms[currentForm](onSubmit);

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <header className={styles.formHeader}>
          <ul className={styles.formNames}>
            <li
              id="login"
              className={styles.title}
              onClick={() => setCurrentForm('login')}
            >
              login
            </li>
            <li
              id="signup"
              className={styles.title}
              onClick={() => setCurrentForm('signup')}
            >
              signup
            </li>
            <li
              id="logout"
              className={styles.title}
              onClick={() => setCurrentForm('logout')}
            >
              logout
            </li>
          </ul>
          <div id="arrow" className={styles.arrow} />
        </header>
        <div id={'inputList'}>
          <AuthForm />
        </div>
      </article>
    </section>
  );
};

export default AuthPage;
