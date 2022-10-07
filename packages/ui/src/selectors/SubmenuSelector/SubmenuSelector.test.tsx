import { render } from "@testing-library/react";

import { SubmenuSelector } from ".";

describe("SubmenuSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<SubmenuSelector />);

    expect(container).toBeInTheDocument();
  });
});
