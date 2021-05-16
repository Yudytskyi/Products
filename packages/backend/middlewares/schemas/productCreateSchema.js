'use strict';
const yup = require('yup');
const { getValueByKeys, testFieldInSchema } = require('../../services');
const { db } = require('../../config/db.json');
const typeNames = getValueByKeys(db, 'typeName');

const productCreateSchema = yup
  .object()
  .shape({
    data: yup.object().shape({
      product: yup.object().shape({
        name: yup.string().trim().required(),
      }),
      productType: yup.object().shape({
        typeName: yup.string().oneOf(typeNames).required(),
      }),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        dualSim: yup.boolean().test({
          name: 'isPhone',
          message: 'Field <dualSim> is invalid',
          test: (value, context) => testFieldInSchema(value, context, 'phone'),
          exclusive: true,
        }),
        graphicsCard: yup.string().test({
          name: 'isGraphicsCard',
          message: 'Field <isGraphicsCard> is invalid',
          test: (value, context) => testFieldInSchema(value, context, 'laptop'),
          exclusive: true,
        }),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports = productCreateSchema;
