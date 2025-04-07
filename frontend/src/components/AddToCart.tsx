import { FC } from "react"
import { Counter } from "./Counter";
import { addProductsID } from "../store/user.slice";
import { useNavigate } from "react-router-dom";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Products } from "../../types";

export const AddToCart: FC<{data: Products}> = ({data}) => {
    const isAuthenticated = useSelector((store: StoreApp) => store.user.isAuthenticated);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === data.id).length;
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <>
            { count > 0 ? <Counter id={data.id} /> :
                <button onClick={() => isAuthenticated ? dispatch(addProductsID(data.id)) : navigate("/signin")} className="cursor-pointer bg-amber-100/50 rounded-4xl w-[70%] h-[50%] hover:bg-amber-200/50 transition-colors">
                    Добавить в корзину
                </button>
                    }
        </>
    )
}