import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AddToCart } from './AddToCart';
export const ProductModal = ({ product, isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    return (_jsx(AnimatePresence, { children: _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70", onClick: onClose, "data-testid": "modal-overlay", children: _jsx(motion.div, { initial: { y: 50, opacity: 0 }, animate: { y: 0, opacity: 1 }, exit: { y: 50, opacity: 0 }, transition: { type: 'spring', damping: 25 }, className: "relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden h-[50vh]", onClick: (e) => e.stopPropagation(), "data-testid": "modal-content", children: _jsxs("div", { className: "h-full flex flex-col overflow-hidden", children: [_jsx("button", { onClick: onClose, className: "absolute top-4 right-4 z-10 p-2 rounded-full bg-white bg-opacity-80 hover:bg-gray-100 transition-colors", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6 text-gray-600", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }), _jsxs("div", { className: "flex flex-col md:flex-row h-full", children: [_jsx("div", { className: "md:w-1/2 p-6", children: _jsx("div", { className: "relative h-64 md:h-80 rounded-lg overflow-hidden mb-4 ", children: _jsx("img", { src: product.photo, alt: product.title, className: "w-full h-full object-contain object-center" }) }) }), _jsxs("div", { className: "md:w-1/2 p-6 md:border-l border-gray-200", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 mb-2", "data-testid": "title", children: product.title }), _jsx("div", { className: "flex items-center mb-4", children: _jsxs("span", { className: "text-3xl font-bold text-gray-900 mr-4", children: [product.price, "\u20BD"] }) }), _jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Description" }), _jsx("p", { className: "text-gray-700", children: product.description })] }), _jsxs("div", { className: "mt-auto pt-4 border-t border-gray-200", children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Vendor" }), _jsx("div", { className: "flex items-center", children: _jsx("div", { children: _jsx("p", { className: "font-medium", children: product.vendorInfo }) }) })] }), _jsx("div", { className: " h-[10vh] flex justify-center items-center", children: _jsx(AddToCart, { data: product }) })] })] })] }) }) }) }));
};
