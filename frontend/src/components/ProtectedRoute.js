import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { useAuthCheck } from "./hooks/useAuthCheck";
import { Navigate, useLocation, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
    const isAuthChecked = useAuthCheck();
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    const location = useLocation();
    if (!isAuthChecked) {
        return (_jsx("div", { className: "flex items-center justify-center h-[100vh] w-[100vw] text-sky-500 opacity-50 text-8xl", children: "Loading..." }));
    }
    return isAuthenticated ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/signin", state: { from: location }, replace: true });
};
