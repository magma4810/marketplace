import { FC, useEffect } from "react";
import { getProducts } from "../store/products.slice";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { CardProps } from "../../types";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { Counter } from "./Counter";
import { addProductsID, updateProductsID } from "../store/user.slice";
import { getCart } from "../store/user.slice";

export const Products: FC = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector((store: StoreApp) => store.products.loading);
    const products = useSelector((store: StoreApp) => store.products.products);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const username = useSelector((store: StoreApp) => store.user.username);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
    }, [])
    useEffect(() => {
        if(!loading){
            dispatch(updateProductsID({username:username,productsID:productsID}));
        }
    }, [productsID])
    return (
        <>
            <Header/>
            <div className=" flex flex-wrap justify-between w-[100vw] h-full items-center p-[2vw]">
                {loading ? (
                    <Loading/>
                ) : products.map((product) => (
                    <Card data={product} key={product.id} />
                ))}
            </div>
        </>
    )
}

const Card: FC<CardProps> = ({ data }) => {
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === data.id).length;
    
    const dispatch = useAppDispatch();
    return (
        <div className="bg-white w-[25vw] h-[30vw] rounded-4xl m-2.5 flex flex-col justify-between items-center p-3.5">
            <div className="w-45 h-45 flex items-center justify-center rounded-lg">
                <img className="max-w-full max-h-full object-contain" src={data.photo} alt={data.title} />
            </div>
            <span className="font-medium">{data.title}</span>
            
            <div className="w-full px-4 text-center">
                {data.description}
            </div>
            
            <div className="flex justify-evenly w-full">
                <span>Цена: {data.price}₽</span>
                <span>В наличии: {data.count-count}</span>
            </div>
            {count > 0 ? <Counter id={data.id}/> : 
                <button onClick={() => dispatch(addProductsID(data.id))} className="cursor-pointer bg-amber-100/50 rounded-4xl w-[70%] h-[10%] hover:bg-amber-200/50 transition-colors">
                    Добавить в корзину
                </button>
            }
            
        </div>
    )
}