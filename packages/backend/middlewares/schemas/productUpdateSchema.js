'use strict';
const yup = require('yup');

const productUpdateSchema = {
  phone: yup
    .object()
    .shape({
      data: yup.object().shape({
        name: yup.string().trim(),
        typeName: yup.string().trim(),
        attributes: yup.object().shape({
          weight: yup.number().positive().integer(),
          color: yup.string().trim(),
          price: yup.number().positive(),
          dualSim: yup.boolean(),
        }),
      }),
    })
    .noUnknown({ unknownKey: true }),

  tablet: yup
    .object()
    .shape({
      data: yup.object().shape({
        name: yup.string().trim(),
        typeName: yup.string().trim(),
        attributes: yup.object().shape({
          weight: yup.number().positive().integer(),
          color: yup.string().trim(),
          price: yup.number().positive(),
        }),
      }),
    })
    .noUnknown({ unknownKey: true }),

  laptop: yup
    .object()
    .shape({
      data: yup.object().shape({
        name: yup.string().trim(),
        typeName: yup.string().trim(),
        attributes: yup.object().shape({
          weight: yup.number().positive().integer(),
          color: yup.string().trim(),
          price: yup.number().positive(),
          graphicsCard: yup.string(),
        }),
      }),
    })
    .noUnknown({ unknownKey: true }),
};

module.exports = productUpdateSchema;
