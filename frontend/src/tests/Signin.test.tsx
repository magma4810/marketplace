import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { describe, it, expect, beforeEach } from "vitest";
import { Signin } from "@/components/Signin";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/store";
import { MemoryRouter, useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/store", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/store")>();
  return {
    ...actual,
    useAppDispatch: vi.fn(),
  };
});

vi.mock("react-feather", () => ({
  Eye: () => <div>EyeIcon</div>,
  EyeOff: () => <div>EyeOffIcon</div>,
}));

global.fetch = vi.fn();

describe("Signin component", () => {
  const mockNavigate = vi.fn();
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    sessionStorage.clear();
    vi.clearAllMocks();

    global.fetch = vi.fn();
  });

  const renderComponent = () => {
    return render(
      <Provider store={configureStore({ reducer: {} })}>
        <MemoryRouter>
          <Signin />
        </MemoryRouter>
      </Provider>,
    );
  };

  it("renders the signin form", () => {
    renderComponent();

    expect(screen.getByText("Добро пожаловать")).toBeInTheDocument();
    expect(screen.getByLabelText("Имя пользователя")).toBeInTheDocument();
    expect(screen.getByLabelText("Пароль")).toBeInTheDocument();
    expect(screen.getByText("Войти в систему")).toBeInTheDocument();
    expect(screen.getByText("Ещё нет аккаунта?")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    renderComponent();

    const passwordInput = screen.getByLabelText("Пароль");
    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByRole("button", {
      name: /показать пароль/i,
    });
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("handles form submission with success", async () => {
    const mockUser = { password: "test123", address: "123 Main St" };

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockUser),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response);

    renderComponent();

    fireEvent.change(screen.getByLabelText("Имя пользователя"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText("Пароль"), {
      target: { value: "test123" },
    });
    fireEvent.click(screen.getByText("Войти в систему"));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/getUserInfoByName/testuser",
        expect.anything(),
      );
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3000/api/login",
        expect.anything(),
      );

      expect(mockDispatch).toHaveBeenCalledWith({
        type: "user/changeUsername",
        payload: "testuser",
      });
      expect(mockDispatch).toHaveBeenCalledWith({
        type: "user/changeIsAuthenticated",
        payload: true,
      });
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
