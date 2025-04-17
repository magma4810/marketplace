import { FC, useEffect, useMemo } from "react";
import { Header } from "./Header";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { Loading } from "./Loading";
import { getProducts } from "../store/products.slice";
import { getCart, getOrders, updateProductsID } from "../store/user.slice";
import { createOrder } from "../store/orders.slice";
import { EmptyCart } from "./EmptyCart";
import { CardCart } from "./CardCart";

export const Cart: FC = () => {
  const loadingProductsID = useSelector(
    (store: StoreApp) => store.products.loading,
  );
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const address = useSelector((store: StoreApp) => store.user.address);
  const products = useSelector((store: StoreApp) => store.products.products);
  const username = useSelector((store: StoreApp) => store.user.username);
  const uniqueProductsID = [...new Set(productsID)];
  const dispatch = useAppDispatch();
  const totalSum = useMemo(() => {
    return productsID.reduce((sum, id) => {
      const product = products.find((p) => p.id === id);
      return sum + (product?.price || 0);
    }, 0);
  }, [productsID, products]);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCart(username));
    dispatch(getOrders(username));
  }, [username, dispatch]);
  useEffect(() => {
    if (!loadingProductsID) {
      dispatch(
        updateProductsID({ username: username, productsID: productsID }),
      );
    }
  }, [productsID, loadingProductsID, username, dispatch]);
  const orderInfo = {
    productsID: productsID,
    deliveryAdress: address,
    cost: totalSum,
    username: username,
  };

  return (
    <>
      <Header />
      <div className=" w-[100vw] h-full flex p-[2vw]">
        <div className=" flex flex-wrap justify-between items-center w-4/6">
          {loadingProductsID ? (
            <Loading />
          ) : productsID.length !== 0 ? (
            uniqueProductsID.map((id: number, index) => (
              <CardCart id={id} key={index} />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
        <div className=" w-2/6 h-[20vw] bg-white justify-evenly flex flex-col items-center rounded-4xl">
          <span data-testid="cost">
            Суммарная стоимость заказа: {totalSum.toLocaleString("ru-RU")} ₽
          </span>
          <span className=" flex items-center w-[40%] justify-between">
            Количество товаров: <u className=" text-2xl">{productsID.length}</u>
          </span>
          <button
            data-testid="createOrder"
            onClick={() =>
              productsID.length && dispatch(createOrder(orderInfo))
            }
            className={`  w-[65%] h-[20%] rounded-4xl  text-2xl ${productsID.length ? "cursor-pointer bg-amber-100" : "cursor-not-allowed bg-gray-200"}`}
          >
            Создать Заказ
          </button>
        </div>
      </div>
    </>
  );
};
