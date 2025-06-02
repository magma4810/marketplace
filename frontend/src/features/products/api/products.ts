import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeLoading, changeProducts } from "../model/products.slice";


const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = createAsyncThunk(
    "products/getProducts",
    async (_, { dispatch }) => {
      dispatch(changeLoading(true));
      const response = await fetch(`${API_URL}/products/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Не удалось загрузить продукты");
      }
  
      const data = await response.json();
      dispatch(changeProducts(data));
      dispatch(changeLoading(false));
      return data;
    },
  );

  export const updateCountProduct = createAsyncThunk(
    "products/updateCountProduct",
    async (id, { dispatch }) => {
      dispatch(changeLoading(true));
      const response = await fetch(`${API_URL}/updateCountProduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Не удалось загрузить продукты");
      }
  
      const data = await response.json();
      dispatch(changeProducts(data));
      dispatch(changeLoading(false));
      return data;
    },
  );