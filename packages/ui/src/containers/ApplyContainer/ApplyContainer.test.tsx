import { render } from "@testing-library/react";

import { ApplyContainer } from "./";

describe("ApplyContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ApplyContainer />);

    expect(container).toBeInTheDocument();
  });
});
