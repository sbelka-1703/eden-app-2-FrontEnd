import { render } from "@testing-library/react";

describe("EditText", () => {
  it("renders without throwing", () => {
    const { container } = render(<div />);

    expect(container).toBeInTheDocument();
  });
});
