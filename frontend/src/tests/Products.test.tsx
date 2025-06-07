import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { userReducer } from "../features/user/model/user.slice";
import { Product } from "../../types";
import { productsReducer } from "@/features/products/model/products.slice";
import { Products } from "@/pages/ProductsPage/Products";

vi.mock("@/components/Header", () => ({
  Header: () => <div>Mock Header</div>,
}));

vi.mock("@/components/Loading", () => ({
  Loading: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("@/components/CardProducts", () => ({
  CardProducts: ({ data }: { data: Product }) => (
    <div data-testid="product-card">{data.title}</div>
  ),
}));

vi.mock("framer-motion", () => ({
  motion: {
    div: (({ children }) => <div>{children}</div>) as React.FC<{
      children: React.ReactNode;
    }>,
  },
  AnimatePresence: (({ children }) => <div>{children}</div>) as React.FC<{
    children: React.ReactNode;
  }>,
}));

vi.mock("../store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("../app/providers/store")>();
  return {
    ...actual,
    useAppDispatch: () => vi.fn(),
  };
});

const mockDispatch = vi.fn();
describe("Products component", () => {
  const mockProducts = [
    {
      id: 1,
      title: "Product A",
      description: "good",
      count: 5,
      photo: "protein.png",
      price: 100,
      vendorInfo: "supabase",
    },
    {
      id: 2,
      title: "Product B",
      description: "good",
      count: 10,
      photo: "protein.png",
      price: 50,
      vendorInfo: "supabase",
    },
    {
      id: 3,
      title: "Product C",
      description: "good",
      count: 2,
      photo: "protein.png",
      price: 200,
      vendorInfo: "supabase",
    },
  ];

  const createMockStore = (loading = false) => {
    return configureStore({
      reducer: {
        products: productsReducer,
        user: userReducer,
      },
      preloadedState: {
        products: {
          products: mockProducts,
          loading,
        },
        user: {
          username: "",
          password: "",
          productsID: [1, 2, 3],
          ordersID: [],
          loading: false,
          isAuthenticated: true,
          address: "",
        },
      },
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    render(
      <Provider store={createMockStore(true)}>
        <Products />
      </Provider>,
    );

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders products list when loaded", async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(
        mockProducts.length,
      );
    });
  });

  it("filters products by search input", async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Начните вводить название товара",
    );
    fireEvent.change(searchInput, { target: { value: "Product A" } });

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText("Product A")).toBeInTheDocument();
    });
  });

  it('shows "not found" message when no matches', async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText(
      "Начните вводить название товара",
    );
    fireEvent.change(searchInput, {
      target: { value: "Non-existent product" },
    });

    await waitFor(() => {
      expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
      expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
    });
  });

  it("sorts products by price ascending", async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      const products = screen.getAllByTestId("product-card");
      expect(products[0]).toHaveTextContent("Product B");
      expect(products[2]).toHaveTextContent("Product C");
    });
  });

  it("sorts products by price descending", async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    const priceSortButton = screen.getByText("Sort by Price");
    fireEvent.click(priceSortButton);

    await waitFor(() => {
      const products = screen.getAllByTestId("product-card");
      expect(products[0]).toHaveTextContent("Product C"); // Самая высокая цена
      expect(products[2]).toHaveTextContent("Product B"); // Самая низкая цена
    });
  });

  it("sorts products by ABC", async () => {
    render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    const abcSortButton = screen.getByText("Sort by ABC");
    fireEvent.click(abcSortButton);

    await waitFor(() => {
      const products = screen.getAllByTestId("product-card");
      expect(products[0]).toHaveTextContent("Product A");
      expect(products[1]).toHaveTextContent("Product B");
      expect(products[2]).toHaveTextContent("Product C");
    });
  });

  it("dispatches getCart when authenticated", async () => {
    vi.mock("../store", async (importOriginal) => {
      const actual = await importOriginal<typeof import("../app/providers/store")>();
      return {
        ...actual,
        useAppDispatch: () => mockDispatch,
      };
    });

    render(
      <Provider store={createMockStore(false)}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });

  it("matches snapshot", async () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <Products />
      </Provider>,
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
