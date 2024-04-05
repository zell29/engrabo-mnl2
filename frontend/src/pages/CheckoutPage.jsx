import React from 'react';
import Header from '../components/Layout/Header';
import CheckoutSteps from '../components/Checkout/CheckoutSteps.jsx';
import Checkout from '../components/Checkout/Checkout.jsx';
const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
