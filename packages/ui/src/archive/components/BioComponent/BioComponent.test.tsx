import { render } from "@testing-library/react";

import { BioComponent } from ".";

describe("BioComponent", () => {
  it("renders without throwing", () => {
    const { container } = render(<BioComponent />);

    expect(container).toBeInTheDocument();
  });
});
