import { render } from "@testing-library/react";

import { Badge } from "./";

describe("Badge", () => {
  it("renders without throwing", () => {
    const { container } = render(<Badge text="Design" colorRGB="38, 138, 2"/>);

    expect(container).toBeInTheDocument();
  });
});
