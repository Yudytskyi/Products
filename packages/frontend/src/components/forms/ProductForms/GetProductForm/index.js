import React from 'react';
import Product from '../components/Product';

import { ProductIdForm } from '../components';

const GetProductForm = onSubmit => {
  return (
    <Product onSubmit={onSubmit}>
      <ProductIdForm />
    </Product>
  );
};

export default GetProductForm;
