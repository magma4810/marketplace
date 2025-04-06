import { OrdersState, Orders } from "../../types";
import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit"
const initialState: OrdersState = {
    orders: [],
    loading: true,
  };

export const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
      addOrders: (state, action: PayloadAction<Orders[]>) => {
        state.orders = [...state.orders, ...action.payload];
      },
      changeLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      }
    },
  });


  export const getOrderByID = createAsyncThunk(
    'user/getOrderByID',
    async (id: number, { dispatch }) => {
      const response = await fetch(`http://localhost:3000/api/getOrderByID/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные о корзине');
      }
  
      const data = await response.json();

      dispatch(addOrders(data));
      dispatch(changeLoading(false));
      return data; 
    }
  );

  
  export const ordersReducer = ordersSlice.reducer;
  export const { addOrders,changeLoading} = ordersSlice.actions;