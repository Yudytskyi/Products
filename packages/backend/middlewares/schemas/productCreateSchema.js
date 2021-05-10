'use strict';
const yup = require('yup');
const {
  db: {
    productTypes: { typeName },
  },
} = require('../../config/db.json');

function testField(value, context, fieldName) {
  const typeName = context.from[1].value.typeName;
  return (value !== undefined && typeName === fieldName) ||
    (value === undefined && typeName !== fieldName)
    ? true
    : false;
}

const productCreateSchema = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string().trim().required(),
      typeName: yup.mixed().oneOf(Object.keys(typeName)).required(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        dualSim: yup.boolean().test({
          name: 'isPhone',
          message: 'Field <dualSim> is invalid',
          test: (value, context) => testField(value, context, 'phone'),
          exclusive: true,
        }),
        graphicsCard: yup.string().test({
          name: 'isGraphicsCard',
          message: 'Field <isGraphicsCard> is invalid',
          test: (value, context) => testField(value, context, 'laptop'),
          exclusive: true,
        }),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports = productCreateSchema;
