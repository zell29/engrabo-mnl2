import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/style';
import { HiOutlineMinus, HiPlus } from 'react-icons/hi';
import { IoBagHandleOutline } from 'react-icons/io5';
import Tumbler from '../../assets/FrameImages/TumblerFrame.jpg';
import { Link } from 'react-router-dom';

const Cart = ({ setOpenCart }) => {
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
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
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
        <div className="px-5 mb-3">
          {/* Checkout Button */}
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#171203] rounded-[5px]`}
            >
              <h1 className="text-[#fff4d7] text-[18px] font-[600]">
                Checkout Now (₱ 2000)
              </h1>
            </div>
          </Link>
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
        <div>
          {/* Button Add and Minus Product */}
          <div
            className={`bg-gradient-to-r from-[#534723] to-[#171203] hover:opacity-80 transition duration-300 ease-in-out rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-gradient-to-r from-[#dbcca1] to-[#b5a060] hover:opacity-80 transition duration-300 ease-in-out rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#171203" />
          </div>
        </div>

        {/* Image Product */}
        <img src={Tumbler} alt="" className="w-[80px] h-[80px] ml-2" />

        {/* Price and Details of Product */}
        <div className="pl-[5px] text-justify">
          <h1>{data.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#534723]">
            ₱ {data.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#171203] font-Roboto">
            ₱{totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer " />
      </div>
    </div>
  );
};

export default Cart;
