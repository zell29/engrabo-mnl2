import React from 'react';
import styles from '../../../styles/style';
import CountDown from './CountDown';
import { backend_url } from '../../../server';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addTocart } from '../../../redux/action/cart';

const EventCard = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Add a guard clause to check if data is available
  if (!data || !data.images || data.images.length === 0) {
    console.log('Data or images not provided or empty in EventCard');
    return <div>Loading event data...</div>; // Render a fallback or a loading indicator
  }

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error(`${data.name} already in a cart!`);
    } else {
      if (data.stock < 1) {
        toast.error(
          `${data.name} stock is limited! Please contact us to reserve your order!`
        );
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success(`${data.name} added to cart successfully!`);
      }
    }
  };

  return (
    <div
      className={`flex flex-col lg:flex-row w-full bg-white rounded-lg mb-12 p-2 justify-center items-center`}
    >
      <div className="w-[400px] h-[420px] 800px:pt-3 800px:pb-3 pb-0 pt-3 lg:w-1/2 800px:pr-[140px] pr-0 flex justify-center">
        <img
          src={`${backend_url}/${data.images[0]}`}
          alt={data.name || 'Event'}
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-4">
        <h2 className={`${styles.productTitle} text-center lg:text-left`}>
          {data.name}
        </h2>
        <p className="text-justify text-[#534723]">{data.description}</p>
        <div className="flex py-2 justify-between w-full">
          {/* Price of Product */}
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              ₱ {data.originalPrice}
            </h5>
            <h5 className="font-bold text-[20px] text-[#171203]">
              ₱ {data.discountPrice}
            </h5>
          </div>

          {/* Sold of Product */}
          <span className="font-[400] text-[17px] text-[#b19b56]">
            128 sold
          </span>
        </div>
        <CountDown data={data} />
        <br />
        <div className="flex items-center">
          <Link to={`/product/${data._id}?isEvent=true`}>
            <div className={`${styles.button} text-[white]`}>See Details</div>
          </Link>
          <div
            className={`${styles.button} text-[white] ml-5`}
            onClick={(e) => addToCartHandler(data)}
          >
            Add to cart
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
