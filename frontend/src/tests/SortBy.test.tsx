import { SortBy } from "@/features/products/ui/SortBy";
import { render, screen } from "@testing-library/react";

describe("SortBy component", () => {
  it("render", async () => {
    render(
      <SortBy active={true} direction={"asc"} onClick={() => {}}>
        {" "}
      </SortBy>,
    );
    expect(await screen.findByTestId("direction")).toHaveTextContent("↑");
  });
});
