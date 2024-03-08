import React from 'react';
import Header from '../components/Layout/Header';
import Slider from '../components/Route/Slider/Slider';
import Categories from '../components/Route/Categories/Categories';
import BestDeals from '../components/Route/BestDeals/BestDeals';
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Slider />
      <Categories />
      <BestDeals />
    </div>
  );
};

export default HomePage;
