import { render } from "@testing-library/react";

import { ProjectInfo } from ".";

describe("ProjectInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectInfo />);

    expect(container).toBeInTheDocument();
  });
});
