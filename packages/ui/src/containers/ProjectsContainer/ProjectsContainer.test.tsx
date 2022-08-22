import { render } from "@testing-library/react";

import { ProjectsContainer } from "./";

describe("ProjectsContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectsContainer />);

    expect(container).toBeInTheDocument();
  });
});
