import React, { useState, useEffect, useLayoutEffect } from 'react';
import { LoginSignupForm } from '../../components';
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
  useEffect(() => {
    document.getElementById('logoLink').setAttribute('href', 'authLogo.png');
    document.getElementById('title').innerHTML = 'Authentication';
  });

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

  const onSubmit = (values, form) => {
    window.alert(JSON.stringify(values, 0, 2));
    requests[currentForm](values);
    form.reset();
  };

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <header className={styles.formHeader}>
          <ul className={styles.formNames}>
            <li
              id="login"
              className={styles.login}
              onClick={() => setCurrentForm('login')}
            >
              login
            </li>
            <li
              id="signup"
              className={styles.signup}
              onClick={() => setCurrentForm('signup')}
            >
              sign up
            </li>
            <li
              id="logout"
              className={styles.logout}
              onClick={() => setCurrentForm('logout')}
            >
              log out
            </li>
          </ul>
          <div id="arrowWrapper" className={styles.arrowWrapper}>
            <div className={styles.arrow}>
              <div />
            </div>
          </div>
        </header>
        <LoginSignupForm formName={currentForm} onSubmit={onSubmit} />
      </article>
    </section>
  );
};

export default AuthPage;
