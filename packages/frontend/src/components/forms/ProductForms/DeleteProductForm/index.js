import React from 'react';
import Product from '../components/Product';

import { ProductIdForm } from '../components';

const DeleteProductForm = onSubmit => {
  return (
    <Product onSubmit={onSubmit}>
      <ProductIdForm required={true} />
    </Product>
  );
};

export default DeleteProductForm;
