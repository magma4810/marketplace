import { UserState } from "../../../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  username: sessionStorage.getItem("username") || "",
  password: "",
  productsID: [],
  ordersID: [],
  role: sessionStorage.getItem("role"),
  loading: true,
  isAuthenticated:
    sessionStorage.getItem("isAuthenticated") === "true" || false,
  address: sessionStorage.getItem("address") || "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    changeUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    changeRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
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
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("isAuthenticated");
      sessionStorage.removeItem("role");
      state.username = "";
      state.password = "";
      state.loading = false;
      state.isAuthenticated = false;
      state.ordersID = [];
      state.productsID = [];
    },
  },
});



export const userReducer = userSlice.reducer;
export const {
  changeProductsID,
  changeIsAuthenticated,
  changeUsername,
  logout,
  addOrdersID,
  clearProductsID,
  changeLoading,
  changeOrdersID,
  deleteProductsID,
  addProductsID,
  changeRole
} = userSlice.actions;
