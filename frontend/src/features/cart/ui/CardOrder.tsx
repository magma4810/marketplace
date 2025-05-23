import { CardOrderProps } from "../../../../types";
import { useSelector } from "react-redux";
import { FC } from "react";
import { StoreApp } from "@/app/providers/store";

export const CardOrder: FC<CardOrderProps> = ({ data }) => {
  const products = useSelector((store: StoreApp) => store.products.products);
  const productIds = Array.isArray(data.productsID)
    ? data.productsID
    : [data.productsID];
  return (
    <div className="bg-white w-full rounded-4xl m-3.5 flex flex-col justify-around items-center p-6">
      <div className="flex justify-between w-full mb-4">
        <span className="font-medium">Order ID: {data.id}</span>
        <span
          className={`px-2 py-1 rounded text-sm ${
            data.active
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {data.active ? "Активен" : "Завершен"}
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
            const product = products.find((p) => p.id === id);
            return product ? (
              <div
                key={index}
                className="w-16 h-16 flex items-center justify-center bg-white rounded-lg border border-gray-200 p-1"
              >
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
        <span className="font-medium">
          {data.cost.toLocaleString("ru-RU")} ₽
        </span>
      </div>
    </div>
  );
};
