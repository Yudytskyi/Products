import React from 'react';
import Product from '../components/Product';

import {
  ProductNameForm,
  ProductTypeForm,
  ProductAttributesForm,
  validatePage,
} from '../components';

const initialValues = { productType: 'tablet' };

const CreateProductForm = onSubmit => {
  return (
    <Product initialValues={initialValues} onSubmit={onSubmit}>
      <ProductNameForm />
      <ProductTypeForm />
      <ProductAttributesForm validate={validatePage} />
    </Product>
  );
};

export default CreateProductForm;
