import { FC } from "react";
import { addProductsID, deleteProductsID } from "../store/user.slice";
import { StoreApp, useAppDispatch } from "../store";
import { useSelector } from "react-redux";

export const Counter: FC<{ id: number }> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const products = useSelector((store: StoreApp) => store.products.products);
  const product = products.find((p) => p.id === props.id);
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const count = productsID.filter((itemID) => itemID === props.id).length;
  const increment = () => {
    if (count < (product?.count || 0)) {
      dispatch(addProductsID(props.id));
    }
  };

  const decrement = () => {
    if (count > 0) {
      dispatch(deleteProductsID(props.id));
    }
  };
  return (
    <div className="flex items-center text-2xl">
      <button
        className={`px-4 py-2 rounded-lg ${
          count > 0
            ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            : "bg-gray-100 cursor-not-allowed"
        }`}
        onClick={decrement}
        disabled={count <= 0}
      >
        -
      </button>

      <span className="px-6 py-2" data-testid="counter">
        {count}
      </span>

      <button
        className={`px-4 py-2 rounded-lg ${
          count < product!.count
            ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            : "bg-gray-100 cursor-not-allowed"
        }`}
        onClick={increment}
        disabled={count >= product!.count}
      >
        +
      </button>
    </div>
  );
};
