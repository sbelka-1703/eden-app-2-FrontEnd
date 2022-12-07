import { render } from "@testing-library/react";

import { ProjectCardSmall } from ".";

describe("ProjectCardSmall", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectCardSmall />);

    expect(container).toBeInTheDocument();
  });
});
