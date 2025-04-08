import { FC, useEffect, useMemo, useState } from "react";
import { StoreApp, useAppDispatch } from "../store";
import { getOrders } from "../store/user.slice";
import { useSelector } from "react-redux";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { CardOrderProps } from "../../types";
import { changeLoading, getOrderByID } from "../store/orders.slice";
import { getProducts } from "../store/products.slice";
import { EmptyOrders } from "./EmptyOrders";
import { SortBy } from "./SortBy";

export const MyOrders: FC = () => {
    const dispatch = useAppDispatch();
    const username = useSelector((store: StoreApp) => store.user.username);
    const ordersID = useSelector((store: StoreApp) => store.user.ordersID);
    const orders = useSelector((store: StoreApp) => store.orders.orders);
    const loadingOrdersID = useSelector((store: StoreApp) => store.user.loading);
    const loadingOrders = useSelector((store: StoreApp) => store.orders.loading);
    const isLoading = loadingOrdersID || loadingOrders;
    const [sortBy, setSortBy] = useState<'id' | 'price'>('price');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    useEffect(() => {
        dispatch(getOrders(username));
        dispatch(getProducts());
    }, []);

    useEffect(() => {
        if (!loadingOrdersID) {
            if (ordersID.length !== 0) {
                ordersID.map((id: number) => dispatch(getOrderByID(id)))
            } else {
                dispatch(changeLoading(false));
            }
        }
    }, [dispatch, username, ordersID.length, loadingOrdersID]);
    const sortedOrders = useMemo(() => {
        return [...orders].sort((a, b) => {
            if (sortBy === 'id') {
                return sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
            } else {
                return sortDirection === 'asc'
                    ? a.cost - b.cost
                    : b.cost - a.cost;
            }
        });
    }, [orders, sortBy, sortDirection]);
    return (
        <>
            <Header />
            <div className=" flex flex-col justify-between w-[100vw] h-[100%] p-[3vw]">
                {isLoading ? (
                    <Loading />
                ) : sortedOrders.length !== 0 ? (
                    <>
                        <div className="flex gap-4 mb-6 justify-center items-center h-[50%]">
                            <SortBy
                                active={sortBy === 'id'}
                                direction={sortBy === 'id' ? sortDirection : undefined}
                                onClick={() => {
                                    if (sortBy === 'id') {
                                        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                    } else {
                                        setSortBy('id');
                                        setSortDirection('asc');
                                    }
                                }}
                            >
                                Sort by Date
                            </SortBy>

                            <SortBy
                                active={sortBy === 'price'}
                                direction={sortBy === 'price' ? sortDirection : undefined}
                                onClick={() => {
                                    if (sortBy === 'price') {
                                        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                    } else {
                                        setSortBy('price');
                                        setSortDirection('asc');
                                    }
                                }}
                            >
                                Sort by Price
                            </SortBy>

                        </div>
                    {sortedOrders.map((order,index) => (
                        <CardOrder data={order} key={index} />
                        ))}
                    </>
                ) : (
                    <EmptyOrders />
                )}
            </div>
        </>
    );

}

const CardOrder: FC<CardOrderProps> = ({ data }) => {
    const products = useSelector((store: StoreApp) => store.products.products);
    const productIds = Array.isArray(data.productsID)
        ? data.productsID
        : [data.productsID];
    return (
        <div className="bg-white w-full rounded-4xl m-3.5 flex flex-col justify-around items-center p-6">
            <div className="flex justify-between w-full mb-4">
                <span className="font-medium">Order ID: {data.id}</span>
                <span className={`px-2 py-1 rounded text-sm ${data.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                    {data.active ? 'Активен' : 'Завершен'}
                </span>
            </div>

            <div className="flex w-full mb-4 justify-center">
                <div className="flex flex-col w-2/7">
                    <div className="mb-2">
                        <span className="text-gray-600">Delivery address:</span>
                        <span className="ml-2">{data.deliveryAdress}</span>
                    </div>
                    <div>
                        <span className="text-gray-600">Delivery Date:</span>
                        <span className="ml-2">{data.deliveryDate}</span>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-2 w-1/2">
                    {productIds.map((id: number, index) => {
                        const product = products.find(p => p.id === id);
                        return product ? (
                            <div key={index} className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-1">
                                <img
                                    src={product.photo}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ) : null;
                    })}
                </div>
            </div>

            <div className="flex justify-between w-full pt-4 border-t border-gray-100">
                <span className="text-gray-600">Order Date: {data.orderDate}</span>
                <span className="font-medium">{data.cost.toLocaleString('ru-RU')} ₽</span>
            </div>
        </div>
    );
};