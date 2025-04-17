import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Counter } from "./Counter";
import { addProductsID } from "../store/user.slice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store";
import { useSelector } from "react-redux";
export const AddToCart = ({ data }) => {
    const isAuthenticated = useSelector((store) => store.user.isAuthenticated);
    const productsID = useSelector((store) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === data.id).length;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (_jsx(_Fragment, { children: isAuthenticated && count > 0 ? _jsx(Counter, { id: data.id }) :
            _jsx("button", { onClick: () => isAuthenticated ? dispatch(addProductsID(data.id)) : navigate("/signin"), className: "cursor-pointer bg-amber-100/50 rounded-4xl w-[70%] h-[50%] hover:bg-amber-200/50 transition-colors", children: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443" }) }));
};
