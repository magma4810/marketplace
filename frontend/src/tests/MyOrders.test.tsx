import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { MyOrders } from "@/pages/MyOrdersPage/MyOrders";
import { userReducer } from "../features/user/model/user.slice";
import { Orders, Products } from "../../types";
import { ordersReducer } from "@/features/orders/model/orders.slice";
import { productsReducer } from "@/features/products/model/products.slice";

vi.mock("@/components/Header", () => ({
  Header: () => <div>Mock Header</div>,
}));

vi.mock("@/components/CardOrder", () => ({
  CardOrder: ({ data }: { data: Orders }) => (
    <div data-testid="order-card">Mock CardOrder - {data.cost} RUB</div>
  ),
}));

vi.mock("@/components/Loading", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("@/components/EmptyOrders", () => ({
  EmptyOrders: () => <div>No orders found</div>,
}));

const mockDispatch = vi.fn();
describe("MyOrders component", () => {
  beforeEach(() => {
    vi.mock("../store", async () => {
      const actual = await vi.importActual("../store");
      return {
        ...actual,
        useAppDispatch: () => mockDispatch,
      };
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const createMockStore = (orders: Orders[], products: Products[] = []) => {
    return configureStore({
      reducer: {
        user: userReducer,
        orders: ordersReducer,
        products: productsReducer,
      },
      preloadedState: {
        user: {
          username: "",
          password: "",
          productsID: [1, 2, 3],
          ordersID: [],
          loading: false,
          isAuthenticated: true,
          address: "",
        },
        orders: {
          orders,
          loading: false,
        },
        products: {
          products,
          loading: false,
        },
      },
    });
  };

  it("should render with orders", async () => {
    const testOrders = [
      {
        id: 1,
        cost: 4990,
        productsID: [1, 2],
        active: true,
        deliveryAdress: "Moscow",
        deliveryDate: "2023-01-01",
        orderDate: "2023-01-01",
      },
    ];

    render(
      <Provider store={createMockStore(testOrders)}>
        <MyOrders />
      </Provider>,
    );

    expect(screen.getByText("Sort by Date")).toBeInTheDocument();
    expect(screen.getByText("Sort by Price")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByTestId("order-card")).toHaveLength(1);
    });
  });

  it("should sort orders by price", async () => {
    const testOrders = [
      {
        id: 1,
        cost: 100,
        productsID: [1],
        active: true,
        deliveryAdress: "Moscow",
        deliveryDate: "2023-01-01",
        orderDate: "2023-01-01",
      },
      {
        id: 2,
        cost: 50,
        productsID: [2],
        active: true,
        deliveryAdress: "Moscow",
        deliveryDate: "2023-01-02",
        orderDate: "2023-01-02",
      },
    ];

    render(
      <Provider store={createMockStore(testOrders)}>
        <MyOrders />
      </Provider>,
    );

    await waitFor(() => {
      const orders = screen.getAllByTestId("order-card");
      expect(orders[0]).toHaveTextContent("50 RUB");
      expect(orders[1]).toHaveTextContent("100 RUB");
    });
  });
});
