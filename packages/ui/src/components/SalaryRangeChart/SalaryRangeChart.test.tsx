import { render } from "@testing-library/react";

import { SalaryRangeChart } from "./SalaryRangeChart";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

describe("SalaryRangeChart", () => {
  it("renders without throwing", () => {
    const { container } = render(<SalaryRangeChart data={rangeNumbers} />);

    expect(container).toBeInTheDocument();
  });
});
