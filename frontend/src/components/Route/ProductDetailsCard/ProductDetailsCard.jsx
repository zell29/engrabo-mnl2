import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../../styles/style';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

const ProductDetailsCard = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-white">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            {/* Exit of the Product View */}
            <RxCross1
              size={20}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
              color="#171203"
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                {/* Image of the Product View */}
                <img src={data.image_Url[0].url} alt="" />

                {/* Other's Shop of the Product View */}
                <div className="flex pt-2">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />

                  {/* Other's Shop name of the Product View */}
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="pb-3 text-[15px]">
                      ({data.shop.ratings}) Ratings
                    </h5>
                  </div>
                </div>

                {/* Message shop of the Product View */}
                <div
                  className={`${styles.button} bg-[#171203] mt-4 !rounded-[4px] !h-11 hover:opacity-95 transition duration-300 ease-in-out`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff4d7] flex items-center ">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>

                {/* Sold Product View */}
                <h5 className="text-[16px] text-[#b19b56]">
                  ({data.total_sell}) Sold out
                </h5>
              </div>

              {/* Description of a Product */}
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1
                  className={`${styles.productTitle} text-[20px] text-[#171203]`}
                >
                  {data.name}
                </h1>
                <p className="text-justify pt-2 text-[#534723]">
                  {data.description}
                </p>

                {/* Price of a Product */}
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    ₱ {data.discount_price}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? '₱' + data.price : null}
                  </h3>
                </div>

                <div className="flex items-center mt-12 justify-between pr-3">
                  {/* Add and Dec number of a Product */}
                  <div>
                    <button
                      className="bg-gradient-to-r from-[#534723] to-[#171203] text-white font-bold !rounded px-4 py-2 shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-[#fff4d7] text-[#171203] font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-[#534723] to-[#171203] text-white font-bold !rounded px-4 py-2 shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>

                  {/* Heart of a Product */}
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? '#171203' : '#171203'}
                        title="Removed from Wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => setClick(!click)}
                        color={click ? '#171203' : '#171203'}
                        title="Added to Wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 !rounded-[4px] !h-11 flex items-center hover:opacity-95 transition duration-300 ease-in-out`}
                >
                  <span className="text-[#fff4d7] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
