import { FC, useEffect,useState,useMemo } from "react";
import { Header } from "./Header";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import { getProducts } from "../store/products.slice";
import { getCart, getOrders, updateProductsID } from "../store/user.slice";
import { Counter } from "./Counter";
import { createOrder } from "../store/orders.slice";


export const Cart: FC = () => {
    const loadingProducts = useSelector((store: StoreApp) => store.products.loading);
    const loadingProductsID = useSelector((store: StoreApp) => store.products.loading);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const ordersID = useSelector((store: StoreApp) => store.user.ordersID);
    const products = useSelector((store: StoreApp) => store.products.products);
    const username = useSelector((store: StoreApp) => store.user.username);
    const uniqueProductsID = [...new Set(productsID)];
    const dispatch = useAppDispatch();
    const totalSum = useMemo(() => {
        return productsID.reduce((sum, id) => {
          const product = products.find(p => p.id === id);
          return sum + (product?.price || 0);
        }, 0);
      }, [productsID, products]);
    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCart(username));
        dispatch(getOrders(username));
    }, []);
    useEffect(() => {
        if(!loadingProductsID){
            dispatch(updateProductsID({username:username,productsID:productsID}));
        }
    }, [productsID]);
    const orderInfo = {
        productsID: productsID,
        deliveryAdress: 'Belloruskya 69',
        cost: totalSum,
        username: username
    }
    console.log(ordersID)
    return (
        <>
            <Header />
            <div className=" w-[100vw] h-full flex p-[2vw]">
                    <div className=" flex flex-wrap justify-between items-center w-4/6">
                        {loadingProducts && loadingProductsID ? (
                            <Loading />
                        ) : productsID.length !== 0 ? uniqueProductsID.map((id: number, index) => (
                            <Card id={id} key={index} />
                        )) : <EmptyCart/>}
                    </div>
                <div className=" w-2/6 h-[20vw] bg-white justify-evenly flex flex-col items-center rounded-4xl">
                    <span>Суммарная стоимость заказа: {totalSum.toLocaleString('ru-RU')} ₽</span>
                    <span className=" flex items-center w-[40%] justify-between">Количество товаров: <u className=" text-2xl">{productsID.length}</u></span>
                    <button onClick={() => productsID.length && dispatch(createOrder(orderInfo))} className={`  w-[65%] h-[20%] rounded-4xl  text-2xl ${productsID.length ? "cursor-pointer bg-amber-100" : "cursor-not-allowed bg-gray-200"}`}>Создать Заказ</button>
                </div>
            </div>
        </>
    )
}

const EmptyCart: FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] w-full">
          <div className="relative w-64 h-64 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                className="w-48 h-48 text-gray-300 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-full opacity-30"></div>
            </div>
          </div>
  
          <h2 className="text-3xl font-bold text-gray-700 mb-4">Ваша корзина пуста</h2>
          <p className="text-lg text-gray-500 mb-8 text-center max-w-md">
            Начните покупки, чтобы заполнить её товарами!
          </p>
  
          <a
            href="/"
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Перейти к покупкам
          </a>
  
          <div className="mt-12 flex space-x-4 opacity-50">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <svg
                  className="w-8 h-8 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      );
}

const Card: FC<{ id: number }> = ({ id }) => {
    const products = useSelector((store: StoreApp) => store.products.products);
    const product = products.find(p => p.id === id);
    const productsID = useSelector((store: StoreApp) => store.user.productsID);
    const count = productsID.filter(itemID => itemID === id).length;

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
                            <Counter id={id}/>
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