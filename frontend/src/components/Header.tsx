import { FC } from "react";
import { useAppDispatch } from "../store";
import { IconProps } from "../../types"
import { getProducts } from "../store/products.slice";

import muscle from "../assets/muscle.png"
import my_orders from "../assets/my_orders.png"
import cart from "../assets/cart.png"
import logout from "../assets/logout.png"
import { getOrders } from "../store/user.slice";
import { getCart } from "../store/user.slice";

export const Header: FC = () => {
    const username = "vannesal";
    return (
        <div className=" flex bg-amber-100 w-[100vw] h-[12vh] items-center justify-around">
            <div className=" flex items-center justify-center"><Icon href={"/"} handleClick={getProducts} src={muscle}/> <a href="/"><span className=" text-3xl">SportFuelMarket</span></a></div>
            <div className=" flex justify-between w-[20%]">
                <Icon href="/my-orders" handleClick={() => getOrders(username)} src={my_orders}/>
                <Icon href="/cart" handleClick={() => getCart(username)} src={cart}/>
                <Icon href="/signin" handleClick={() => logout} src={logout}/>
            </div>
        </div>
    )
}

const Icon: FC<IconProps> = ({ ...props }) => {
    const dispatch = useAppDispatch();
    return (
      <a href={props.href} onClick={() => dispatch(props.handleClick)} className="block w-[3vw] h-auto">
          <img src={props.src} alt=""/>
      </a>
    );
  };
  