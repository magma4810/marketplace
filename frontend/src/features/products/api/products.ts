import { createAsyncThunk } from "@reduxjs/toolkit";
import { changeLoading, changeProducts } from "../model/products.slice";


const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = createAsyncThunk(
    "user/getProducts",
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