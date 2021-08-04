import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

const Home = () => {
  useEffect(() => {
    document
      .getElementById('logoLink')
      .setAttribute('href', './logos/productLogo.png');
    document.getElementById('title').innerHTML = 'Product';
  });

  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <h1 className={styles.formHeader}>Home</h1>
        <Link to="/user">
          <span>Authentication</span>
        </Link>
        <Link to="/product">
          <span>Product</span>
        </Link>
      </article>
    </section>
  );
};

export default Home;
