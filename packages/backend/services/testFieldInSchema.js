'use strict';

const testFieldInSchema = (value, context, fieldName) => {
  const typeName = context.from[1].value.productType.typeName;
  return (value !== undefined && typeName === fieldName) ||
    (value === undefined && typeName !== fieldName)
    ? true
    : false;
};

module.exports = testFieldInSchema;
