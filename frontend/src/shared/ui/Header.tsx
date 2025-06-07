import { FC } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StoreApp, useAppDispatch } from "@/app/providers/store";
import muscle from "../../assets/muscle.png";
import my_orders from "../../assets/my_orders.png";
import cart from "../../assets/cart.png";
import logout from "../../assets/logout.png";
import { logoutFetch } from "@/features/user/api/user";

const HeaderContainer = styled.header`
  display: flex;
  background: linear-gradient(to right, #c7d2fe, #ddd6fe);
  width: 100vw;
  height: 12vh;
  align-items: center;
  justify-content: space-around;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 30%;
`

const IconImage = styled.img`
  width: 3vw;
  height: auto;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;


export const Header: FC = () => {
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  const role = useSelector((store: StoreApp) => store.user.role);
  return (
    <HeaderContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href="/">
          <IconImage src={muscle} alt="Logo" />
        </a>
        <span style={{ fontSize: '1.5rem' }}>SportFuelMarket</span>
      </div>

      {isAuthenticated && (
        <IconsContainer>
          {role === "user" &&
            <>
              <a href="/my-orders">
                <IconImage src={my_orders} alt="My Orders" />
              </a>
              <a href="/cart">
                <IconImage src={cart} alt="Cart" />
              </a>
            </>
          }

          <LogoutButton />
        </IconsContainer>
      )}
    </HeaderContainer>
  );
};

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <IconImage
      src={logout}
      alt="Logout"
      onClick={() => {
        dispatch(logoutFetch());
        navigate("/signin");
      }}
      data-testid="logout"
    />
  );
};