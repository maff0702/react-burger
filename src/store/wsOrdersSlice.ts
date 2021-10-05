import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../services/main-service";
import { IOrderCard } from "../types/order";

export const requestOrders = createAsyncThunk(
    'wsOrders/requestOrders',
    async (query :any) => {
      const response = await axiosAPI.getOrders(query);
      return response.data;
    }
  )

  export type TOrdersState = {
    orders: IOrderCard[] | null;
    total: number | null;
    totalToday: number | null;
    message: string;
    url: string;
    isConnected: boolean;
    isError: boolean;
    isLoading: boolean;
    statusCode: number | null;
    isModalOrder: boolean;
    orderModalTitle: string;
  };
  const initialState:TOrdersState = {
    orders: [],
    total: null,
    totalToday: null,
    message: '',
    url: '',
    isConnected: false,
    isError: false,
    isLoading: false,
    statusCode: null,
    isModalOrder: false,
    orderModalTitle: '',
  }

const wsOrders = createSlice({
  name: 'wsOrders',
  initialState,
  reducers: {
    wsConnectionStart: (state, action) => {
      state.url = action.payload;
      state.isLoading = true;
    },
    wsConnectionSuccess: (state) => {
      state.isConnected = true;
      state.isError = false;
    },
    wsGetMessage: (state, action) => {
      state.orders = action.payload?.orders;
      state.total = action.payload?.total;
      state.totalToday = action.payload?.totalToday;
      state.message = action.payload?.message;
      state.isLoading = false;
    },
    wsConnectionClosed: (state) => {
      state.orders = null;
      state.total = null;
      state.totalToday = null;
      state.isConnected = false;
    },
    wsConnectionClosedStatus: (state, action) => {
      state.statusCode = action.payload;
    },
    wsConnectionError: (state) => {
      state.isError = true;
      state.isLoading = false;
    },
    orderModalOpen: (state, action) => {
      state.isModalOrder = true;
      state.orderModalTitle = action.payload;
    },
    orderModalClose: (state) => {
      state.isModalOrder = false;
      state.orderModalTitle = '';
    },
  },
  extraReducers: {
    [requestOrders.pending.toString()]: (state) => { state.isLoading = true},
    [requestOrders.fulfilled.toString()]: (state, action) => {
      state.orders = action.payload.orders;
      state.isLoading = false;
    },
    [requestOrders.rejected.toString()]: (state) => {
      state.isError = true;
      state.isLoading = false
    },
  }
})

export const {
    wsConnectionStart,
    wsConnectionSuccess,
    wsGetMessage,
    wsConnectionClosed,
    wsConnectionClosedStatus,
    wsConnectionError,
    orderModalOpen,
    orderModalClose,
} = wsOrders.actions;
export default wsOrders.reducer;
