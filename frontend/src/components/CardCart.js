import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Counter } from "./Counter";
export const CardCart = ({ id }) => {
    const products = useSelector((store) => store.products.products);
    const product = products.find(p => p.id === id);
    const productsID = useSelector((store) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === id).length;
    return (_jsx(_Fragment, { children: product ? (_jsxs("div", { className: "bg-white w-[70vw] h-[15vw] rounded-4xl m-2.5 flex justify-between items-center p-3.5", children: [_jsx("div", { className: "w-1/5", children: _jsx("div", { className: "w-40 h-40 flex items-center justify-center rounded-lg", children: _jsx("img", { className: "max-w-full max-h-full object-contain", src: product.photo, alt: product.title }) }) }), _jsxs("div", { className: "w-4/5 h-full flex justify-between", children: [_jsxs("div", { className: "flex flex-col justify-evenly w-1/2", children: [_jsx("span", { className: "font-medium", children: product.title }), _jsx("span", { className: "line-clamp-1 text-gray-600", "data-testid": "description", children: product.description })] }), _jsxs("div", { className: "flex flex-col items-center justify-evenly w-1/2", children: [_jsxs("span", { className: "font-bold", children: [product.price * count, " \u20BD"] }), _jsx(Counter, { id: id }), _jsxs("span", { className: "text-sm text-gray-500", "data-testid": "counterAvailability", children: ["\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438: ", product.count - count] })] })] })] })) : (_jsx("span", { className: "text-red-500", children: "\u0422\u043E\u0432\u0430\u0440 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D" })) }));
};
