const yup = require('yup');
const {
  db: {
    modelPreparedUser: {
      user: { role: roles },
    },
  },
} = require('../../config/db.json');
const { passwordRule } = require('../../config/jwt');

const signUpSchema = yup.object().shape({
  firstName: yup.string().trim().required(),
  lastName: yup.string().trim().required(),
  displayName: yup.string().trim().required(),
  email: yup.string().trim().email().required(),
  password: yup
    .string()
    .matches(...passwordRule)
    .required(),
  role: yup.string().oneOf(roles).required(),
});

module.exports = signUpSchema;
