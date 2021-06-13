const yup = require('yup');
const {
  db: {
    modelPreparedUser: {
      user: { role: roles },
    },
  },
} = require('../../configs/db.json');
const { passwordRule } = require('../../configs/jwt');

const signUpSchema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        user: yup.object().shape({
          firstName: yup.string().trim().required(),
          lastName: yup.string().trim().required(),
          userName: yup.string().trim().required(),
          email: yup.string().trim().email().required(),
          password: yup
            .string()
            .matches(...passwordRule)
            .required(),
          role: yup.string().oneOf(roles).required(),
        }),
      })
    ),
  })
  .noUnknown({ unknownKey: true });

module.exports = signUpSchema;
