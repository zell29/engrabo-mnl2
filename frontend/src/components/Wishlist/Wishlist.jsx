import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/style';
import { BsCartPlus } from 'react-icons/bs';
import NordicMug from '../../assets/FrameImages/NordicMugFrame.jpg';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [
    {
      name: 'Engraved Chopping with mesh pouch',
      description: 'test',
      price: 200,
    },
    {
      name: 'Engraved Chopping with mesh pouch',
      description: 'test',
      price: 200,
    },
    {
      name: 'Engraved Chopping with mesh pouch',
      description: 'test',
      price: 300,
    },
    {
      name: 'Engraved Chopping with mesh pouch',
      description: 'test',
      price: 250,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-[#fff4d7] flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={20}
              className="cursor-pointer text-[#171203]"
              onClick={() => setOpenWishlist(false)}
            />
          </div>

          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500] text-[#171203]">
              3 items
            </h5>
          </div>

          {/* Cart Single Items */}
          <br />
          <div className="w-full border-t border-[#d8c68f]">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4 border-[#d8c68f]">
      <div className="w-full flex items-center">
        <RxCross1
          className="w=full flex items-center cursor-pointer text-[#6b540f]"
          size={12}
        />
        {/* Image Product */}
        <img src={NordicMug} alt="" className="w-[80px] h-[80px] ml-2" />

        {/* Price and Details of Product */}
        <div className="pl-[5px] text-justify">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#171203] font-Roboto">
            ₱ {totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus
            size={20}
            className="cursor-pointer"
            title="Add to Cart"
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
