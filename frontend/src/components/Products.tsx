import { FC, useEffect, useMemo, useState } from "react";
import { getProducts } from "../store/products.slice";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { CardProps } from "../../types";
import { Header } from "./Header";
import { Loading } from "./Loading";
import { getCart, updateProductsID } from "../store/user.slice";
import { ProductModal } from "./ProductModal";
import { AddToCart } from "./AddToCart";
import { SortBy } from "./SortBy";
import { motion, AnimatePresence } from 'framer-motion';

export const Products: FC = () => {
    const dispatch = useAppDispatch();
    const [sortBy, setSortBy] = useState<'ABC' | 'price'>('price');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [input, setInput] = useState("");
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
    const sortedProducts = useMemo(() => {
        const modifier = sortDirection === 'asc' ? 1 : -1;
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'price':
                    return (a.price - b.price) * modifier;
                case 'ABC':
                    const firstLetterA = a.title[0]?.charAt(0) || '';
                    const firstLetterB = b.title[0]?.charAt(0) || '';
                    return firstLetterA.localeCompare(firstLetterB) * modifier;
                default:
                    return 0;
            }
        });
    }, [products, sortBy, sortDirection]);
    return (
        <>
            <Header />
            <div className=" flex flex-wrap justify-between w-[100vw] h-full items-center p-[2vw]">
                {loading ? (
                    <Loading />
                ) :
                    <>
                        <div className="flex gap-4 mb-6 justify-center items-center h-[50%] w-full">
                            <input placeholder="Начните вводить название товара" type="text" className=" border-blue-600 border-1 w-[40%] px-4 py-2 bg-white rounded-lg" value={input} onChange={(e) => setInput(e.target.value)} />
                            <SortBy
                                active={sortBy === 'ABC'}
                                direction={sortBy === 'ABC' ? sortDirection : undefined}
                                onClick={() => {
                                    if (sortBy === 'ABC') {
                                        setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
                                    } else {
                                        setSortBy('ABC');
                                        setSortDirection('asc');
                                    }
                                }}
                            >
                                Sort by ABC
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
                        <AnimatePresence>
                            {sortedProducts.filter(product =>
                                product.title.toLowerCase().includes(input.toLowerCase())
                            ).length > 0 ? (
                                sortedProducts.map((product) => (
                                    product.title.toLowerCase().includes(input.toLowerCase()) &&
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card data={product} />
                                    </motion.div>
                                ))
                            ) : (

                                    <div className="text-center py-12 w-full">
                                        <div className="text-6xl mb-4">🕵️‍♂️</div>
                                        <h3 className="text-xl font-medium mb-2">Ничего не найдено</h3>
                                        <p className="text-gray-500 mb-4">Попробуйте изменить параметры поиска</p>
                                    </div>
                            )}
                        </AnimatePresence>
                    </>
                }
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

