import { render } from "@testing-library/react";

import { AvailabilityComp } from ".";

describe("AvailabilityComp", () => {
  it("renders without throwing", () => {
    const { container } = render(<AvailabilityComp/>);

    expect(container).toBeInTheDocument();
  });
});
