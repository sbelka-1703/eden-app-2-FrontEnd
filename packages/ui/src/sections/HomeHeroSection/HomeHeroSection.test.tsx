import { render } from "@testing-library/react";

import { HomeHeroSection } from "./";

jest.mock("next/router", () => require("next-router-mock"));
describe("HomeHeroSection", () => {
  it("renders without throwing", () => {
    const { container } = render(<HomeHeroSection />);

    expect(container).toBeInTheDocument();
  });
});
