import { createReducer } from '@reduxjs/toolkit';

const initialState = {
  events: [], // Holds all events
  isLoading: false,
  error: null,
  event: null, // Holds a single event or the event details
  message: null,
  success: false,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    // Create Event Admin
    .addCase('eventCreateRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('eventCreateSuccess', (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase('eventCreateFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get All Events Admin
    .addCase('getAllEventsAdminRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllEventsAdminSuccess', (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase('getAllEventsAdminFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete Event Admin
    .addCase('deleteEventRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('deleteEventSuccess', (state, action) => {
      state.isLoading = false;
      state.events = state.events.filter(
        (event) => event._id !== action.payload.id
      ); // Remove the event from the state
      state.message = action.payload.message;
    })
    .addCase('deleteEventFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Search Events Admin
    .addCase('searchEventsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('searchEventsSuccess', (state, action) => {
      state.isLoading = false;
      state.events = action.payload; // Assuming that the search action replaces the list of events with search results
    })
    .addCase('searchEventsFail', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get All Events
    .addCase('getAllEventsRequest', (state) => {
      state.isLoading = true;
    })
    .addCase('getAllEventsSuccess', (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;
    })
    .addCase('getAllEventsFailed', (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear Errors
    .addCase('clearErrors', (state) => {
      state.error = null;
    });
});
