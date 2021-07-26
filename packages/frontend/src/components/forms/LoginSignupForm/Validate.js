class Validate {
  constructor() {
    this.minLength = 3;
    this.maxLength = 32;
    this.EMAIL_SCHEMA = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    this.PASSWORD_SCHEMA =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*?[0-9])(?!.*\s).{8,64}$/;
  }

  required = (values) => (values ? undefined : '* field is required');

  length = (values) =>
    values
      ? values.length > this.maxLength
        ? `* max length is ${this.maxLength} symbols`
        : values?.length < this.minLength
        ? `* min length is ${this.minLength} symbols`
        : undefined
      : '* field is required';

  email = (values) =>
    values
      ? this.EMAIL_SCHEMA.test(values)
        ? undefined
        : '* invalid email address'
      : '* field is required';

  password = (values) =>
    values
      ? this.PASSWORD_SCHEMA.test(values)
        ? undefined
        : '* the password must be from 8 to 64 characters long, contain letters of different case and numbers'
      : '* field is required';

  repass = ({ password, repass }) =>
    password === repass ? undefined : 'repeat password invalid';

  check = (values, formName) =>
    formName === 'login'
      ? {
          email: this.email(values.email),
          password: this.password(values.password),
        }
      : formName === 'signup'
      ? {
          firstName: this.length(values.firstName),
          lastName: this.length(values.lastName),
          userName: this.required(values.userName),
          email: this.email(values.email),
          password: this.password(values.password),
          repass: this.repass(values),
        }
      : formName === 'logout'
      ? {
          email: this.email(values.email),
        }
      : {};
}

export default new Validate();
