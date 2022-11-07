import { render } from "@testing-library/react";

import { LifetimeTRST } from ".";

describe("LifetimeTRST", () => {
  it("renders without throwing", () => {
    const { container } = render(<LifetimeTRST />);

    expect(container).toBeInTheDocument();
  });
});
