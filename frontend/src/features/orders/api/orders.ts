import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrdersID, clearProductsID } from "../../user/model/user.slice";
import { addOrders, changeLoading } from "../model/orders.slice";
import { OrderInfo } from "../../../../types";
import { updateMyOrders } from "@/features/user/api/user";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrderByID = createAsyncThunk(
  "user/getOrderByID",
  async (id: number, { dispatch }) => {
    const response = await fetch(`${API_URL}/getOrderByID/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Не удалось загрузить данные о товаре");
    }

    const data = await response.json();
    dispatch(addOrders(data));
    dispatch(changeLoading(false));
    return data;
  },
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (orderInfo: OrderInfo, { dispatch }) => {
    try {
      const currentDate = new Date();
      const deliveryDate = new Date();
      deliveryDate.setDate(currentDate.getDate() + 2);

      const orderResponse = await fetch(`${API_URL}/createOrder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          productsID: orderInfo.productsID,
          deliveryAdress: orderInfo.deliveryAdress,
          orderDate: currentDate.toLocaleDateString(),
          deliveryDate: deliveryDate.toLocaleDateString(),
          cost: orderInfo.cost,
          username: orderInfo.username,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Не удалось создать заказ");
      }

      const orderData = await orderResponse.json();
      dispatch(addOrdersID(orderData[0].id));
      await dispatch(
        updateMyOrders({
          username: orderInfo.username,
        }),
      );

      dispatch(clearProductsID());
      return orderData;
    } catch (error) {
      console.error("Order creation failed:", error);
      throw error;
    } finally {
      dispatch(changeLoading(false));
    }
  },
);
