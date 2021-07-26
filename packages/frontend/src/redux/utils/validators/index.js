export const requiredField = value =>
  value ? undefined : `* field is required`;

export const maxLengthCreator = maxLength => value =>
  value?.length > maxLength
    ? `* max length is ${maxLength} symbols`
    : undefined;

export const minLengthCreator = minLength => value =>
  value?.length < minLength
    ? `* min length is ${minLength} symbols`
    : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? '* invalid email address'
    : undefined;

export const password = value =>
  value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?!.*\s).{8,64}$/.test(value)
    ? '* the password must be from 8 to 64 characters long, contain letters of different case and numbers'
    : undefined;
