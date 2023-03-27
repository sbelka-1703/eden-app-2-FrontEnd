import { render } from "@testing-library/react";

import { FilterComp } from ".";

describe("FillSocialLinks", () => {
  it("renders without throwing", () => {
    const { container } = render(<FilterComp />);

    expect(container).toBeInTheDocument();
  });
});
