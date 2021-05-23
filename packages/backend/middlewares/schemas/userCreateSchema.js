'use strict';
const yup = require('yup');
const {
  db: { usersRoles },
} = require('./../../config/db.json');

const userCreateSchema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        firstName: yup.string().trim().required(),
        lastName: yup.string().trim().required(),
        userName: yup.string().trim().required(),
        password: yup.string().trim().required(),
        email: yup.string().trim().email().required(),
        role: yup.string().oneOf(usersRoles).required(),
      })
    ),
  })
  .noUnknown({ unknownKey: true });

module.exports = userCreateSchema;