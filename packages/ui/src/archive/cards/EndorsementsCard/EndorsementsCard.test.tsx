import { render } from "@testing-library/react";

import { EndorsementsCard } from ".";

describe("EndorsementsCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<EndorsementsCard endorsements={[]} shadow />);

    expect(container).toBeInTheDocument();
  });
});
