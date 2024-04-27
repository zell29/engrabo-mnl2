// Add to Cart
export const addTocart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'addToCart',
    payload: data,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};

// Remove the Cart
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: 'removeFromCart',
    payload: data._id,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cart));
  return data;
};
