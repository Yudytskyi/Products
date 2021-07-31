import React from 'react';
import Product from '../components/Product';

import {
  ProductNameForm,
  ProductTypeForm,
  ProductAttributesForm,
} from '../components';

const initialValues = { productType: 'tablet' };
const CreateProductForm = onSubmit => {
  return (
    <Product initialValues={initialValues} onSubmit={onSubmit}>
      <ProductNameForm required={true} />
      <ProductTypeForm required={true} />
      <ProductAttributesForm required={true} />
    </Product>
  );
};

export default CreateProductForm;
