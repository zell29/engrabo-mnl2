import React from 'react';
import Header from '../components/Layout/Header';
import Slider from '../components/Route/Hero/Slider';
const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Slider />
    </div>
  );
};

export default HomePage;
