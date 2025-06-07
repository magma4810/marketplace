import { FC } from "react";
import { useSelector } from "react-redux";
import { StoreApp, useAppDispatch } from "@/app/providers/store";
import { addProductsID, deleteProductsID } from "@/features/user/model/user.slice";
import { updateCountProduct } from "@/features/products/api/products";

export const Counter: FC<{ id: number; count: number }> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const products = useSelector((store: StoreApp) => store.products.products);
  const role = useSelector((store: StoreApp) => store.user.role);
  const product = products.find((p) => p.id === props.id);
  const increment = () => {
    if (role === "user") {
      if (props.count < (product?.count || 0)) {
        dispatch(addProductsID(props.id));
      }
    } else {
      dispatch(updateCountProduct({
        count: ++props.count,
        id: props.id,
      }));
    }
  };

  const decrement = () => {
    if (role === "user") {
      if (props.count > 0) {
        dispatch(deleteProductsID(props.id));
      }
    } else {
      dispatch(updateCountProduct({
        count: --props.count,
        id: props.id,
      }));
    }
  };
  return (
    <div className="flex items-center text-2xl">
      <button
        className={`px-4 py-2 rounded-lg ${props.count > 0
            ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            : "bg-gray-100 cursor-not-allowed"
          }`}
        onClick={decrement}
        disabled={props.count <= 0}
      >
        -
      </button>

      <span className="px-6 py-2" data-testid="counter">
        {props.count}
      </span>

      <button
        className={`px-4 py-2 rounded-lg ${props.count < product!.count || role === "admin"
            ? "bg-gray-200 hover:bg-gray-300 cursor-pointer"
            : "bg-gray-100 cursor-not-allowed"
          }`}
        onClick={increment}
        disabled={props.count >= product!.count && role === "user"}
      >
        +
      </button>
    </div>
  );
};
