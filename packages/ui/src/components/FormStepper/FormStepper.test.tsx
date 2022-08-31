import { render } from "@testing-library/react";

import { FormStepper } from ".";

describe("FormStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<FormStepper steps={[]} />);

    expect(container).toBeInTheDocument();
  });
});
