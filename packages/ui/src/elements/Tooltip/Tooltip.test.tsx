import { render } from "@testing-library/react";

import { Tooltip } from "./";

describe("Tooltip", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <Tooltip tipId="test-tooltip">Tooltip Text</Tooltip>
    );

    expect(container).toBeInTheDocument();
  });
});
