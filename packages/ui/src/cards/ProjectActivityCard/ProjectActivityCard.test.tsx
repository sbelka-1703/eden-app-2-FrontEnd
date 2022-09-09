import { render } from "@testing-library/react";

import { ProjectActivityCard } from ".";

describe("ProjectActivityCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectActivityCard />);

    expect(container).toBeInTheDocument();
  });
});
