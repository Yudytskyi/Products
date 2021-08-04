import React from 'react';
import { Authentication } from '../components';
import { equal } from '../../../../validate';
import {
  FirstName,
  LastName,
  UserName,
  Email,
  Password,
  Repass,
  Role,
} from '../components';

const userResponseExample = {
  firstName: 'Ivanov',
  lastName: 'Ivan',
  userName: 'Vanya',
  password: 'testPassword1',
  repass: 'testPassword1',
  email: 'ivanov@gmail.com',
  role: 'admin',
};

const SignupForm = onSubmit => {
  return (
    <Authentication
      initialValues={userResponseExample}
      onSubmit={onSubmit}
      validate={equal}
      formName={'signup'}
    >
      <>
        <FirstName required={true} />
        <LastName required={true} />
        <UserName required={true} />
        <Email required={true} />
        <Password required={true} />
        <Repass required={true} />
        <Role required={true} />
      </>
    </Authentication>
  );
};

export default SignupForm;
