import { render } from "@testing-library/react";

describe("GreyTextQuestions", () => {
  it("renders without throwing", () => {
    const { container } = render(<div />);

    expect(container).toBeInTheDocument();
  });
});
