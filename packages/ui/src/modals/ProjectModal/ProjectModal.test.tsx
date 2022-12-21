import { MockedProvider } from "@apollo/client/testing";
import { getProject } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectModal } from "./ProjectModal";

describe("ProjectModal", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectModal project={getProject()} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
