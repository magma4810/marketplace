import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Products } from "../../types";
import { Cart } from "@/pages/CartPage/Cart";
import * as store from "../app/providers/store";
import { updateProductsID, userReducer } from "../app/providers/store/user.slice";
import { productsReducer } from "@/features/products/model/products.slice";
import { ordersReducer } from "../features/orders/model/orders.slice";
import { createOrder } from "@/features/orders/api/orders";

vi.mock("@/components/Header", () => ({
  Header: () => <div>Mock Header</div>,
}));

vi.mock("../store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../app/providers/store")>();
  return {
    ...actual,
    useAppDispatch: () => vi.fn(),
  };
});

vi.mock("@/store/user.slice", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../app/providers/store/user.slice")>();
  return {
    ...actual,
    updateProductsID: vi.fn((payload) => ({
      type: "user/updateProductsID",
      payload,
    })),
  };
});

vi.mock("@/store/orders.slice", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../features/orders/model/orders.slice")>();
  return {
    ...actual,
    createOrder: vi.fn((payload) => ({
      type: "user/createOrder",
      payload,
    })),
  };
});

describe("Cart component", () => {
  const mockDispatch = vi.fn();
  const product: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const createMockStore = (loading: boolean, productsID: number[]) => {
    return configureStore({
      reducer: {
        user: userReducer,
        products: productsReducer,
        orders: ordersReducer,
      },
      preloadedState: {
        user: {
          username: "pasha",
          password: "",
          productsID,
          ordersID: [],
          loading,
          isAuthenticated: true,
          address: "",
        },
        products: {
          products: [product],
          loading,
        },
      },
    });
  };

  beforeEach(() => {
    vi.spyOn(store, "useAppDispatch").mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should render cart with correct total price", () => {
    render(
      <Provider store={createMockStore(true, [1])}>
        <Cart />
      </Provider>,
    );

    expect(screen.getByTestId("cost")).toHaveTextContent(
      "Суммарная стоимость заказа: 3 099 ₽",
    );
  });

  it("should dispatch updateProductsID when productsID changes and not loading", () => {
    const store = createMockStore(false, [1, 2, 3]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>,
    );

    expect(mockDispatch).toHaveBeenCalledTimes(4);
    expect(mockDispatch).toHaveBeenCalledWith(
      updateProductsID({
        username: "pasha",
        productsID: [1, 2, 3],
      }),
    );
  });

  it("should dispatch createOrder when button is clicked", () => {
    const store = createMockStore(false, [1, 2, 3]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>,
    );

    const createOrderButton = screen.getByTestId("createOrder");
    fireEvent.click(createOrderButton);

    expect(createOrder).toHaveBeenCalledWith({
      productsID: [1, 2, 3],
      deliveryAdress: "",
      cost: 3099,
      username: "pasha",
    });
  });
});
