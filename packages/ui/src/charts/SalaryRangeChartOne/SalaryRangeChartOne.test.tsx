import { render } from "@testing-library/react";

import { SalaryRangeChartOne } from "./SalaryRangeChartOne";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

describe("SalaryRangeChart", () => {
  it("renders without throwing", () => {
    const { container } = render(<SalaryRangeChartOne data={rangeNumbers} />);

    expect(container).toBeInTheDocument();
  });
});
