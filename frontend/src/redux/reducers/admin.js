import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  isLoading: true,
};

export const adminReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('LoadAdminRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('LoadAdminSuccess', (state, action) => {
      state.isAdmin = true;
      state.isLoading = false;
      state.admin = action.payload;
    })
    .addCase('LoadAdminFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAdmin = false;
    })
    // Update user information
    .addCase('updateAdminInfoRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('updateAdminInfoSuccess', (state, action) => {
      state.isLoading = false;
      state.admin = action.payload;
    })
    .addCase('updateAdminInfoFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
});
