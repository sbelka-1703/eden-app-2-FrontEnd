import { getProject } from "@eden/package-mock";
import { render } from "@testing-library/react";

import { OpenPositions } from "./OpenPositions";

describe("OpenPositions", () => {
  it("renders without throwing", () => {
    const { container } = render(<OpenPositions project={getProject()} />);

    expect(container).toBeInTheDocument();
  });
});
