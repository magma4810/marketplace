import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAppDispatch } from "../store";
import muscle from "../assets/muscle.png";
import my_orders from "../assets/my_orders.png";
import cart from "../assets/cart.png";
import logout from "../assets/logout.png";
import { logoutFetch } from "../store/user.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Header = () => {
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    return (_jsxs("div", { className: "flex bg-gradient-to-r from-indigo-200 to-purple-200 w-[100vw] h-[12vh] items-center justify-around", children: [_jsxs("div", { className: "flex items-center justify-center", children: [_jsx(Icon, { href: "/", src: muscle }), _jsx("a", { href: "/", children: _jsx("span", { className: "text-3xl", children: "SportFuelMarket" }) })] }), isAuthenticated &&
                _jsxs("div", { className: "flex justify-between w-[20%]", children: [_jsx(Icon, { href: "/my-orders", src: my_orders }), _jsx(Icon, { href: "/cart", src: cart }), _jsx(Icon, { href: "/signin", src: logout, data_testid: "logout" })] })] }));
};
const Icon = ({ href, src, data_testid }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const onClick = (e) => {
        if (href === "/signin") {
            e.preventDefault();
            dispatch(logoutFetch());
            navigate("/signin");
        }
    };
    return (_jsx("a", { href: href, onClick: (e) => onClick(e), className: "block w-[3vw] h-auto", "data-testid": data_testid, children: _jsx("img", { src: src, alt: "" }) }));
};
