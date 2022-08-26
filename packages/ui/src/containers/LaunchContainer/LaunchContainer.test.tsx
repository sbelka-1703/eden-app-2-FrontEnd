import { render } from "@testing-library/react";

import { LaunchContainer } from "./";

describe("LaunchContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<LaunchContainer />);

    expect(container).toBeInTheDocument();
  });
});
