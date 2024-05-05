import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllOrdersOfUser } from '../../redux/action/order';

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {' '}
      <>
        {data && data?.status === 'Processing' ? (
          <h1 className="text-[20px]">
            Your order was placed! Thank you for purchasing our products!
          </h1>
        ) : data?.status === 'Transferred to delivery partner' ? (
          <h1 className="text-[20px]">Your order was already dispatched!</h1>
        ) : data?.status === 'Shipping' ? (
          <h1 className="text-[20px]">Your order was already shipped!</h1>
        ) : data?.status === 'On the way' ? (
          <h1 className="text-[20px]">our order will be delivered soon!</h1>
        ) : data?.status === 'Delivered' ? (
          <h1 className="text-[20px]">Your order was delivered!</h1>
        ) : data?.status === 'Processing Refund' ? (
          <h1 className="text-[20px]">Your refund is processing!</h1>
        ) : data?.status === 'Refund Approved' ? (
          <h1 className="text-[20px]">Your refund is success!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;
