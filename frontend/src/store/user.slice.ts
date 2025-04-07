import { StoreApp } from ".";
import { UserState } from "../../types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
const initialState: UserState = {
  username: sessionStorage.getItem('username') || "",
  password: "",
  productsID: [],
  ordersID: [],
  loading: true,
  isAuthenticated:  sessionStorage.getItem('isAuthenticated') === "true" || false
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    changeIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    changeProductsID: (state, action: PayloadAction<Array<number>>) => {
      state.productsID = action.payload;
    },
    addProductsID: (state, action: PayloadAction<number>) => {
      state.productsID = [...state.productsID, action.payload];
    },
    clearProductsID: (state) => {
      state.productsID = [];
    },
    deleteProductsID: (state, action: PayloadAction<number>) => {
      const index = state.productsID.reverse().indexOf(action.payload);
      if (index !== -1) {
        state.productsID.splice(index, 1);
        state.productsID.reverse();
      }
    },
    changeOrdersID: (state, action: PayloadAction<Array<number>>) => {
      state.ordersID = action.payload;
    },
    addOrdersID: (state, action: PayloadAction<number>) => {
      state.ordersID = [...state.ordersID, action.payload];
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('isAuthenticated');
      state.username = '';
      state.password = '';
      state.loading = false;
      state.isAuthenticated = false;
      state.ordersID = [];
      state.productsID = [];
    },
  },
});

export const updateMyOrders = createAsyncThunk(
  'user/updateMyOrders',
  async (payload: { username: string }, { getState }) => {
    const state = getState() as StoreApp; 
    console.log(state.user.ordersID)
    try {
      const response = await fetch(`http://localhost:3000/api/myOrders/${payload.username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          orders: state.user.ordersID
        }),
      });

      if (!response.ok) {
        throw new Error('Не удалось обновить заказы');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Update orders failed:', error);
      throw error;
    }
  }
);

export const updateProductsID = createAsyncThunk(
  'user/updateProductsID',
  async (payload: { username: string; productsID: Array<number> }) => {
    const response = await fetch(`http://localhost:3000/api/cart/${payload.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        cart: payload.productsID
      }),
    });

    if (!response.ok) {
      throw new Error('Не удалось обновить корзину');
    }

    const data = await response.json();
    return data;
  }
);

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

export const logoutFetch = createAsyncThunk(
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
    dispatch(changeLoading(true));
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
export const { changeProductsID,changeIsAuthenticated,changeUsername,logout,addOrdersID,clearProductsID, changeLoading, changeOrdersID, deleteProductsID, addProductsID } = userSlice.actions;