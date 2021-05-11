'use strict';
const yup = require('yup');
const {
  db: {
    bodyOfProduct: {
      productType: { typeName },
    },
  },
} = require('../../config/db.json');

const productCreateSchema = yup
  .object()
  .shape({
    data: yup.object().shape({
      productType: yup.object().shape({
        typeName: yup.mixed().oneOf(Object.keys(typeName)).required(),
      }),
    }),
  })
  .noUnknown();

module.exports = productCreateSchema;
