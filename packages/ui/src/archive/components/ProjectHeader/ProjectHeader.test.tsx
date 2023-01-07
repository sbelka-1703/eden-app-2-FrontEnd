import { render } from "@testing-library/react";

import { ProjectHeader } from ".";

describe("ProjectHeader", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectHeader />);

    expect(container).toBeInTheDocument();
  });
});
