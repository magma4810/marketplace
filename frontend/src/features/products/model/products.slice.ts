import { Products, ProductsState } from "../../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const { changeProducts, changeLoading } = productsSlice.actions;
