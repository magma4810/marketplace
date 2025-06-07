import { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { EmptyOrders } from "../../features/orders/ui/EmptyOrders";
import { StoreApp,useAppDispatch } from "@/app/providers/store";
import { getOrders } from "@/features/user/api/user";
import { Header } from "@/shared/ui/Header";
import { Loading } from "@/shared/ui/Loading";
import { SortBy } from "@/features/products/ui/SortBy";
import { changeLoading } from "../../features/orders/model/orders.slice";
import { CardOrder } from "@/features/cart/ui/CardOrder";
import { getProducts } from "@/features/products/api/products";
import { getOrderByID } from "../../features/orders/api/orders";

export const MyOrders: FC = () => {
  const dispatch = useAppDispatch();
  const username = useSelector((store: StoreApp) => store.user.username);
  const ordersID = useSelector((store: StoreApp) => store.user.ordersID);
  const orders = useSelector((store: StoreApp) => store.orders.orders);
  const loadingOrdersID = useSelector((store: StoreApp) => store.user.loading);
  const loadingOrders = useSelector((store: StoreApp) => store.orders.loading);
  const isLoading = loadingOrdersID || loadingOrders;
  const [sortBy, setSortBy] = useState<"id" | "price">("price");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  useEffect(() => {
    dispatch(getOrders(username));
    dispatch(getProducts());
  }, [username, dispatch]);
  useEffect(() => {
    if (!loadingOrdersID) {
      if (ordersID.length !== 0) {
        ordersID.map((id: number) => dispatch(getOrderByID(id)));
      } else {
        dispatch(changeLoading(false));
      }
    }
  }, [dispatch, loadingOrdersID]);
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      if (sortBy === "id") {
        return sortDirection === "asc" ? a.id - b.id : b.id - a.id;
      } else {
        return sortDirection === "asc" ? a.cost - b.cost : b.cost - a.cost;
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
                active={sortBy === "id"}
                direction={sortBy === "id" ? sortDirection : undefined}
                onClick={() => {
                  if (sortBy === "id") {
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    );
                  } else {
                    setSortBy("id");
                    setSortDirection("asc");
                  }
                }}
              >
                Sort by Date
              </SortBy>

              <SortBy
                active={sortBy === "price"}
                direction={sortBy === "price" ? sortDirection : undefined}
                onClick={() => {
                  if (sortBy === "price") {
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    );
                  } else {
                    setSortBy("price");
                    setSortDirection("asc");
                  }
                }}
              >
                Sort by Price
              </SortBy>
            </div>
            <div data-testid="order-list">
              {sortedOrders.map((order, index) => (
                <CardOrder data={order} key={index} />
              ))}
            </div>
          </>
        ) : (
          <EmptyOrders />
        )}
      </div>
    </>
  );
};
