import { render } from "@testing-library/react";

import { SocialMediaComp } from ".";

describe("SocialMediaComp", () => {
  it("renders without throwing", () => {
    const { container } = render(<SocialMediaComp />);

    expect(container).toBeInTheDocument();
  });
});
