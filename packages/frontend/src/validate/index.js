const EMAIL_SCHEMA = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const PASSWORD_SCHEMA = /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?!.*\s).{8,64}$/;

export const requiredField = value =>
  value ? undefined : '* field is required!';

export const price = value => (isNaN(value) ? 'Must be a number' : undefined);

export const email = value =>
  EMAIL_SCHEMA.test(value) ? undefined : '* invalid email address';

export const password = value =>
  PASSWORD_SCHEMA.test(value)
    ? undefined
    : '* the password must be from 8 to 64 characters long, contain letters of different case and numbers';

export const equal = ({ password, repass }) =>
  password === repass ? {} : { repass: '* incorrect password confirmation' };

export const length = (minLength, maxLength) => values =>
  values?.length < minLength
    ? `* min length is ${minLength} symbols`
    : values?.length > maxLength
    ? `* max length is ${maxLength} symbols`
    : undefined;

export const composeValidators =
  (...validators) =>
  value =>
    validators
      .filter(validator => validator)
      .reduce((error, validator) => error || validator(value), undefined);
