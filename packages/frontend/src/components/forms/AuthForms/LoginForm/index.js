import React from 'react';
import Authentication from '../components/Authentication';

import { Email, Password } from '../components';

const initialValues = { email: 'adsf@ukr.net', password: 'Test1test' };
const LoginForm = onSubmit => {
  return (
    <Authentication
      initialValues={initialValues}
      onSubmit={onSubmit}
      formName={'login'}
    >
      <>
        <Email />
        <Password required={true} />
      </>
    </Authentication>
  );
};

export default LoginForm;
