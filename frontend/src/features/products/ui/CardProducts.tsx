import { FC, useState } from "react";
import { CardProps } from "../../../../types";
import { useSelector } from "react-redux";
import { AddToCart } from "../../cart/ui/AddToCart";
import { StoreApp } from "@/app/providers/store";
import { ProductModal } from "@/pages/ProductModalPage/ProductModal";
import { Counter } from "@/features/cart/ui/Counter";

export const CardProducts: FC<CardProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const count = productsID.filter((itemID) => itemID === data.id).length;
  const role = useSelector((store: StoreApp) => store.user.role);
  return (
    <div className="bg-white w-[25vw] h-[30vw] rounded-4xl m-2.5  p-3.5">
      <div
        onClick={() => setOpen(true)}
        className=" flex flex-col justify-between items-center h-4/5"
      >
        <div className="w-45 h-45 flex items-center justify-center rounded-lg">
          <img
            className="max-w-full max-h-full object-contain"
            src={data.photo}
            alt={data.title}
          />
        </div>
        <span className="font-medium">{data.title}</span>

        <div className="w-full px-4 text-center">{data.description}</div>

        <div className="flex justify-evenly w-full">
          <span>Цена: {data.price}₽</span>
          {role === "user" && <span>В наличии: {data.count - count}</span>}
        </div>
      </div>
      {role === "admin" ? 
        <div className=" flex justify-center items-center mt-3.5">
          <Counter id={data.id} count={data.count}/>
        </div>
      : 
         <div className=" h-1/5 flex justify-center items-center">
        <AddToCart data={data} count={count}/>
        </div> 
       }
      

      <ProductModal
        product={data}
        isOpen={open}
        onClose={() => setOpen(false)}
        count={role === "admin" ? data.count : count}
      />
    </div>
  );
};
