import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo } from "react";
import { Header } from "./Header";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import { getProducts } from "../store/products.slice";
import { getCart, getOrders, updateProductsID } from "../store/user.slice";
import { createOrder } from "../store/orders.slice";
import { EmptyCart } from "./EmptyCart";
import { CardCart } from "./CardCart";
export const Cart = () => {
    const loadingProductsID = useSelector((store) => store.products.loading);
    const productsID = useSelector((store) => store.user.productsID);
    const address = useSelector((store) => store.user.address);
    const products = useSelector((store) => store.products.products);
    const username = useSelector((store) => store.user.username);
    const uniqueProductsID = [...new Set(productsID)];
    const dispatch = useAppDispatch();
    const totalSum = useMemo(() => {
        return productsID.reduce((sum, id) => {
            const product = products.find(p => p.id === id);
            return sum + (product?.price || 0);
        }, 0);
    }, [productsID, products]);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
        dispatch(getOrders(username));
    }, []);
    useEffect(() => {
        if (!loadingProductsID) {
            dispatch(updateProductsID({ username: username, productsID: productsID }));
        }
    }, [productsID, loadingProductsID]);
    const orderInfo = {
        productsID: productsID,
        deliveryAdress: address,
        cost: totalSum,
        username: username
    };
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsxs("div", { className: " w-[100vw] h-full flex p-[2vw]", children: [_jsx("div", { className: " flex flex-wrap justify-between items-center w-4/6", children: loadingProductsID ? (_jsx(Loading, {})) : productsID.length !== 0 ? uniqueProductsID.map((id, index) => (_jsx(CardCart, { id: id }, index))) : _jsx(EmptyCart, {}) }), _jsxs("div", { className: " w-2/6 h-[20vw] bg-white justify-evenly flex flex-col items-center rounded-4xl", children: [_jsxs("span", { "data-testid": "cost", children: ["\u0421\u0443\u043C\u043C\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u043E\u0438\u043C\u043E\u0441\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u0430: ", totalSum.toLocaleString('ru-RU'), " \u20BD"] }), _jsxs("span", { className: " flex items-center w-[40%] justify-between", children: ["\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0442\u043E\u0432\u0430\u0440\u043E\u0432: ", _jsx("u", { className: " text-2xl", children: productsID.length })] }), _jsx("button", { "data-testid": "createOrder", onClick: () => productsID.length && dispatch(createOrder(orderInfo)), className: `  w-[65%] h-[20%] rounded-4xl  text-2xl ${productsID.length ? "cursor-pointer bg-amber-100" : "cursor-not-allowed bg-gray-200"}`, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0417\u0430\u043A\u0430\u0437" })] })] })] }));
};
