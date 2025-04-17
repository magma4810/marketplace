import { describe, it, expect } from 'vitest';
import { productsReducer } from "@/store/products.slice";
import { userReducer } from "@/store/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import { Products } from "../../types";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { CardCart } from "@/components/CardCart";
import { Provider } from "react-redux";

describe("Card component", () => {

  const product: Products = {
    id: 1,
    title: 'protein',
    description: 'good',
    count: 3,
    photo: 'protein.png',
    price: 3099,
    vendorInfo: 'supabase'
  };

  const createMockStore = (productsID: Array<number>) => configureStore({
    reducer: {
      user: userReducer,
      products: productsReducer
    },
    preloadedState: {
      user: {
        username: "",
        password: "",
        productsID,
        ordersID: [],
        loading: false,
        isAuthenticated: true,
        address: ""
      },
      products: {
        products: [product],
        loading: false
      }
    }
  });

  it("renders product not found", async () => {
    render(
      <Provider store={createMockStore([])}>
        <CardCart id={52} />
      </Provider>
    );
    expect(await screen.findByText("Товар не найден")).toBeInTheDocument();
  });

  it("renders product found", async () => {
    render(
      <Provider store={createMockStore([1, 2, 3])}>
        <CardCart id={1} />
      </Provider>
    );
    const availabilityElement = await screen.findByTestId("counterAvailability");
    const description = await screen.findByTestId("description");
    
    expect(availabilityElement).toHaveTextContent("В наличии: 2");
    expect(description).toHaveTextContent("good");
  });
});