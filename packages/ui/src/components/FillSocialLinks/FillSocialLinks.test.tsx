import { render } from "@testing-library/react";

import { FillSocialLinks } from ".";

describe("FillSocialLinks", () => {
  it("renders without throwing", () => {
    const { container } = render(<FillSocialLinks />);

    expect(container).toBeInTheDocument();
  });
});
