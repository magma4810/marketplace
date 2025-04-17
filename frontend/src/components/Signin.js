import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'react-feather';
import { changeIsAuthenticated, changeUsername } from "../store/user.slice";
import { useAppDispatch } from "../store";
export const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const userInfo = await fetch(`http://localhost:3000/api/getUserInfoByName/${username}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!userInfo.ok) {
                const errorData = await userInfo.json().catch(() => ({}));
                throw new Error(errorData.message || 'Ошибка при проверке пароля');
            }
            const data = await userInfo.json();
            if (data.password !== password) {
                throw new Error('Неверный пароль или логин');
            }
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok)
                throw new Error('Ошибка авторизации');
            sessionStorage.setItem('address', data.address);
            navigate('/');
        }
        catch (err) {
            console.error('Authentication error:', err);
            const message = err instanceof Error ? err.message : 'Authentication failed';
            setError(message);
        }
        finally {
            dispatch(changeUsername(username));
            dispatch(changeIsAuthenticated(true));
            sessionStorage.setItem('isAuthenticated', "true");
            sessionStorage.setItem('username', username);
            setIsLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "w-full max-w-md", children: _jsxs("div", { className: "bg-white rounded-2xl shadow-xl overflow-hidden", children: [_jsxs("div", { className: "bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-center", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C" }), _jsx("p", { className: "text-indigo-100 mt-2", children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0432\u043E\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0432\u0445\u043E\u0434\u0430" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-8 space-y-6", children: [error && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded", children: _jsx("p", { children: error }) })), _jsx("div", { className: "space-y-4", children: _jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u0418\u043C\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) }) }), _jsx("input", { id: "username", name: "username", type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200", placeholder: "\u0412\u0430\u0448 \u043B\u043E\u0433\u0438\u043D" })] })] }) }), _jsxs("div", { children: [_jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "\u041F\u0430\u0440\u043E\u043B\u044C" }), _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: _jsx("svg", { className: "h-5 w-5 text-gray-400", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z", clipRule: "evenodd" }) }) }), _jsx("input", { id: "password", name: "password", type: showPassword ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" }), _jsx("button", { type: "button", onClick: togglePasswordVisibility, className: "absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600", "aria-label": showPassword ? "Скрыть пароль" : "Показать пароль", children: showPassword ? (_jsx(EyeOff, { className: "h-5 w-5" })) : (_jsx(Eye, { className: "h-5 w-5" })) })] })] }), _jsx("div", { children: _jsx(motion.button, { type: "submit", whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, disabled: isLoading, className: `w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`, children: isLoading ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [_jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }), _jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })] }), "\u0412\u0445\u043E\u0434..."] })) : ('Войти в систему') }) })] }), _jsx("div", { className: "px-8 pb-6 text-center", children: _jsxs("p", { className: "mt-2 text-sm text-gray-600", children: ["\u0415\u0449\u0451 \u043D\u0435\u0442 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430?", ' ', _jsx("a", { href: "/signup", className: "font-medium text-indigo-600 hover:text-indigo-500", children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C" })] }) })] }) }) }));
};
