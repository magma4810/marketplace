import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Eye, EyeOff, User, MapPin } from 'react-feather';
import { motion } from 'framer-motion';
export const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        repeatPassword: '',
        deliveryAdress: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const validate = () => {
        const newErrors = {};
        if (!formData.username)
            newErrors.username = 'Введите имя пользователя';
        if (formData.username.length < 4)
            newErrors.username = 'Минимум 4 символа';
        if (!formData.password)
            newErrors.password = 'Введите пароль';
        if (formData.password.length < 6)
            newErrors.password = 'Минимум 6 символов';
        if (formData.password !== formData.repeatPassword) {
            newErrors.repeatPassword = 'Пароли не совпадают';
        }
        if (!formData.deliveryAdress)
            newErrors.deliveryAdress = 'Введите адрес доставки';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate())
            return;
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password,
                    deliveryAdress: formData.deliveryAdress
                }),
            });
            if (!response.ok)
                throw new Error('Ошибка регистрации');
            window.location.href = '/signin';
        }
        catch (err) {
            console.error('Registration error:', err);
            const message = err instanceof Error ? err.message : 'Registration failed';
            setErrors({ form: message });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "\u0421\u043E\u0437\u0434\u0430\u0439\u0442\u0435 \u0430\u043A\u043A\u0430\u0443\u043D\u0442" }), _jsx("p", { className: "text-indigo-100 mt-2", children: "\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443 \u0434\u043B\u044F \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-4", children: [errors.form && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded", children: _jsx("p", { children: errors.form }) })), _jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(User, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "username", name: "username", type: "text", value: formData.username, onChange: handleChange, className: `block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`, placeholder: "\u041F\u0440\u0438\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u043B\u043E\u0433\u0438\u043D" })] }), errors.username && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.username })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }), _jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", value: formData.password, onChange: handleChange, className: `block w-full pl-10 pr-10 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600", children: showPassword ? _jsx(EyeOff, { className: "h-5 w-5" }) : _jsx(Eye, { className: "h-5 w-5" }) })] }), errors.password && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.password })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "repeatPassword", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u0430\u0440\u043E\u043B\u044C" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }), _jsx("input", { id: "repeatPassword", name: "repeatPassword", type: showPassword ? "text" : "password", value: formData.repeatPassword, onChange: handleChange, className: `block w-full pl-10 pr-10 py-3 border ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`, placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600", children: showPassword ? _jsx(EyeOff, { className: "h-5 w-5" }) : _jsx(Eye, { className: "h-5 w-5" }) })] }), errors.repeatPassword && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.repeatPassword })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "deliveryAdress", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0410\u0434\u0440\u0435\u0441 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx(MapPin, { className: "h-5 w-5 text-gray-400" }) }), _jsx("input", { id: "deliveryAdress", name: "deliveryAdress", type: "text", value: formData.deliveryAdress, onChange: handleChange, className: `block w-full pl-10 pr-3 py-3 border ${errors.deliveryAdress ? 'border-red-500' : 'border-gray-300'} rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`, placeholder: "\u041A\u0443\u0434\u0430 \u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437\u044B?" })] }), errors.deliveryAdress && _jsx("p", { className: "mt-1 text-sm text-red-600", children: errors.deliveryAdress })] }), _jsx("div", { className: "pt-2", children: _jsx(motion.button, { type: "submit", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, disabled: isLoading, className: `w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`, children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F..."] })) : ('Зарегистрироваться') }) })] }), _jsx("div", { className: "px-8 pb-6 text-center", children: _jsxs("p", { className: "text-sm text-gray-600", children: ["\u0423\u0436\u0435 \u0435\u0441\u0442\u044C \u0430\u043A\u043A\u0430\u0443\u043D\u0442?", ' ', _jsx("a", { href: "/signin", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435" })] }) })] }) }) }));
};
