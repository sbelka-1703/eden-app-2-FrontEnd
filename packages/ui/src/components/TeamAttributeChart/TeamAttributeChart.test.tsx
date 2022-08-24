import { render } from "@testing-library/react";

import { TeamAttributeChart } from ".";

describe("TeamAttributeChart", () => {
  it("renders without throwing", () => {
    const { container } = render(<TeamAttributeChart />);

    expect(container).toBeInTheDocument();
  });
});
