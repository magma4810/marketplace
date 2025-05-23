import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../app/providers/store/user.slice";
import { logoutFetch as mockLogoutFetch } from "../app/providers/store/user.slice";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../shared/ui/Header";
import { vi, describe, it, expect, afterEach } from "vitest";

vi.mock("../assets/muscle.png", () => ({ default: "test-muscle-stub" }));
vi.mock("../assets/my_orders.png", () => ({ default: "test-orders-stub" }));
vi.mock("../assets/cart.png", () => ({ default: "test-cart-stub" }));
vi.mock("../assets/logout.png", () => ({ default: "test-logout-stub" }));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../store/user.slice", async () => {
  const actual = await vi.importActual("../store/user.slice");
  return {
    ...actual,
    logoutFetch: vi.fn(() => ({ type: "user/logoutFetch" })),
  };
});

describe("Header component", () => {
  const mockDispatch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  const createMockStore = (isAuthenticated: boolean) =>
    configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          username: "",
          password: "",
          productsID: [],
          ordersID: [],
          loading: false,
          isAuthenticated,
          address: "",
        },
      },
    });

  it("renders without authentication", () => {
    render(
      <Provider store={createMockStore(false)}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("SportFuelMarket")).toBeDefined();
    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it("renders with authentication", () => {
    const mockStore = createMockStore(true);
    mockStore.dispatch = mockDispatch;

    render(
      <Provider store={mockStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("SportFuelMarket")).toBeDefined();
    const images = document.querySelectorAll("img");
    expect(images.length).toBeGreaterThanOrEqual(4);

    const logout = screen.getByTestId("logout");
    fireEvent.click(logout);

    expect(mockLogoutFetch).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/signin");
  });
});
