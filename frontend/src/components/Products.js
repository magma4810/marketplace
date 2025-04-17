import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../store/products.slice";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { getCart, updateProductsID } from "../store/user.slice";
import { ProductModal } from "./ProductModal";
import { AddToCart } from "./AddToCart";
import { SortBy } from "./SortBy";
import { motion, AnimatePresence } from 'framer-motion';
export const Products = () => {
    const dispatch = useAppDispatch();
    const [sortBy, setSortBy] = useState('price');
    const [sortDirection, setSortDirection] = useState('asc');
    const [input, setInput] = useState("");
    const loading = useSelector((store) => store.products.loading);
    const products = useSelector((store) => store.products.products);
    const productsID = useSelector((store) => store.user.productsID);
    const username = useSelector((store) => store.user.username);
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
    }, []);
    useEffect(() => {
        if (!loading && isAuthenticated && productsID.length !== 0) {
            dispatch(updateProductsID({ username: username, productsID: productsID }));
        }
    }, [productsID]);
    const sortedProducts = useMemo(() => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return (a.price - b.price) * modifier;
                case 'ABC':
                    const firstLetterA = a.title[0]?.charAt(0) || '';
                    const firstLetterB = b.title[0]?.charAt(0) || '';
                    return firstLetterA.localeCompare(firstLetterB) * modifier;
                default:
                    return 0;
            }
        });
    }, [products, sortBy, sortDirection]);
    return (_jsxs(_Fragment, { children: [_jsx(Header, {}), _jsx("div", { className: " flex flex-wrap justify-between w-[100vw] h-full items-center p-[2vw]", children: loading ? (_jsx(Loading, {})) :
                    _jsxs(_Fragment, { children: [_jsxs("div", { className: "flex gap-4 mb-6 justify-center items-center h-[50%] w-full", children: [_jsx("input", { placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0442\u043E\u0432\u0430\u0440\u0430", type: "text", className: " border-blue-600 border-1 w-[40%] px-4 py-2 bg-white rounded-lg", value: input, onChange: (e) => setInput(e.target.value) }), _jsx(SortBy, { active: sortBy === 'ABC', direction: sortBy === 'ABC' ? sortDirection : undefined, onClick: () => {
                                            if (sortBy === 'ABC') {
                                                setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                            }
                                            else {
                                                setSortBy('ABC');
                                                setSortDirection('asc');
                                            }
                                        }, children: "Sort by ABC" }), _jsx(SortBy, { active: sortBy === 'price', direction: sortBy === 'price' ? sortDirection : undefined, onClick: () => {
                                            if (sortBy === 'price') {
                                                setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                            }
                                            else {
                                                setSortBy('price');
                                                setSortDirection('asc');
                                            }
                                        }, children: "Sort by Price" })] }), _jsx(AnimatePresence, { children: sortedProducts.filter(product => product.title.toLowerCase().includes(input.toLowerCase())).length > 0 ? (sortedProducts.map((product) => (product.title.toLowerCase().includes(input.toLowerCase()) &&
                                    _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, transition: { duration: 0.3 }, children: _jsx(Card, { data: product }) }, product.id)))) : (_jsxs("div", { className: "text-center py-12 w-full", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83D\uDD75\uFE0F\u200D\u2642\uFE0F" }), _jsx("h3", { className: "text-xl font-medium mb-2", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E" }), _jsx("p", { className: "text-gray-500 mb-4", children: "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u043F\u043E\u0438\u0441\u043A\u0430" })] })) })] }) })] }));
};
const Card = ({ data }) => {
    const [open, setOpen] = useState(false);
    const productsID = useSelector((store) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === data.id).length;
    return (_jsxs("div", { className: "bg-white w-[25vw] h-[30vw] rounded-4xl m-2.5  p-3.5", children: [_jsxs("div", { onClick: () => setOpen(true), className: " flex flex-col justify-between items-center h-4/5", children: [_jsx("div", { className: "w-45 h-45 flex items-center justify-center rounded-lg", children: _jsx("img", { className: "max-w-full max-h-full object-contain", src: data.photo, alt: data.title }) }), _jsx("span", { className: "font-medium", children: data.title }), _jsx("div", { className: "w-full px-4 text-center", children: data.description }), _jsxs("div", { className: "flex justify-evenly w-full", children: [_jsxs("span", { children: ["\u0426\u0435\u043D\u0430: ", data.price, "\u20BD"] }), _jsxs("span", { children: ["\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438: ", data.count - count] })] })] }), _jsx("div", { className: " h-1/5 flex justify-center items-center", children: _jsx(AddToCart, { data: data }) }), _jsx(ProductModal, { product: data, isOpen: open, onClose: () => setOpen(false) })] }));
};
