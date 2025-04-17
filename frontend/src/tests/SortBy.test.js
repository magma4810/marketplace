import { jsx as _jsx } from "react/jsx-runtime";
import { SortBy } from "@/components/SortBy";
import { render, screen } from "@testing-library/react";
describe("SortBy component", () => {
    it("render", async () => {
        render(_jsx(SortBy, { active: true, direction: "asc", onClick: () => { }, children: " " }));
        expect(await screen.findByTestId("direction")).toHaveTextContent('↑');
    });
});
