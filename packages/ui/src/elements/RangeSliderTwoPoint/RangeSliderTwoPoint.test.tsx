import { render } from "@testing-library/react";

import { RangeSliderTwoPoint } from "./";

describe("RangeSliderTwoPoint", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <RangeSliderTwoPoint domain={[1, 2]} values={[1, 2, 3]} />
    );

    expect(container).toBeInTheDocument();
  });
});
