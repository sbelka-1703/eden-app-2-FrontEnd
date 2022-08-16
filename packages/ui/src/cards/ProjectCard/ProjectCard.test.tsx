import { render } from "@testing-library/react";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectCard />);

    expect(container).toBeInTheDocument();
  });
});
