import { render } from "@testing-library/react";

import { MenuItem } from ".";

describe("MenuItem", () => {
  it("renders without throwing", () => {
    const { container } = render(<MenuItem />);

    expect(container).toBeInTheDocument();
  });
});
