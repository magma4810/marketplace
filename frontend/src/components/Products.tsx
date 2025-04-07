import { FC, useEffect, useState } from "react";
import { changeLoading, getProducts } from "../store/products.slice";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { CardProps } from "../../types";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { getCart, updateProductsID } from "../store/user.slice";
import { ProductModal } from "./ProductModal";
import { AddToCart } from "./AddToCart";

export const Products: FC = () => {//qwerty123
    const dispatch = useAppDispatch();
    const loading = useSelector((store: StoreApp) => store.products.loading);
    const products = useSelector((store: StoreApp) => store.products.products);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const username = useSelector((store: StoreApp) => store.user.username);
    const isAuthenticated = useSelector((store: StoreApp) => store.user.isAuthenticated);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
    }, [])
    useEffect(() => {
        if (!loading && isAuthenticated && productsID.length !== 0) {
            dispatch(updateProductsID({ username: username, productsID: productsID }));
        }
    }, [productsID])
    return (
        <>
            <Header />
            <div className=" flex flex-wrap justify-between w-[100vw] h-full items-center p-[2vw]">
                {loading ? (
                    <Loading />
                ) : products.map((product) => (
                    <Card data={product} key={product.id} />
                ))}
            </div>
        </>
    )
}

const Card: FC<CardProps> = ({ data }) => {
    const [open, setOpen] = useState(false);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === data.id).length;
    return (

        <div className="bg-white w-[25vw] h-[30vw] rounded-4xl m-2.5  p-3.5">
            <div onClick={() => setOpen(true)} className=" flex flex-col justify-between items-center h-4/5">

                <ProductModal
                    product={data}
                    isOpen={open}
                    onClose={() => setOpen(false)}
                />
                <div className="w-45 h-45 flex items-center justify-center rounded-lg">
                    <img className="max-w-full max-h-full object-contain" src={data.photo} alt={data.title} />
                </div>
                <span className="font-medium">{data.title}</span>

                <div className="w-full px-4 text-center">
                    {data.description}
                </div>

                <div className="flex justify-evenly w-full">
                    <span>Цена: {data.price}₽</span>
                    <span>В наличии: {data.count - count}</span>
                </div>
            </div>
            <div className=" h-1/5 flex justify-center items-center">
                <AddToCart data={data} />
            </div>
        </div>
    )
}

