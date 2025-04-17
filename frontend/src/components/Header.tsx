import { FC } from "react";
import { StoreApp, useAppDispatch } from "../store";
import { IconProps } from "../../types";
import muscle from "../assets/muscle.png";
import my_orders from "../assets/my_orders.png";
import cart from "../assets/cart.png";
import logout from "../assets/logout.png";
import { logoutFetch } from "../store/user.slice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  return (
    <div className="flex bg-gradient-to-r from-indigo-200 to-purple-200 w-[100vw] h-[12vh] items-center justify-around">
      <div className="flex items-center justify-center">
        <Icon href="/" src={muscle} />
        <a href="/">
          <span className="text-3xl">SportFuelMarket43s2</span>
        </a>
      </div>
      {isAuthenticated && (
        <div className="flex justify-between w-[20%]">
          <Icon href="/my-orders" src={my_orders} />
          <Icon href="/cart" src={cart} />
          <Icon href="/signin" src={logout} data_testid="logout" />
        </div>
      )}
    </div>
  );
};

const Icon: FC<IconProps> = ({ href, src, data_testid }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent) => {
    if (href === "/signin") {
      e.preventDefault();
      dispatch(logoutFetch());
      navigate("/signin");
    }
  };

  return (
    <a
      href={href}
      onClick={(e) => onClick(e)}
      className="block w-[3vw] h-auto"
      data-testid={data_testid}
    >
      <img src={src} alt="" />
    </a>
  );
};
