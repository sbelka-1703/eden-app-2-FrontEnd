import { render } from "@testing-library/react";

import { TimelineStepper } from ".";

describe("TimelineStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<TimelineStepper steps={[]} />);

    expect(container).toBeInTheDocument();
  });
});
