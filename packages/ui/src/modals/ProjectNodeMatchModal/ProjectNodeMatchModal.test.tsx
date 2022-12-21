import { MockedProvider } from "@apollo/client/testing";
import { matchNodesToProjectRolesMock } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectNodeMatchModal } from "./ProjectNodeMatchModal";

describe("ProjectNodeMatchModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectNodeMatchModal
          matchedProject={matchNodesToProjectRolesMock()}
        />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
