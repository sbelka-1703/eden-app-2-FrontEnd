import { render } from "@testing-library/react";

import { LandingHeroSection } from "./";
jest.mock("next/router", () => require("next-router-mock"));

describe("LandingHeroSection", () => {
  it("renders without throwing", () => {
    const { container } = render(<LandingHeroSection />);

    expect(container).toBeInTheDocument();
  });
});
