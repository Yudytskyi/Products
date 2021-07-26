class Validate {
  constructor() {
    this.minLength = 3;
    this.maxLength = 32;
    this.EMAIL_SCHEMA = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    this.PASSWORD_SCHEMA =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?!.*\s).{8,64}$/;
  }

  required = (value) => (value ? undefined : 'Required');

  toppings = (values) =>
    !values.toppings
      ? { toppings: 'Required' }
      : values.toppings.length < 2
      ? { toppings: 'Choose more' }
      : {};

  notes = (values) => (values.notes ? {} : { notes: 'Required' });

  requiredField = (values) => (values ? undefined : `* field is required`);

  length = (values) =>
    values
      ? values.length > this.maxLength
        ? `* max length is ${this.maxLength} symbols`
        : values?.length < this.minLength
        ? `* min length is ${this.minLength} symbols`
        : undefined
      : 'Required';

  email = (values, visited) =>
    values && !this.EMAIL_SCHEMA.test(values)
      ? '* invalid email address'
      : visited
      ? 'Required'
      : undefined;

  password = (values) =>
    values && !this.PASSWORD_SCHEMA.test(values)
      ? '* the password must be from 8 to 64 characters long, contain letters of different case and numbers'
      : undefined;

  emailAndPassword = (values, touched, active, visited) => {
    const errors = {};
    // const errors = visited ? { email: 'Required', password: 'Required' } : {};
    errors.email = this.email(values.email);
    errors.password = this.password(values.password);

    return errors;
  };
}

export default new Validate();
