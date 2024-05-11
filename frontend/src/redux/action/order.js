import axios from 'axios';
import { server } from '../../server';

// Get all orders of user
export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllOrdersUserRequest',
    });

    const { data } = await axios.get(
      `${server}/order/get-all-orders/${userId}`
    );

    dispatch({
      type: 'getAllOrdersUserSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'getAllOrdersUserFailed',
      payload: error.response.data.message,
    });
  }
};

// Get all order of user on admin
export const getAllOrdersOfAdmin = (adminId) => async (dispatch) => {
  try {
    dispatch({
      type: 'getAllOrdersAdminRequest',
    });

    const { data } = await axios.get(
      `${server}/order/get-admin-all-orders/${adminId}`
    );

    dispatch({
      type: 'getAllOrdersAdminSuccess',
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: 'getAllOrdersAdminFailed',
      payload: error.response.data.message,
    });
  }
};
