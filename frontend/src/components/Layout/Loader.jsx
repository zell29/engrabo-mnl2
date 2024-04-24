import React from 'react';
import animationData from '../../assets/Animation/LoadingAnimation.gif';

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <img src={animationData} alt="Loading..." />
    </div>
  );
};

export default Loader;
