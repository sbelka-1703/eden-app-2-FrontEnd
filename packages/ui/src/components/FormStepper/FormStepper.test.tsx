import { render } from "@testing-library/react";

import { FormStepper } from ".";

describe("FormStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <FormStepper currentStep={1} numberofSteps={6} />
    );

    expect(container).toBeInTheDocument();
  });
});
