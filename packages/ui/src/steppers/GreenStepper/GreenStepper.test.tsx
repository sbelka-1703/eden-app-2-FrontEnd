import { render } from "@testing-library/react";

import { GreenStepper } from ".";

describe("GreenStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<GreenStepper steps={[]} />);

    expect(container).toBeInTheDocument();
  });
});
