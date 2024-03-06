import React from 'react';
import Header from '../components/Layout/Header';
import Slider from '../components/Route/Slider/Slider';
import Categories from '../components/Route/Categories/Categories';
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Slider />
      <Categories />
    </div>
  );
};

export default HomePage;
