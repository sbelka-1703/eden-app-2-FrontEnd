import { render } from "@testing-library/react";

import { LandingHeroSection } from "./";

describe("LandingHeroSection", () => {
  it("renders without throwing", () => {
    const { container } = render(<LandingHeroSection />);

    expect(container).toBeInTheDocument();
  });
});
