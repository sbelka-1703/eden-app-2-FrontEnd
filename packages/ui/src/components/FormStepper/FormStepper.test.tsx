import { render } from "@testing-library/react";

import { FormStepper } from ".";

describe("FormStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<FormStepper step={1} maxSteps={6} />);

    expect(container).toBeInTheDocument();
  });
});
