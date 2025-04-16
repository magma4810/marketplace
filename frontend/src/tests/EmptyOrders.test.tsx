import { EmptyOrders } from "@/components/EmptyOrders";
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../assets/no-order.png', () => 'test-no-order-stub');
describe("EmptyOrders component", () => {
    const mockNavigate = jest.fn();
    beforeEach(() => {
        (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    });
    it("render",async () => {
        render(
                <EmptyOrders/>
        )
        const empty = await screen.findByTestId("empty");
        expect(empty).toHaveTextContent("У вас пока нет заказов");
    })

    it("click button",async () => {
        render(
            <MemoryRouter>
                <EmptyOrders/>
            </MemoryRouter>
        )
        const empty = await screen.findByTestId("emptyButton");
        fireEvent.click(empty);
        expect(mockNavigate).toHaveBeenCalledWith('/');
    })
})