export const requiredField = value =>
  value ? undefined : '* field is required!';

export const price = value => (isNaN(value) ? 'Must be a number' : undefined);

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
