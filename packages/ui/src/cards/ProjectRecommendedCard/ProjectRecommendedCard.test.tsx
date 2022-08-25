import { render } from "@testing-library/react";

import { ProjectRecommendedCard } from ".";

describe("ProjectRecommendedCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectRecommendedCard />);

    expect(container).toBeInTheDocument();
  });
});
