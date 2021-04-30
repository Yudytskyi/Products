'use strict';
const yup = require('yup');

const productCreateSchemas = {};

productCreateSchemas.phone = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string(),
      typeName: yup.string().trim(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        dualSim: yup.boolean().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

productCreateSchemas.tablet = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string(),
      typeName: yup.string().trim(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

productCreateSchemas.laptop = yup
  .object()
  .shape({
    data: yup.object().shape({
      name: yup.string(),
      typeName: yup.string().trim(),
      attributes: yup.object().shape({
        weight: yup.number().positive().integer().required(),
        color: yup.string().trim().required(),
        price: yup.number().positive().required(),
        graphicsCard: yup.string().required(),
      }),
    }),
  })
  .noUnknown({ unknownKey: true });

module.exports = productCreateSchemas;
