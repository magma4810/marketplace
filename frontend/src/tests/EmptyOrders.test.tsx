import { EmptyOrders } from "@/components/EmptyOrders";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { vi } from 'vitest'; 
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });


vi.mock('../assets/no-order.png', () => ({ default: 'test-no-order-stub' }));

describe("EmptyOrders component", () => {

    it("renders correctly", async () => {
        render(<EmptyOrders />);
        const empty = await screen.findByTestId("empty");
        expect(empty).toHaveTextContent("У вас пока нет заказов");
    });

    it("clicks button", async () => {
        render(
            <MemoryRouter>
                <EmptyOrders />
            </MemoryRouter>
        );
        const emptyButton = await screen.findByTestId("emptyButton");
        fireEvent.click(emptyButton);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});