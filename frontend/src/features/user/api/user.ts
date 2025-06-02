import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoreApp } from "../../../app/providers/store";
import { changeLoading, changeOrdersID, changeProductsID, logout } from "../model/user.slice";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrders = createAsyncThunk(
    "user/getOrders",
    async (username: string, { dispatch }) => {
      dispatch(changeLoading(true));
      const response = await fetch(`${API_URL}/myOrders/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Не удалось загрузить данные о заказах");
      }
  
      const data = await response.json();
      dispatch(changeOrdersID(data[0].ordersID));
      dispatch(changeLoading(false));
      return data;
    },
  );
  
  export const updateMyOrders = createAsyncThunk(
    "user/updateMyOrders",
    async (payload: { username: string }, { getState }) => {
      const state = getState() as StoreApp;
      try {
        const response = await fetch(`${API_URL}/myOrders/${payload.username}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            orders: state.user.ordersID,
          }),
        });
  
        if (!response.ok) {
          throw new Error("Не удалось обновить заказы");
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Update orders failed:", error);
        throw error;
      }
    },
  );
  
  export const updateProductsID = createAsyncThunk(
    "user/updateProductsID",
    async (payload: { username: string; productsID: Array<number> }) => {
      const response = await fetch(`${API_URL}/cart/${payload.username}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          cart: payload.productsID,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Не удалось обновить корзину");
      }
  
      const data = await response.json();
      return data;
    },
  );
  
  export const logoutFetch = createAsyncThunk(
    "user/logout",
    async (_, { dispatch }) => {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Не удалось разлогиниться");
      }
  
      const data = await response.json();
      dispatch(logout());
      return data;
    },
  );
  
  export const getCart = createAsyncThunk(
    "user/getCart",
    async (username: string, { dispatch }) => {
      dispatch(changeLoading(true));
      const response = await fetch(`${API_URL}/cart/${username}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Не удалось загрузить данные о корзине");
      }
  
      const data = await response.json();
      dispatch(changeProductsID(data[0].productsID));
      dispatch(changeLoading(false));
      return data;
    },
  );