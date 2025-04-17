import { jsx as _jsx } from "react/jsx-runtime";
import { ProductModal } from "@/components/ProductModal";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
vi.mock('@/components/AddToCart', () => ({
    AddToCart: () => _jsx("div", { children: "Mock AddToCart" })
}));
describe("ProductModal component", () => {
    const product = {
        id: 1,
        title: 'protein',
        description: 'good',
        count: 3,
        photo: 'protein.png',
        price: 3099,
        vendorInfo: 'supabase'
    };
    it("renders when open", async () => {
        render(_jsx(ProductModal, { product: product, isOpen: true, onClose: () => { } }));
        expect(await screen.findByTestId("title")).toHaveTextContent("protein");
    });
    it("does not render when not open", async () => {
        render(_jsx(ProductModal, { product: product, isOpen: false, onClose: () => { } }));
        expect(screen.queryByTestId("title")).not.toBeInTheDocument();
    });
    it('closes modal when clicking overlay', () => {
        const mockOnClose = vi.fn();
        render(_jsx(ProductModal, { product: product, isOpen: true, onClose: mockOnClose }));
        const overlay = screen.getByTestId('modal-overlay');
        fireEvent.click(overlay);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
    it('does not close modal when clicking content', () => {
        const mockOnClose = vi.fn();
        render(_jsx(ProductModal, { product: product, isOpen: true, onClose: mockOnClose }));
        const modalContent = screen.getByTestId('modal-content');
        fireEvent.click(modalContent);
        expect(mockOnClose).not.toHaveBeenCalled();
    });
});
