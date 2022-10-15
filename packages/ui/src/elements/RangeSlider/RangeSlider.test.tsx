import { render } from "@testing-library/react";

import { RangeSlider } from "./";

describe("RangeSlider", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <RangeSlider onChange={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
