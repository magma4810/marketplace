import { Loading } from "@/shared/ui/Loading";
import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";

describe("Loading component", () => {
  it("render", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
