'use strict';
const yup = require('yup');
const {
  db: {
    modelPreparedProductType: {
      productType: { typeName },
    },
  },
} = require('../../configs/db.json');

const productTypeCreateSchema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        productType: yup.object().shape({
          typeName: yup.mixed().oneOf(typeName).required(),
        }),
      })
    ),
  })
  .noUnknown();

module.exports = productTypeCreateSchema;
