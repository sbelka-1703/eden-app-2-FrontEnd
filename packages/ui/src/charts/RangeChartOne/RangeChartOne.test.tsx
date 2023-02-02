import { render } from "@testing-library/react";

import { RangeChartOne } from "./RangeChartOne";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

describe("RangeChartOne", () => {
  it("renders without throwing", () => {
    const { container } = render(<RangeChartOne data={rangeNumbers} />);

    expect(container).toBeInTheDocument();
  });
});
