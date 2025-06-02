import { FC } from "react";
import { Counter } from "./Counter";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Products } from "../../../../types";
import { addProductsID } from "@/features/user/model/user.slice";
import { StoreApp,useAppDispatch } from "@/app/providers/store";
import styled from "styled-components";

const AddToCartButton = styled.button`
  cursor: pointer;
  background-color: rgba(254, 243, 199, 0.5);
  border-radius: 9999px; 
  width: 70%;
  height: 50%;
  transition: background-color 0.2s ease-in-out;
  
  &:hover {
    background-color: rgba(253, 230, 138, 0.5);
  }
`;

export const AddToCart: FC<{ data: Products }> = ({ data }) => {
  const isAuthenticated = useSelector(
    (store: StoreApp) => store.user.isAuthenticated,
  );
  const productsID = useSelector((store: StoreApp) => store.user.productsID);
  const count = productsID.filter((itemID) => itemID === data.id).length;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      {isAuthenticated && count > 0 ? (
        <Counter id={data.id} />
      ) : (
        <AddToCartButton
          onClick={() =>
            isAuthenticated
              ? dispatch(addProductsID(data.id))
              : navigate("/signin")
          }
        >
          Добавить в корзину
        </AddToCartButton>
      )}
    </>
  );
};
