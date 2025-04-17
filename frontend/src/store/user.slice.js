import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
    username: sessionStorage.getItem('username') || "",
    password: "",
    productsID: [],
    ordersID: [],
    loading: true,
    isAuthenticated: sessionStorage.getItem('isAuthenticated') === "true" || false,
    address: sessionStorage.getItem('address') || "",
};
const API_URL = import.meta.env.VITE_API_URL;
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUsername: (state, action) => {
            state.username = action.payload;
        },
        changeIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        changeProductsID: (state, action) => {
            state.productsID = action.payload;
        },
        addProductsID: (state, action) => {
            state.productsID = [...state.productsID, action.payload];
        },
        clearProductsID: (state) => {
            state.productsID = [];
        },
        deleteProductsID: (state, action) => {
            const index = state.productsID.reverse().indexOf(action.payload);
            if (index !== -1) {
                state.productsID.splice(index, 1);
                state.productsID.reverse();
            }
        },
        changeOrdersID: (state, action) => {
            state.ordersID = action.payload;
        },
        addOrdersID: (state, action) => {
            state.ordersID = [...state.ordersID, action.payload];
        },
        changeLoading: (state, action) => {
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
export const getOrders = createAsyncThunk('user/getOrders', async (username, { dispatch }) => {
    dispatch(changeLoading(true));
    const response = await fetch(`${API_URL}/myOrders/${username}`, {
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
});
export const updateMyOrders = createAsyncThunk('user/updateMyOrders', async (payload, { getState }) => {
    const state = getState();
    console.log(state.user.ordersID);
    try {
        const response = await fetch(`${API_URL}/myOrders/${payload.username}`, {
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
    }
    catch (error) {
        console.error('Update orders failed:', error);
        throw error;
    }
});
export const updateProductsID = createAsyncThunk('user/updateProductsID', async (payload) => {
    const response = await fetch(`${API_URL}/cart/${payload.username}`, {
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
});
export const logoutFetch = createAsyncThunk('user/logout', async (_, { dispatch }) => {
    const response = await fetch(`${API_URL}/logout`, {
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
});
export const getCart = createAsyncThunk('user/getCart', async (username, { dispatch }) => {
    dispatch(changeLoading(true));
    const response = await fetch(`${API_URL}/cart/${username}`, {
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
});
export const userReducer = userSlice.reducer;
export const { changeProductsID, changeIsAuthenticated, changeUsername, logout, addOrdersID, clearProductsID, changeLoading, changeOrdersID, deleteProductsID, addProductsID } = userSlice.actions;
