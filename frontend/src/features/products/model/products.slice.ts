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
    changeProductsById: (state, action) => {
      const { id, changes } = action.payload;
      const productIndex = state.products.findIndex(p => p.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = { 
          ...state.products[productIndex], 
          ...changes 
        };
      }
    },
  },
});

export const productsReducer = productsSlice.reducer;
export const { changeProducts, changeLoading,changeProductsById } = productsSlice.actions;
