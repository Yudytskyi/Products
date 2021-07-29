import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ProductForms } from '../../components/forms';
import styles from './styles.module.scss';
import { animationEffects } from './animationEffects';

const ProductPage = () => {
  const [currentForm, setCurrentForm] = useState('create');
  useEffect(() => {
    document.getElementById('logoLink').setAttribute('href', 'productLogo.png');
    document.getElementById('title').innerHTML = 'Product';
  }, [null]);
  useLayoutEffect(() => animationEffects(currentForm));

  const onSubmit = values => {
    window.alert(currentForm);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const ProductForm = () => ProductForms[currentForm](onSubmit);

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <header className={styles.formHeader}>
          <ul className={styles.formNames}>
            <li
              id="create"
              className={styles.signup}
              onClick={() => setCurrentForm('create')}
            >
              create
            </li>
            <li
              id="get"
              className={styles.signup}
              onClick={() => setCurrentForm('get')}
            >
              get
            </li>
            <li
              id="update"
              className={styles.signup}
              onClick={() => setCurrentForm('update')}
            >
              update
            </li>
            <li
              id="delete"
              className={styles.signup}
              onClick={() => setCurrentForm('delete')}
            >
              delete
            </li>
          </ul>
          <div id="arrowWrapper" className={styles.arrowWrapper}>
            <div className={styles.arrow}>
              <div />
            </div>
          </div>
        </header>
        <ProductForm />
      </article>
    </section>
  );
};

export default ProductPage;
