import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "../store";
import { getOrders } from "../store/user.slice";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { changeLoading, getOrderByID } from "../store/orders.slice";
import { getProducts } from "../store/products.slice";
import { EmptyOrders } from "./EmptyOrders";
import { SortBy } from "./SortBy";
export const MyOrders = () => {
    const dispatch = useAppDispatch();
    const username = useSelector((store) => store.user.username);
    const ordersID = useSelector((store) => store.user.ordersID);
    const orders = useSelector((store) => store.orders.orders);
    const loadingOrdersID = useSelector((store) => store.user.loading);
    const loadingOrders = useSelector((store) => store.orders.loading);
    const isLoading = loadingOrdersID || loadingOrders;
    const [sortBy, setSortBy] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');
    useEffect(() => {
        dispatch(getOrders(username));
        dispatch(getProducts());
    }, []);
    useEffect(() => {
        if (!loadingOrdersID) {
            if (ordersID.length !== 0) {
                ordersID.map((id) => dispatch(getOrderByID(id)));
            }
            else {
                dispatch(changeLoading(false));
            }
        }
    }, [dispatch, username, ordersID.length, loadingOrdersID]);
    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => {
            if (sortBy === 'id') {
                return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
            }
            else {
                return sortDirection === 'asc'
                    ? a.cost - b.cost
                    : b.cost - a.cost;
            }
        });
    }, [orders, sortBy, sortDirection]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: " flex flex-col justify-between w-[100vw] h-[100%] p-[3vw]", children: isLoading ? (_jsx(Loading, {})) : sortedOrders.length !== 0 ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex gap-4 mb-6 justify-center items-center h-[50%]", children: [_jsx(SortBy, { active: sortBy === 'id', direction: sortBy === 'id' ? sortDirection : undefined, onClick: () => {
                                        if (sortBy === 'id') {
                                            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                        }
                                        else {
                                            setSortBy('id');
                                            setSortDirection('asc');
                                        }
                                    }, children: "Sort by Date" }), _jsx(SortBy, { active: sortBy === 'price', direction: sortBy === 'price' ? sortDirection : undefined, onClick: () => {
                                        if (sortBy === 'price') {
                                            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                        }
                                        else {
                                            setSortBy('price');
                                            setSortDirection('asc');
                                        }
                                    }, children: "Sort by Price" })] }), sortedOrders.map((order, index) => (_jsx(CardOrder, { data: order }, index)))] })) : (_jsx(EmptyOrders, {})) })] }));
};
const CardOrder = ({ data }) => {
    const products = useSelector((store) => store.products.products);
    const productIds = Array.isArray(data.productsID)
        ? data.productsID
        : [data.productsID];
    return (_jsxs("div", { className: "bg-white w-full rounded-4xl m-3.5 flex flex-col justify-around items-center p-6", children: [_jsxs("div", { className: "flex justify-between w-full mb-4", children: [_jsxs("span", { className: "font-medium", children: ["Order ID: ", data.id] }), _jsx("span", { className: `px-2 py-1 rounded text-sm ${data.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`, children: data.active ? 'Активен' : 'Завершен' })] }), _jsxs("div", { className: "flex w-full mb-4 justify-center", children: [_jsxs("div", { className: "flex flex-col w-2/7", children: [_jsxs("div", { className: "mb-2", children: [_jsx("span", { className: "text-gray-600", children: "Delivery address:" }), _jsx("span", { className: "ml-2", children: data.deliveryAdress })] }), _jsxs("div", { children: [_jsx("span", { className: "text-gray-600", children: "Delivery Date:" }), _jsx("span", { className: "ml-2", children: data.deliveryDate })] })] }), _jsx("div", { className: "flex flex-wrap justify-center gap-2 w-1/2", children: productIds.map((id, index) => {
                            const product = products.find(p => p.id === id);
                            return product ? (_jsx("div", { className: "w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-1", children: _jsx("img", { src: product.photo, alt: product.title, className: "max-w-full max-h-full object-contain" }) }, index)) : null;
                        }) })] }), _jsxs("div", { className: "flex justify-between w-full pt-4 border-t border-gray-100", children: [_jsxs("span", { className: "text-gray-600", children: ["Order Date: ", data.orderDate] }), _jsxs("span", { className: "font-medium", children: [data.cost.toLocaleString('ru-RU'), " \u20BD"] })] })] }));
};
