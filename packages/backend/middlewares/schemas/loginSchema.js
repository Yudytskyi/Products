const yup = require('yup');

const loginSchema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        user: yup.object().shape({
          password: yup.string().trim().required(),
          email: yup.string().trim().email().required(),
        }),
      })
    ),
  })
  .noUnknown({ unknownKey: true });

module.exports = loginSchema;
