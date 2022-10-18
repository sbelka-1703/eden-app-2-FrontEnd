import { render } from "@testing-library/react";

import { EndorsementsCarousel } from ".";

describe("Endorsements", () => {
  it("renders without throwing", () => {
    const { container } = render(<EndorsementsCarousel />);

    expect(container).toBeInTheDocument();
  });
});
