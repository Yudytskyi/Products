import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  useEffect(() => {
    document
      .getElementById('logoLink')
      .setAttribute('href', './logos/productLogo.png');
    document.getElementById('title').innerHTML = 'Product';
  });

  return (
    <div>
      <h1>Home</h1>
      <Link to="/user">
        <span>Authentication</span>
      </Link>
      <br />
      <br />
      <br />
      <Link to="/product">
        <span>Product</span>
      </Link>
    </div>
  );
};

export default Home;
