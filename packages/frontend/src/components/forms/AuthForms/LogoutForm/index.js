import React from 'react';
import Authentication from '../components/Authentication';
import { Email } from '../components';

const initialValues = { email: 'test@ukr.net' };
const LogoutForm = onSubmit => {
  return (
    <Authentication
      initialValues={initialValues}
      onSubmit={onSubmit}
      formName={'logout'}
    >
      <Email />
    </Authentication>
  );
};

export default LogoutForm;
