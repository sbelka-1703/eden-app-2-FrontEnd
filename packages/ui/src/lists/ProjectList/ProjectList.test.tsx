import { render } from "@testing-library/react";

import { ProjectList } from "./";

describe("ProjectList", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectList />);

    expect(container).toBeInTheDocument();
  });
});
