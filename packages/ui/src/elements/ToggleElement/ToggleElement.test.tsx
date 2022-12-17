import { render } from "@testing-library/react";

import { ToggleElement } from "./";

describe("ToggleElement", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ToggleElement title="Lorem ipsum">
        <p>Test</p>
      </ToggleElement>
    );

    expect(container).toBeInTheDocument();
  });
});
