import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signin } from './components/Signin';
import { Signup } from './components/Signup';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Products } from './components/Products';
import { MyOrders } from './components/MyOrders';
import { Cart } from './components/Cart';
import { ProductDetail } from './components/ProductDetail';
export const App = () => {
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "signin", element: _jsx(Signin, {}) }), _jsx(Route, { path: "signup", element: _jsx(Signup, {}) }), _jsx(Route, { path: "/", element: _jsx(Products, {}) }), _jsx(Route, { path: "/products/:id", element: _jsxs(_Fragment, { children: [_jsx(Products, {}), _jsx(ProductDetail, {})] }) }), _jsxs(Route, { element: _jsx(ProtectedRoute, {}), children: [_jsx(Route, { path: "/my-orders", element: _jsx(MyOrders, {}) }), _jsx(Route, { path: "/cart", element: _jsx(Cart, {}) })] })] }) }));
};
