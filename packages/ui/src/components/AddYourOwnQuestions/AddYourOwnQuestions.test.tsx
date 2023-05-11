import { render } from "@testing-library/react";

describe("AddYourOwnQuestions", () => {
  it("renders without throwing", () => {
    const { container } = render(<div />);

    expect(container).toBeInTheDocument();
  });
});
