import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { vi } from "vitest";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { userReducer } from "@/store/user.slice";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuthCheck } from "@/components/hooks/useAuthCheck";

vi.mock("@/components/hooks/useAuthCheck", () => ({
  useAuthCheck: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
    Outlet: () => <div data-testid="outlet">Protected Content</div>,
    Navigate: ({ to }: { to: string }) => (
      <div data-testid="navigate" data-to={to}>
        Redirect to {to}
      </div>
    ),
  };
});

describe("ProtectedRoute component", () => {
  const TestComponent = () => <div>Test Page</div>;
  const createMockStore = (isAuthenticated: boolean) => {
    return configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: {
        user: {
          username: "pasha",
          password: "",
          productsID: [1, 2, 3],
          ordersID: [],
          loading: false,
          isAuthenticated,
          address: "",
        },
      },
    });
  };

  beforeEach(() => {
    vi.mocked(useLocation).mockReturnValue({
      pathname: "/protected",
      search: "",
      hash: "",
      state: null,
      key: "testkey",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading when auth is not checked", () => {
    vi.mocked(useAuthCheck).mockReturnValue(false);

    render(
      <Provider store={createMockStore(false)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.queryByTestId("outlet")).not.toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
  });

  it("renders Outlet when authenticated", () => {
    vi.mocked(useAuthCheck).mockReturnValue(true);

    render(
      <Provider store={createMockStore(true)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("outlet")).toBeInTheDocument();
    expect(screen.queryByTestId("navigate")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("redirects to signin when not authenticated", () => {
    vi.mocked(useAuthCheck).mockReturnValue(true);

    render(
      <Provider store={createMockStore(false)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const navigate = screen.getByTestId("navigate");
    expect(navigate).toBeInTheDocument();
    expect(navigate).toHaveAttribute("data-to", "/signin");
    expect(screen.queryByTestId("outlet")).not.toBeInTheDocument();
    expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  });

  it("passes location state to Navigate", () => {
    vi.mocked(useAuthCheck).mockReturnValue(true);
    const testLocation = {
      pathname: "/protected",
      search: "",
      hash: "",
      state: { from: "/protected" },
      key: "testkey",
    };
    vi.mocked(useLocation).mockReturnValue(testLocation);

    render(
      <Provider store={createMockStore(false)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const navigate = screen.getByTestId("navigate");
    expect(navigate).toBeInTheDocument();
    // Здесь можно добавить проверку переданного state, если mock Navigate его поддерживает
  });

  it("matches snapshot when loading", () => {
    vi.mocked(useAuthCheck).mockReturnValue(false);

    const { container } = render(
      <Provider store={createMockStore(false)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when authenticated", () => {
    vi.mocked(useAuthCheck).mockReturnValue(true);

    const { container } = render(
      <Provider store={createMockStore(true)}>
        <MemoryRouter initialEntries={["/protected"]}>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/protected" element={<TestComponent />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
