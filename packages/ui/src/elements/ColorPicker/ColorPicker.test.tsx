import { render } from "@testing-library/react";

import { ColorPicker } from "./";

describe("ColorPicker", () => {
  it("renders without throwing", () => {
    const { container } = render(<ColorPicker />);

    expect(container).toBeInTheDocument();
  });
});
