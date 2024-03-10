import React from 'react';
import styles from '../../../styles/style';
import CountDown from './CountDown';

const EventCard = () => {
  return (
    <div className={`w-full block bg-white rounded-lg lg:flex p-2 mb-12`}>
      <div className="w-full lg:-w[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdal.jpg" alt="" />
      </div>
      <div className="w-full lg:-w[50%] flex flex-col justify-center">
        {/* Title of Product */}
        <h2 className={`${styles.productTitle}`}> Chopping Board </h2>

        {/* Description of Product */}
        <p className="text-justify pr-2 text-[#534723]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
          eligendi dolorem tempore est vel aperiam ipsam atque ut, eos, animi
          nostrum nam nesciunt necessitatibus veritatis eius ratione facere ab
          labore!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
          eligendi dolorem tempore est vel aperiam ipsam atque ut, eos, animi
          nostrum nam nesciunt necessitatibus veritatis eius ratione facere ab
          labore!
        </p>
        <div className="flex py-2 justify-between">
          {/* Price of Product */}
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ₱ 250
            </h5>
            <h5 className="font-bold text-[20px] text-[#171203] font-Roboto">
              ₱ 200
            </h5>
          </div>

          {/* Sold of Product */}
          <span className="pr-3 font-[400] text-[17px] text-[#b19b56]">
            128 sold
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
