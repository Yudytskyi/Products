import React from 'react';
import Product from '../components/Product';

import {
  ProductIdForm,
  ProductNameForm,
  ProductTypeForm,
  ProductAttributesForm,
  validatePage,
} from '../components';

const productResponse = {
  productName: 'sku125',
  productType: 'laptop',
  weight: 1125,
  color: 'color125',
  price: 125.25,
  graphicsCard: true,
  graphicsCardName: 'cool graphicsCard125',
};

const UpdateProductForm = onSubmit => {
  return (
    <Product initialValues={productResponse} onSubmit={onSubmit}>
      <ProductIdForm id="ProductIdForm" />
      <ProductNameForm />
      <ProductTypeForm />
      <ProductAttributesForm validate={validatePage} />
    </Product>
  );
};

export default UpdateProductForm;
