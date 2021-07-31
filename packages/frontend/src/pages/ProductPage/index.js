import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ProductForms } from '../../components/forms';
import styles from './styles.module.scss';
import { animationEffects } from './animationEffects';

const ProductPage = () => {
  const [currentForm, setCurrentForm] = useState('create');
  useEffect(() => {
    document.getElementById('logoLink').setAttribute('href', 'productLogo.png');
    document.getElementById('title').innerHTML = 'Product';
  });
  useLayoutEffect(() => animationEffects(currentForm));

  const onSubmit = (type, values) => {
    type === 'request product by id'
      ? window.alert(`get product by id:${values.productId}`)
      : window.alert(JSON.stringify({ currentForm, ...values }, 0, 2));
  };

  const ProductForm = () => ProductForms[currentForm](onSubmit);

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <header className={styles.formHeader}>
          <ul className={styles.formNames}>
            <li
              id="create"
              className={styles.title}
              onClick={() => setCurrentForm('create')}
            >
              create
            </li>
            <li
              id="get"
              className={styles.title}
              onClick={() => setCurrentForm('get')}
            >
              get
            </li>
            <li
              id="update"
              className={styles.title}
              onClick={() => setCurrentForm('update')}
            >
              update
            </li>
            <li
              id="delete"
              className={styles.title}
              onClick={() => setCurrentForm('delete')}
            >
              delete
            </li>
          </ul>
          <div id="arrowWrapper" className={styles.arrow} />
        </header>
        <ProductForm />
      </article>
    </section>
  );
};

export default ProductPage;
