import { OrdersState, Orders, OrderInfo } from "../../types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrdersID, clearProductsID, updateMyOrders } from "./user.slice";
const initialState: OrdersState = {
  orders: [],
  loading: true,
};

const API_URL = import.meta.env.VITE_API_URL;

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders = [...state.orders, ...action.payload];
    },
    changeOrders: (state, action: PayloadAction<Orders[]>) => {
      state.orders = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const getOrderByID = createAsyncThunk(
  "user/getOrderByID",
  async (id: number, { dispatch }) => {
    const response = await fetch(`${API_URL}/getOrderByID/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о товаре");
    }

    const data = await response.json();

    dispatch(addOrders(data));
    dispatch(changeLoading(false));
    return data;
  },
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (orderInfo: OrderInfo, { dispatch }) => {
    try {
      const currentDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(currentDate.getDate() + 2);

      const orderResponse = await fetch(`${API_URL}/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productsID: orderInfo.productsID,
          deliveryAdress: orderInfo.deliveryAdress,
          orderDate: currentDate.toLocaleDateString(),
          deliveryDate: deliveryDate.toLocaleDateString(),
          cost: orderInfo.cost,
          username: orderInfo.username,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Не удалось создать заказ");
      }

      const orderData = await orderResponse.json();
      dispatch(addOrdersID(orderData[0].id));
      await dispatch(
        updateMyOrders({
          username: orderInfo.username,
        }),
      );

      dispatch(clearProductsID());
      return orderData;
    } catch (error) {
      console.error("Order creation failed:", error);
      throw error;
    } finally {
      dispatch(changeLoading(false));
    }
  },
);

export const ordersReducer = ordersSlice.reducer;
export const { addOrders, changeOrders, changeLoading } = ordersSlice.actions;
