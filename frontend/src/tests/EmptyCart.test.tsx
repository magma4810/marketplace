import { EmptyCart } from "@/features/cart/ui/EmptyCart";
import { render, screen } from "@testing-library/react";

describe("EmptyCart render", () => {
  it("render", async () => {
    render(<EmptyCart />);
    const empty = await screen.findByTestId("empty");
    expect(empty).toHaveTextContent("Ваша корзина пуста");
  });
});
