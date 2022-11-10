import { render } from "@testing-library/react";

import { HomeHeroSection } from "./";

describe("HomeHeroSection", () => {
  it("renders without throwing", () => {
    const { container } = render(<HomeHeroSection />);

    expect(container).toBeInTheDocument();
  });
});
