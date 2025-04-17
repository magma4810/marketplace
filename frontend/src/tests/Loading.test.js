import { jsx as _jsx } from "react/jsx-runtime";
import { Loading } from "@/components/Loading";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
describe("Loading component", () => {
    it("render", () => {
        render(_jsx(Loading, {}));
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
