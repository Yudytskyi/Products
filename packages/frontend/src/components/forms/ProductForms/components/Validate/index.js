const validateProperty = {
  minLength: 3,
  maxLength: 32,
  EMAIL_SCHEMA: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  PASSWORD_SCHEMA: /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?!.*\s).{8,64}$/,
};

export const validate = {
  required: (values) => (values ? undefined : '* field is required'),

  length: (values) =>
    values
      ? values.length > validateProperty.maxLength
        ? `* max length is ${validateProperty.maxLength} symbols`
        : values?.length < validateProperty.minLength
        ? `* min length is ${validateProperty.minLength} symbols`
        : undefined
      : '* field is required',

  disabled: (values) => {
    console.log(!values.graphicsCard);
    return true;
  },
};

export const validatePage = (values) => {
  return {
    weight: validate.required(values.weight),
    color: validate.required(values.color),
    price: validate.required(values.price),
  };
};
