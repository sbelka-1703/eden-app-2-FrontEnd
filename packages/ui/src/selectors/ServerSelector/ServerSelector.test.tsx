import { render } from "@testing-library/react";

import { ServerSelector } from "./ServerSelector";

describe("ServerSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<ServerSelector />);

    expect(container).toBeInTheDocument();
  });
});
