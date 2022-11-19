import { render } from "@testing-library/react";

import { OpenPositionCard } from "./OpenPositionCard";

describe("OpenPositionCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<OpenPositionCard />);

    expect(container).toBeInTheDocument();
  });
});
