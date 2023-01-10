import { render } from "@testing-library/react";

import { TreeStructComp } from "./TreeStructComp";

describe("TreeStructComp", () => {
  it("renders without throwing", () => {
    const { container } = render(<TreeStructComp />);

    expect(container).toBeInTheDocument();
  });
});
