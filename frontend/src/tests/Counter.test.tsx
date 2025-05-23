import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  addProductsID,
  deleteProductsID,
  userReducer,
} from "../app/providers/store/user.slice";
import { MemoryRouter } from "react-router-dom";
import { Products } from "../../types";
import { Counter } from "@/features/cart/ui/Counter";
import { vi } from "vitest";
import { productsReducer } from "@/features/products/model/products.slice";

const mockDispatch = vi.fn();

vi.mock("../store", async () => {
  const actual = (await vi.importActual("../store")) as object;
  return {
    ...actual,
    useAppDispatch: () => mockDispatch,
  };
});

describe("Counter component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const product: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const createMockStore = (isAuthenticated: boolean, productsID: number[]) =>
    configureStore({
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

  it("renders with authentication", () => {
    // Создаем стор с мок-диспетчером
    const mockStore = {
      ...createMockStore(true, [1]),
      dispatch: mockDispatch,
    };

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Counter id={1} />
        </MemoryRouter>
      </Provider>,
    );

    const decrement = screen.getByText("-");
    const increment = screen.getByText("+");

    fireEvent.click(increment);
    fireEvent.click(decrement);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
    expect(mockDispatch).toHaveBeenCalledWith(addProductsID(product.id));
    expect(mockDispatch).toHaveBeenCalledWith(deleteProductsID(product.id));
  });
});
