import { render } from "@testing-library/react";

import { OpenPositionCard } from "./OpenPositionCard";

describe("OpenPositionCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <OpenPositionCard onApply={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
