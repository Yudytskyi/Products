import React from 'react';
import Product from '../components/Product';

import {
  ProductIdForm,
  ProductNameForm,
  ProductTypeForm,
  ProductAttributesForm,
  validatePage,
} from '../components';

const initialValues = { productType: 'phone', dualSim: false };

const UpdateProductForm = onSubmit => {
  return (
    <Product initialValues={initialValues} onSubmit={onSubmit}>
      <ProductIdForm id="ProductIdForm" />
      <ProductNameForm />
      <ProductTypeForm />
      <ProductAttributesForm validate={validatePage} />
    </Product>
  );
};

export default UpdateProductForm;
