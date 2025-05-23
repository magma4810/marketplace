import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect } from "vitest";
import { CardOrder } from "@/features/cart/ui/CardOrder";
import { CardOrderProps, Products } from "../../types";
import { productsReducer } from "@/features/products/model/products.slice";

vi.mock("@/assets/muscle.png", () => "test-muscle-image");

describe("CardOrder component", () => {
  const mockProduct: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const mockOrder: CardOrderProps["data"] = {
    id: 1,
    productsID: [1, 2],
    active: true,
    deliveryAdress: "Moscow, Red Square",
    deliveryDate: "2023-12-31",
    orderDate: "2023-12-25",
    cost: 2000,
  };

  const createMockStore = (products: Products[]) => {
    return configureStore({
      reducer: {
        products: productsReducer,
      },
      preloadedState: {
        products: {
          products: products,
          loading: false,
        },
      },
    });
  };

  it("renders correctly with active order", () => {
    render(
      <Provider
        store={createMockStore([mockProduct, { ...mockProduct, id: 2 }])}
      >
        <CardOrder data={mockOrder} />
      </Provider>,
    );

    expect(screen.getByText(/Order ID:/)).toHaveTextContent(
      `Order ID: ${mockOrder.id}`,
    );
    expect(screen.getByText("Активен")).toBeInTheDocument();

    const deliveryAddressElement =
      screen.getByText(/Delivery address:/).parentElement;
    expect(deliveryAddressElement).toHaveTextContent(mockOrder.deliveryAdress);

    const deliveryDateElement =
      screen.getByText(/Delivery Date:/).parentElement;
    expect(deliveryDateElement).toHaveTextContent(mockOrder.deliveryDate);

    const orderDateElement = screen.getByText(/Order Date:/).parentElement;
    expect(orderDateElement).toHaveTextContent(mockOrder.orderDate);

    expect(screen.getByText(/₽/)).toHaveTextContent("2 000 ₽");

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("renders correctly with completed order", () => {
    const completedOrder = { ...mockOrder, active: false };

    render(
      <Provider store={createMockStore([mockProduct])}>
        <CardOrder data={completedOrder} />
      </Provider>,
    );

    expect(screen.getByText("Завершен")).toBeInTheDocument();
  });

  it("displays product images when products exist", () => {
    render(
      <Provider store={createMockStore([mockProduct])}>
        <CardOrder data={mockOrder} />
      </Provider>,
    );

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt", mockProduct.title);
    });
  });

  it("handles missing products gracefully", () => {
    const orderWithMissingProducts = {
      ...mockOrder,
      productsID: [99],
    };

    render(
      <Provider store={createMockStore([mockProduct])}>
        <CardOrder data={orderWithMissingProducts} />
      </Provider>,
    );

    const images = screen.queryAllByRole("img");
    expect(images.length).toBe(0);
  });

  it("formats price correctly", () => {
    const expensiveOrder = {
      ...mockOrder,
      cost: 1234567,
    };

    render(
      <Provider store={createMockStore([mockProduct])}>
        <CardOrder data={expensiveOrder} />
      </Provider>,
    );

    expect(screen.getByText("1 234 567 ₽")).toBeInTheDocument();
  });
});
