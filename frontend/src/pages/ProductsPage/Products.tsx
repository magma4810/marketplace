import { FC, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { StoreApp,useAppDispatch } from "@/app/providers/store";
import { getProducts } from "@/features/products/api/products";
import { getCart, updateProductsID } from "@/app/providers/store/user.slice";
import { Header } from "@/shared/ui/Header";
import { Loading } from "@/shared/ui/Loading";
import { SortBy } from "@/features/products/ui/SortBy";
import { CardProducts } from "@/features/products/ui/CardProducts";

export const Products: FC = () => {
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<"ABC" | "price">("price");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [input, setInput] = useState("");
  const loading = useSelector((store: StoreApp) => store.products.loading);
  const products = useSelector((store: StoreApp) => store.products.products);
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const username = useSelector((store: StoreApp) => store.user.username);
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  useEffect(() => {
    dispatch(getProducts());
    if (username) {
      dispatch(getCart(username));
    }
  }, [username]);
  useEffect(() => {
    if (!loading && isAuthenticated && productsID.length !== 0) {
      dispatch(
        updateProductsID({ username: username, productsID: productsID }),
      );
    }
  }, [productsID, isAuthenticated, loading, username, dispatch]);
  const sortedProducts = useMemo(() => {
    const modifier = sortDirection === "asc" ? 1 : -1;
    return [...products].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (a.price - b.price) * modifier;
        case "ABC": {
          const firstLetterA = a.title[0]?.charAt(0) || "";
          const firstLetterB = b.title[0]?.charAt(0) || "";
          return firstLetterA.localeCompare(firstLetterB) * modifier;
        }
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
        ) : (
          <>
            <div className="flex gap-4 mb-6 justify-center items-center h-[50%] w-full">
              <input
                placeholder="Начните вводить название товара"
                type="text"
                className=" border-blue-600 border-1 w-[40%] px-4 py-2 bg-white rounded-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <SortBy
                active={sortBy === "ABC"}
                direction={sortBy === "ABC" ? sortDirection : undefined}
                onClick={() => {
                  if (sortBy === "ABC") {
                    setSortDirection((prev) =>
                      prev === "asc" ? "desc" : "asc",
                    );
                  } else {
                    setSortBy("ABC");
                    setSortDirection("asc");
                  }
                }}
              >
                Sort by ABC
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
            <AnimatePresence>
              {sortedProducts.filter((product) =>
                product.title.toLowerCase().includes(input.toLowerCase()),
              ).length > 0 ? (
                sortedProducts.map(
                  (product) =>
                    product.title
                      .toLowerCase()
                      .includes(input.toLowerCase()) && (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardProducts data={product} />
                      </motion.div>
                    ),
                )
              ) : (
                <div className="text-center py-12 w-full">
                  <div className="text-6xl mb-4">🕵️‍♂️</div>
                  <h3 className="text-xl font-medium mb-2">
                    Ничего не найдено
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Попробуйте изменить параметры поиска
                  </p>
                </div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </>
  );
};
