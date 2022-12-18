import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectNodeMatchCard } from "./ProjectNodeMatchCard";

describe("ProjectNodeMatchCard", () => {
  it("renders without throwing stuff", () => {
    const { container } = render(
      <ProjectNodeMatchCard matchedProject={matchNodesToProjectRolesMock()} />
    );

    expect(container).toBeInTheDocument();
  });
});
