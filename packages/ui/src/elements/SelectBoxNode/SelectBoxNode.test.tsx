import { render } from "@testing-library/react";

import { SelectBoxNode } from ".";
import { mockNodes } from "./mockNodes";

describe("SelectBoxNode", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SelectBoxNode caption="Select item" items={mockNodes} />
    );

    expect(container).toBeInTheDocument();
  });
});
