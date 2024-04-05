import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/style';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleMessageSubmit = () => {
    navigate('/inbox?conversation=55512ee');
  };

  return (
    <div className="bg-[#fff4d7] ">
      {data ? (
        <div className={`${styles.section} w-[90%] md:w-[80%] mx-auto`}>
          <div className="py-5 flex flex-col md:flex-row">
            {/* Images of Product */}
            <div className="w-full md:w-1/2 flex flex-col items-center">
              {/* Image of Product Main */}
              <img
                src={data.image_Url[select].url}
                alt=""
                className="w-full max-w-md"
              />
              <div className="flex mt-4">
                {/* Image of Product Choices */}
                <div
                  className={`${
                    select === 0 ? 'border' : 'null'
                  } cursor-pointer p-1`}
                >
                  <img
                    src={data?.image_Url[0].url}
                    alt=""
                    className="h-[200px] w-auto"
                    onClick={() => setSelect(0)}
                  />
                </div>
                <div
                  className={`${
                    select === 1 ? 'border' : 'null'
                  } cursor-pointer p-1`}
                >
                  <img
                    src={data?.image_Url[1].url}
                    alt=""
                    className="h-[200px] w-auto"
                    onClick={() => setSelect(1)}
                  />
                </div>
              </div>
            </div>
            {/* Description of Product */}
            <div className="w-full md:w-1/2 pt-5">
              {/* Image of Product Description */}
              <h1 className={`${styles.productTitle}`}>{data.name}</h1>
              <p className="text-justify text-[#534723]">{data.description}</p>
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
                    className="bg-gradient-to-r from-[#534723] to-[#171203] text-white h-11 font-bold !rounded px-4 py-2 shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-[#fff4d7] text-[#171203] font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-[#534723] to-[#171203] text-white h-11 font-bold !rounded px-4 py-2 shadow-lg hover:opacity-80 transition duration-300 ease-in-out"
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

              {/* Cart Button */}
              <div
                className={`${styles.button} mt-6 !rounded-[4px] !h-11 flex items-center hover:opacity-95 transition duration-300 ease-in-out`}
              >
                <span className="text-[#fff4d7] flex items-center">
                  Add to Cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
              <div className="flex items-center pt-8">
                <img
                  src={data.shop.shop_avatar.url}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div className="pr-8">
                  <h3
                    className={`${styles.shop_name} pb-1 pt-1 !text-[#171203]`}
                  >
                    {data.shop.name}
                  </h3>
                  <h5 className="pb-3 text-[15px] text-[#534723]">
                    ({data.shop.ratings}) Ratings
                  </h5>
                </div>
                <div
                  className={`${styles.button} bg-[#171203] mt-4 !rounded-[4px] !h-11 hover:opacity-95 transition duration-300 ease-in-out`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff4d7] flex items-center ">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f7ebca] px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        {/* Header for Products Details */}
        <div className="relative">
          <h5
            className={
              'text-[#171203] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#171203] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              'text-[#171203] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]'
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

      {/* Active for Product Details */}
      {active === 1 ? (
        <>
          <p className="text-[#534723] text-justify py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            voluptatibus repudiandae veritatis doloremque. Enim iusto doloribus,
            suscipit dignissimos voluptatum magni quidem? Recusandae nobis
            incidunt nihil nam beatae, qui fugiat ad! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Dicta, reprehenderit dolorem!
            Mollitia voluptates quas nemo, sed sit voluptate esse architecto
            aperiam reiciendis corporis obcaecati natus veritatis. Distinctio a
            repudiandae accusantium. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p className="text-[#534723] text-justify py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            voluptatibus repudiandae veritatis doloremque. Enim iusto doloribus,
            suscipit dignissimos voluptatum magni quidem? Recusandae nobis
            incidunt nihil nam beatae, qui fugiat ad! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Dicta, reprehenderit dolorem!
            Mollitia voluptates quas nemo, sed sit voluptate esse architecto
            aperiam reiciendis corporis obcaecati natus veritatis. Distinctio a
            repudiandae accusantium. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
          <p className="text-[#534723] text-justify py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            voluptatibus repudiandae veritatis doloremque. Enim iusto doloribus,
            suscipit dignissimos voluptatum magni quidem? Recusandae nobis
            incidunt nihil nam beatae, qui fugiat ad! Lorem ipsum dolor sit,
            amet consectetur adipisicing elit. Dicta, reprehenderit dolorem!
            Mollitia voluptates quas nemo, sed sit voluptate esse architecto
            aperiam reiciendis corporis obcaecati natus veritatis. Distinctio a
            repudiandae accusantium. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit.
          </p>
        </>
      ) : null}

      {/* Active for Product Reviews */}
      {active === 2 ? (
        <div className="w-full justify-center min-h-[40vh] flex items-center">
          <p>No Reviews yet!</p>
        </div>
      ) : null}

      {/* Active for Seller Information */}
      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h=[50px] rounded-full"
              />
              {/* Other's Shop name of the Product View */}
              <div className="pl-3">
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                <h5 className="pb-2 text-[15px] text-[#534723]">
                  ({data.shop.ratings}) Ratings
                </h5>
              </div>
            </div>
            {/* Shop Description */}
            <p className="pt-2 text-justify text-[#534723]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis,
              non. Illo praesentium distinctio quis, voluptatibus adipisci velit
              blanditiis deleniti culpa sed? Nisi pariatur amet qui sit ipsum
              earum perferendis impedit.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600] text-[#171203]">
                Joined on:
                <span className="font-[500] text-[#534723]">
                  {' '}
                  14 March, 2023
                </span>
              </h5>
              <h5 className="font-[600] text-[#171203] pt-3">
                Total Products:
                <span className="font-[500] text-[#534723]"> 50</span>
              </h5>
              <h5 className="font-[600] text-[#171203] pt-3">
                Total Reviews:
                <span className="font-[500] text-[#534723]"> 200</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-[#fff4d7]">Go to Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
