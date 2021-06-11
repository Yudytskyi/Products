'use strict';

const testFieldInSchema = (value, context, fieldName) => {
  const typeName = context.from[1].value.productType.typeName;
  return (typeName === fieldName && value !== undefined) ||
    (typeName === undefined && value !== undefined) ||
    (value === undefined && typeName !== fieldName)
    ? true
    : false;
};

module.exports = testFieldInSchema;
