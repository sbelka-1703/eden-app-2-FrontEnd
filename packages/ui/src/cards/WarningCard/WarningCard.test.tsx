import { render } from "@testing-library/react";

import { WarningCard } from ".";

describe("WarningCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<WarningCard profilePercentage={65} />);

    expect(container).toBeInTheDocument();
  });
});
