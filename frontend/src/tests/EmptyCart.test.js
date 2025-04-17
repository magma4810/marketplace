import { jsx as _jsx } from "react/jsx-runtime";
import { EmptyCart } from "@/components/EmptyCart";
import { render, screen } from "@testing-library/react";
describe("EmptyCart render", () => {
    it("render", async () => {
        render(_jsx(EmptyCart, {}));
        const empty = await screen.findByTestId("empty");
        expect(empty).toHaveTextContent("Ваша корзина пуста");
    });
});
