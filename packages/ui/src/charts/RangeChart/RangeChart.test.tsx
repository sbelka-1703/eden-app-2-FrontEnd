import { render } from "@testing-library/react";

import { RangeChart } from "./RangeChart";

const rangeNumbers: number[] = [];

for (let i = 0; i < 500; i++) {
  rangeNumbers.push(Math.floor(Math.random() * 80) + 1);
}

describe("RangeChart", () => {
  it("renders without throwing", () => {
    const { container } = render(<RangeChart data={rangeNumbers} />);

    expect(container).toBeInTheDocument();
  });
});
