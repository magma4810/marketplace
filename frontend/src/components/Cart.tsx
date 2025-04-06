import { FC, useEffect,useState } from "react";
import { Header } from "./Header";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import { getProducts } from "../store/products.slice";
import { getCart } from "../store/user.slice";


export const Cart: FC = () => {
    const loadingProducts = useSelector((store: StoreApp) => store.products.loading);
    const loadingProductsID = useSelector((store: StoreApp) => store.products.loading);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const username = useSelector((store: StoreApp) => store.user.username);
    const uniqueProductsID = [...new Set(productsID)];
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
    }, [])
    return (
        <>
            <Header />
            <div className=" w-[100vw] h-full flex p-[2vw]">
                <div className=" flex flex-wrap justify-between items-center w-4/6">
                    {loadingProducts && loadingProductsID ? (
                        <Loading />
                    ) : uniqueProductsID.map((id: number, index) => (
                        <Card id={id} key={index} />
                    ))}
                </div>
                <div className=" w-2/6 h-[20vw] bg-white justify-evenly flex flex-col items-center rounded-4xl">
                    <span>Суммарная стоимость заказа:</span>
                    <span className=" flex items-center w-[40%] justify-between">Количество товаров: <u className=" text-2xl">{productsID.length}</u></span>
                    <button className=" bg-amber-100 w-[65%] h-[20%] rounded-4xl cursor-pointer text-2xl">Создать Заказ</button>
                </div>
            </div>
        </>
    )
}

const Card: FC<{ id: number }> = ({ id }) => {
    const products = useSelector((store: StoreApp) => store.products.products);
    const product = products.find(p => p.id === id);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const initialCount = productsID.filter(itemID => itemID === id).length;
    const [count, setCount] = useState(initialCount);

    const increment = () => {
        if (count < (product?.count || 0)) {
            setCount(prev => prev + 1);
        }
    };

    const decrement = () => {
        if (count > 0) {
            setCount(prev => prev - 1);
        }
    };

    return (
        <>
            {product ? (
                <div className="bg-white w-[70vw] h-[15vw] rounded-4xl m-2.5 flex justify-between items-center p-3.5">
                    <div className="w-1/5">
                        <div className="w-40 h-40 flex items-center justify-center rounded-lg">
                            <img 
                                className="max-w-full max-h-full object-contain" 
                                src={product.photo} 
                                alt={product.title} 
                            />
                        </div>
                    </div>

                    <div className="w-4/5 h-full flex justify-between">
                        <div className="flex flex-col justify-evenly w-1/2">
                            <span className="font-medium">{product.title}</span>
                            <span className="line-clamp-1 text-gray-600">{product.description}</span>
                        </div>

                        <div className="flex flex-col items-center justify-evenly w-1/2">
                            <span className="font-bold">{product.price*count} ₽</span>
                            
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
                            
                            <span className="text-sm text-gray-500">
                                В наличии: {product.count - count}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <span className="text-red-500">Товар не найден</span>
            )}
        </>
    );
};