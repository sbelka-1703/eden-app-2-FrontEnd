import { render } from "@testing-library/react";

import { ProgressBarGeneric } from ".";

describe("ProgressBarGeneric", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProgressBarGeneric progress={50} />);

    expect(container).toBeInTheDocument();
  });
});
