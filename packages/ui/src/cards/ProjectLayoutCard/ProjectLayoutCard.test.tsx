import { MockedProvider } from "@apollo/client/testing";
import { render } from "@testing-library/react";

import { ProjectLayoutCard } from ".";

describe("ProjectLayoutCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <MockedProvider>
        <ProjectLayoutCard project={{ title: "title 1" }} showRoles />
      </MockedProvider>
    );

    expect(container).toBeInTheDocument();
  });
});
