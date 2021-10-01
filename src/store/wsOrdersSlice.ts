import { createSlice } from "@reduxjs/toolkit";

const wsOrders = createSlice({
  name: 'wsOrders',
  initialState: {
    orders: [],
    total: null,
    totalToday: null,
    url: '',
    isConnected: false,
    isError: false,
    isLoading: false,
  },
  reducers: {
    wsConnectionStart: (state, action) => {
        state.url = action.payload;
        state.isLoading = true;
    },
    wsConnectionSuccess: (state) => {
        state.isConnected = true;
        state.isError = false;
        state.isLoading = false;
    },
    wsGetMessage: (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
    },
    wsConnectionClosed: (state) => {
        state.isConnected = false;
    },
    wsConnectionError: (state) => {
        state.isError = true;
        state.isLoading = false;
    },
  },
  extraReducers: {},
})

export const {
    wsConnectionStart,
    wsConnectionSuccess,
    wsGetMessage,
    wsConnectionClosed,
    wsConnectionError,
} = wsOrders.actions;
export default wsOrders.reducer;
