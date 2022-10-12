import { getProject } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { ApplicationCard } from "./ApplicationCard";

describe("ApplicationCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <ApplicationCard project={getProject()} role={{}} />
    );

    expect(container).toBeInTheDocument();
  });
});
