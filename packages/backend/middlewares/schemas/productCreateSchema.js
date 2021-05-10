'use strict';
const yup = require('yup');
const {
  db: {
    productTypes: { typeName },
  },
} = require('../../config/db.json');

function testField(value, context, fieldName) {
  const typeName = context.from[1].value.typeName;
  return (value && typeName === fieldName) || (!value && typeName !== fieldName)
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
          message: 'The <dualSim> field id filled in incorrectly',
          test: (value, context) => testField(value, context, 'phone'),
        }),
        graphicsCard: yup.string().test({
          name: 'isGraphicsCard',
          message: 'The <isGraphicsCard> field id filled in incorrectly',
          test: (value, context) => testField(value, context, 'laptop'),
        }),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports = productCreateSchema;
