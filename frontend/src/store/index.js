import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { productsReducer } from "./products.slice";
import { ordersReducer } from "./orders.slice";
import { userReducer } from "./user.slice";
const rootReducer = combineReducers({
    products: productsReducer,
    orders: ordersReducer,
    user: userReducer
});
export const store = configureStore({
    reducer: rootReducer,
});
export const useAppDispatch = () => useDispatch();
