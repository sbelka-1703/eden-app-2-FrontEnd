import { render } from "@testing-library/react";

import { SelectNodesBox } from ".";
import { mockNodes } from "./mockNodes";

describe("SelectNodesBox", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SelectNodesBox caption="Select item" items={mockNodes} />
    );

    expect(container).toBeInTheDocument();
  });
});
