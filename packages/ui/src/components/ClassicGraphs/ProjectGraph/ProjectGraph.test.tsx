import { MockedProvider } from "@apollo/client/testing";
import { getProject } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ProjectGraph } from "./ProjectGraph";

describe("ProjectGraph", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectGraph projectId={getProject()._id!} />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
