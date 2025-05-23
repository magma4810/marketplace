import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productsReducer } from "../../../features/products/model/products.slice";
import { ordersReducer } from "../../../features/orders/model/orders.slice";
import { userReducer } from "./user.slice";

const rootReducer = combineReducers({
  products: productsReducer,
  orders: ordersReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type StoreApp = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
