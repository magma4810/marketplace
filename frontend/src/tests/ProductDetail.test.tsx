import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ProductDetail } from "@/components/ProductDetail";
import { productsReducer } from "@/store/products.slice";
import { useParams, useNavigate } from "react-router-dom";
import { ProductModal } from "@/components/ProductModal";
import { Products } from "../../types";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

vi.mock("@/components/ProductModal", () => ({
  ProductModal: vi.fn(({ product, isOpen }) =>
    isOpen ? <div data-testid="product-modal">{product.title}</div> : null,
  ),
}));

describe("ProductDetail component", () => {
  const mockNavigate = vi.fn();
  const mockProduct: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  const createMockStore = (products = [mockProduct]) => {
    return configureStore({
      reducer: {
        products: productsReducer,
      },
      preloadedState: {
        products: {
          products,
          loading: false,
        },
      },
    });
  };

  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ id: "1" });
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders product modal when product exists", () => {
    render(
      <Provider store={createMockStore()}>
        <ProductDetail />
      </Provider>,
    );

    expect(screen.getByTestId("product-modal")).toBeInTheDocument();
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
  });

  it("shows loading when product not found", () => {
    vi.mocked(useParams).mockReturnValue({ id: "999" }); // Несуществующий ID

    render(
      <Provider store={createMockStore()}>
        <ProductDetail />
      </Provider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("product-modal")).not.toBeInTheDocument();
  });

  it("navigates to home when modal is closed", async () => {
    render(
      <Provider store={createMockStore()}>
        <ProductDetail />
      </Provider>,
    );

    const onClose = vi.mocked(ProductModal).mock.calls[0][0].onClose;

    onClose();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("matches snapshot when product exists", () => {
    const { container } = render(
      <Provider store={createMockStore()}>
        <ProductDetail />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when loading", () => {
    vi.mocked(useParams).mockReturnValue({ id: "999" }); // Несуществующий ID

    const { container } = render(
      <Provider store={createMockStore()}>
        <ProductDetail />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
