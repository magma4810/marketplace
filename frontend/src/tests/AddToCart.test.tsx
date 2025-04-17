import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { AddToCart } from "../components/AddToCart";
import { Products } from "../../types";
import { addProductsID, userReducer } from "../store/user.slice";
import { productsReducer } from "@/store/products.slice";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockDispatch = vi.fn();
vi.mock("../store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../store")>();
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("AddToCart component", () => {
  const product: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const createMockStore = (isAuthenticated: boolean, productsID: number[]) => {
    return configureStore({
      reducer: {
        user: userReducer,
        products: productsReducer,
      },
      preloadedState: {
        user: {
          username: "",
          password: "",
          productsID,
          ordersID: [],
          loading: false,
          isAuthenticated,
          address: "",
        },
        products: {
          products: [product],
          loading: false,
        },
      },
    });
  };

  beforeEach(() => {
    mockNavigate.mockClear();
    mockDispatch.mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders without authentication", () => {
    render(
      <Provider store={createMockStore(false, [])}>
        <MemoryRouter>
          <AddToCart data={product} />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByText("Добавить в корзину");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/signin");
  });

  it("renders with authentication", () => {
    render(
      <Provider store={createMockStore(true, [2])}>
        <MemoryRouter>
          <AddToCart data={product} />
        </MemoryRouter>
      </Provider>,
    );

    const button = screen.getByText("Добавить в корзину");
    fireEvent.click(button);
    expect(mockDispatch).toHaveBeenCalledWith(addProductsID(product.id));
  });
});
