import React from 'react';
import styles from '../../../styles/style';
import CountDown from './CountDown';

const EventCard = ({ active }) => {
  return (
    <div
      className={`flex flex-col lg:flex-row w-full bg-white rounded-lg ${
        active ? 'unset' : 'mb-12'
      } p-2 justify-center items-center`}
    >
      <div className="w-full lg:w-1/2 flex justify-center">
        {/* Center the image by applying flexbox utilities */}
        {/* <img src= alt="Tumbler" className="h-[500px] object-contain" /> */}
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-4">
        {/* Title of Product */}
        <h2 className={`${styles.productTitle} text-center lg:text-left`}>
          Chopping Board
        </h2>

        {/* Description of Product */}
        <p className="text-justify text-[#534723]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
          eligendi dolorem tempore est vel aperiam ipsam atque ut, eos, animi
          nostrum nam nesciunt necessitatibus veritatis eius ratione facere ab
          labore! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Ullam eligendi dolorem tempore est vel aperiam ipsam atque ut, eos,
          animi nostrum nam nesciunt necessitatibus veritatis eius ratione
          facere ab labore!
        </p>
        <div className="flex py-2 justify-between w-full">
          {/* Price of Product */}
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ₱ 250
            </h5>
            <h5 className="font-bold text-[20px] text-[#171203]">₱ 200</h5>
          </div>

          {/* Sold of Product */}
          <span className="font-[400] text-[17px] text-[#b19b56]">
            128 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
