import { render } from "@testing-library/react";

import { ProgressBar } from ".";

describe("ProgressBar", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProgressBar />);

    expect(container).toBeInTheDocument();
  });
});
