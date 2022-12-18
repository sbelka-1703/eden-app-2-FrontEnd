import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectNodeMatchInfo } from "./ProjectNodeMatchInfo";

describe("ProjectNodeMatchInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ProjectNodeMatchInfo matchedProject={matchNodesToProjectRolesMock()} />
    );

    expect(container).toBeInTheDocument();
  });
});
