'use strict';
const yup = require('yup');

const productCreateSchema = {};

productCreateSchema.phone = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string().trim().required(),
      typeName: yup.string().trim().required(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        dualSim: yup.boolean().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

productCreateSchema.tablet = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string().trim().required(),
      typeName: yup.string().trim().required(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

productCreateSchema.laptop = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string().trim().required(),
      typeName: yup.string().trim().required(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        graphicsCard: yup.string().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports = productCreateSchema;
