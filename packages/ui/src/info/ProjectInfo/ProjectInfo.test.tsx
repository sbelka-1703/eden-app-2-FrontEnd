import { MockedProvider } from "@apollo/client/testing";
import { getProject } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectInfo } from "./ProjectInfo";

describe("ProjectInfo", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectInfo project={getProject()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
