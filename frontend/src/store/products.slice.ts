import { Products, ProductsState } from "../../types";
import { createSlice,PayloadAction,createAsyncThunk } from "@reduxjs/toolkit"
const initialState: ProductsState = {
    products: [],
    loading: true,
  };

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      changeProducts: (state, action: PayloadAction<Products[]>) => {
        state.products = action.payload;
      },
      changeLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      }
    },
  });

  export const getProducts = createAsyncThunk(
    'user/getProducts',
    async (_, { dispatch }) => {
      dispatch(changeLoading(true));
      const response = await fetch(`http://localhost:3000/api/products/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      if (!response.ok) {
        throw new Error('Не удалось загрузить продукты');
      }
  
      const data = await response.json();
      dispatch(changeProducts(data));
      dispatch(changeLoading(false));
      return data; 
    }
  );
  
  export const productsReducer = productsSlice.reducer;
  export const { changeProducts,changeLoading} = productsSlice.actions;