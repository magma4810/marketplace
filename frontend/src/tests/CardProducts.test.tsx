import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { CardProducts } from "@/features/products/ui/CardProducts";
import { Products } from "../../types";
import { userReducer } from "@/features/user/model/user.slice";

vi.mock("@/components/ProductModal", () => ({
  ProductModal: vi.fn(({ isOpen }) =>
    isOpen ? <div data-testid="product-modal">Mock ProductModal</div> : null,
  ),
}));

vi.mock("@/components/AddToCart", () => ({
  AddToCart: () => <button data-testid="add-to-cart">Mock AddToCart</button>,
}));

vi.mock("@/assets/muscle.png", () => "test-muscle-image");

describe("CardProducts component", () => {
  const mockProduct: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const createMockStore = (productsID: number[] = []) => {
    return configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          username: "",
          password: "",
          productsID,
          ordersID: [],
          loading: false,
          isAuthenticated: false,
          address: "",
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(
      <Provider store={createMockStore()}>
        <CardProducts data={mockProduct} />
      </Provider>,
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`Цена: ${mockProduct.price}₽`)).toBeInTheDocument();
    expect(
      screen.getByText(`В наличии: ${mockProduct.count}`),
    ).toBeInTheDocument();
    expect(screen.getByTestId("add-to-cart")).toBeInTheDocument();
  });

  it("shows correct available count when products are in cart", () => {
    render(
      <Provider store={createMockStore([1, 1, 1])}>
        {" "}
        {/* 3 items in cart */}
        <CardProducts data={mockProduct} />
      </Provider>,
    );

    expect(
      screen.getByText(`В наличии: ${mockProduct.count - 3}`),
    ).toBeInTheDocument();
  });

  it("opens modal when clicked", async () => {
    render(
      <Provider store={createMockStore()}>
        <CardProducts data={mockProduct} />
      </Provider>,
    );

    expect(screen.queryByTestId("product-modal")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(mockProduct.title));

    expect(screen.getByTestId("product-modal")).toBeInTheDocument();
  });

  it("displays product image", () => {
    render(
      <Provider store={createMockStore()}>
        <CardProducts data={mockProduct} />
      </Provider>,
    );

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockProduct.photo);
    expect(image).toHaveAttribute("alt", mockProduct.title);
  });

  it("matches snapshot", () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <CardProducts data={mockProduct} />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
