import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { adminReducer } from './reducers/admin';
import { productReducer } from './reducers/product';
import { eventReducer } from './reducers/event';
import { categoryReducer } from './reducers/category';

const Store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    products: productReducer,
    events: eventReducer,
    categories: categoryReducer,
  },
});

export default Store;
