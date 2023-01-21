import { render } from "@testing-library/react";

import { GraphVisualisation } from "./GraphVisualisation";

describe("GraphVisualisation", () => {
  it("renders without throwing", () => {
    const { container } = render(<GraphVisualisation member={{}} />);

    expect(container).toBeInTheDocument();
  });
});
