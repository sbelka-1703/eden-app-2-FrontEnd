import { render } from "@testing-library/react";

import { ProgressStepper } from ".";

describe("ProgressStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProgressStepper steps={[]} />);

    expect(container).toBeInTheDocument();
  });
});
