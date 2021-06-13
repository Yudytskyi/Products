'use strict';
const yup = require('yup');
const { getValueByKeys, testFieldInSchema } = require('../../services');
const { db } = require('../../configs/db.json');
const typeNames = getValueByKeys(db, 'typeName');

const productUpdateSchema = yup
  .object()
  .shape({
    data: yup.array().of(
      yup.object().shape({
        product: yup.object().shape({
          name: yup.string().trim(),
        }),
        productType: yup.object().shape({
          typeName: yup.string().oneOf(typeNames),
        }),
        attributes: yup.object().shape({
          weight: yup.number().positive().integer(),
          color: yup.string().trim(),
          price: yup.number().positive(),
          dualSim: yup.boolean().test({
            name: 'isPhone',
            message: 'Field <dualSim> is invalid',
            test: (value, context) =>
              testFieldInSchema(value, context, 'phone'),
            exclusive: true,
          }),
          graphicsCard: yup.string().test({
            name: 'isGraphicsCard',
            message: 'Field <isGraphicsCard> is invalid',
            test: (value, context) =>
              testFieldInSchema(value, context, 'laptop'),
            exclusive: true,
          }),
        }),
      })
    ),
  })
  .noUnknown({ unknownKey: true });

module.exports = productUpdateSchema;
