import { OrdersState, Orders } from "../../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: OrdersState = {
  orders: [],
  loading: true,
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders.push(...action.payload)
    },
    changeOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { addOrders, changeOrders, changeLoading } = ordersSlice.actions;
