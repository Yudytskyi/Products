'use strict';
const yup = require('yup');
const {
  db: {
    modelPreparedProductType: {
      productType: { typeName },
    },
  },
} = require('../../config/db.json');

const productTypeCreateSchema = yup
  .object()
  .shape({
    data: yup.object().shape({
      productType: yup.object().shape({
        typeName: yup.mixed().oneOf(typeName).required(),
      }),
    }),
  })
  .noUnknown();

module.exports = productTypeCreateSchema;
