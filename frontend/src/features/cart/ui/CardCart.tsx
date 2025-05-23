import { FC } from "react";
import { useSelector } from "react-redux";
import { Counter } from "./Counter";
import { StoreApp } from "@/app/providers/store";

export const CardCart: FC<{ id: number }> = ({ id }) => {
  const products = useSelector((store: StoreApp) => store.products.products);
  const product = products.find((p) => p.id === id);
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const count = productsID.filter((itemID) => itemID === id).length;

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
              <span
                className="line-clamp-1 text-gray-600"
                data-testid="description"
              >
                {product.description}
              </span>
            </div>

            <div className="flex flex-col items-center justify-evenly w-1/2">
              <span className="font-bold">{product.price * count} ₽</span>
              <Counter id={id} />
              <span
                className="text-sm text-gray-500"
                data-testid="counterAvailability"
              >
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
