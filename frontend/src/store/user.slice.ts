import { UserState } from "../../types";
import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit"
const initialState: UserState = {
    username: "ermesanl",
    password: "",
    productsID: [],
    ordersID: [],
    loading: true,
  };

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      changeProductsID: (state, action: PayloadAction<Array<number>>) => {
        state.productsID = action.payload;
      },
      addProductsID: (state, action: PayloadAction<Array<number>>) => {
        state.productsID = [...state.productsID, ...action.payload];
      },
      changeOrdersID: (state, action: PayloadAction<Array<number>>) => {
        state.ordersID = action.payload;
      },
      changeLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      logout: (state) => {
        state.username = '';
        state.password = '';
        state.loading = false;
        state.ordersID = [];
        state.productsID = [];
      },
    },
  });

  export const getOrders = createAsyncThunk(
    'user/getOrders',
    async (username: string, { dispatch }) => {
      const response = await fetch(`http://localhost:3000/api/myOrders/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные о заказах');
      }
  
      const data = await response.json();
      dispatch(changeOrdersID(data[0].ordersID));
      dispatch(changeLoading(false));
      return data; 
    }
  );

  export const logout = createAsyncThunk(
    'user/logout',
    async (_, { dispatch }) => {
      const response = await fetch(`http://localhost:3000/api/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Не удалось разлогиниться');
      }
  
      const data = await response.json();

      dispatch(logout());
      return data; 
    })

  export const getCart = createAsyncThunk(
    'user/getCart',
    async (username: string, { dispatch }) => {
      const response = await fetch(`http://localhost:3000/api/cart/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные о корзине');
      }
  
      const data = await response.json();

      dispatch(changeProductsID(data[0].productsID));
      dispatch(changeLoading(false));
      return data; 
    }
  );
  
  export const userReducer = userSlice.reducer;
  export const { changeProductsID,changeLoading,changeOrdersID} = userSlice.actions;