import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { ProjectCard } from ".";

describe("ProjectCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectCard />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
