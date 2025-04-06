import { FC, useEffect } from "react";
import { getProducts } from "../store/products.slice";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { CardProps } from "../../types";
import { Header } from "./Header";
import { Loading } from "./Loading";

export const Products: FC = () => {
    const dispatch = useAppDispatch();
    const loading = useSelector((store: StoreApp) => store.products.loading);
    const products = useSelector((store: StoreApp) => store.products.products);
    useEffect(() => {
        dispatch(getProducts())
    }, [])
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
                <span>В наличии: {data.count}</span>
            </div>
            <div className="flex items-center text-2xl">
                                <button 
                                    className={`px-4 py-2 rounded-lg ${count > 0 
                                        ? "bg-gray-200 hover:bg-gray-300 cursor-pointer" 
                                        : "bg-gray-100 cursor-not-allowed"}`}
                                    onClick={decrement}
                                    disabled={count <= 0}
                                >
                                    -
                                </button>
                                
                                <span className="px-6 py-2">{count}</span>
                                
                                <button 
                                    className={`px-4 py-2 rounded-lg ${count < product.count 
                                        ? "bg-gray-200 hover:bg-gray-300 cursor-pointer" 
                                        : "bg-gray-100 cursor-not-allowed"}`}
                                    onClick={increment}
                                    disabled={count >= product.count}
                                >
                                    +
                                </button>
                            </div>
        </div>
    )
}