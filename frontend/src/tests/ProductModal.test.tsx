import { fireEvent, render, screen } from "@testing-library/react";
import { Products } from "../../types";
import { vi, describe, it, expect } from "vitest";
import { ProductModal } from "@/pages/ProductModalPage/ProductModal";

vi.mock("@/components/AddToCart", () => ({
  AddToCart: () => <div>Mock AddToCart</div>,
}));

describe("ProductModal component", () => {
  const product: Products = {
    id: 1,
    title: "protein",
    description: "good",
    count: 3,
    photo: "protein.png",
    price: 3099,
    vendorInfo: "supabase",
  };

  it("renders when open", async () => {
    render(<ProductModal product={product} isOpen={true} onClose={() => {}} />);
    expect(await screen.findByTestId("title")).toHaveTextContent("protein");
  });

  it("does not render when not open", async () => {
    render(
      <ProductModal product={product} isOpen={false} onClose={() => {}} />,
    );
    expect(screen.queryByTestId("title")).not.toBeInTheDocument();
  });

  it("closes modal when clicking overlay", () => {
    const mockOnClose = vi.fn();

    render(
      <ProductModal product={product} isOpen={true} onClose={mockOnClose} />,
    );

    const overlay = screen.getByTestId("modal-overlay");
    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("does not close modal when clicking content", () => {
    const mockOnClose = vi.fn();

    render(
      <ProductModal product={product} isOpen={true} onClose={mockOnClose} />,
    );

    const modalContent = screen.getByTestId("modal-content");
    fireEvent.click(modalContent);

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
