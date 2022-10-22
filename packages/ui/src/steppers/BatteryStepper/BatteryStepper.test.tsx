import { render } from "@testing-library/react";

import { BatteryStepper } from ".";

describe("BatteryStepper", () => {
  it("renders without throwing", () => {
    const { container } = render(<BatteryStepper batteryPercentage={50} />);

    expect(container).toBeInTheDocument();
  });
});
