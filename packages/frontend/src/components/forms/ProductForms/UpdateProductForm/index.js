import React from 'react';
import Product from '../components/Product';

import {
  ProductIdForm,
  ProductNameForm,
  ProductTypeForm,
  ProductAttributesForm,
} from '../components';

const productResponseExample = {
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
    <Product initialValues={productResponseExample} onSubmit={onSubmit}>
      <ProductIdForm required={true} />
      <ProductNameForm />
      <ProductTypeForm />
      <ProductAttributesForm />
    </Product>
  );
};

export default UpdateProductForm;
