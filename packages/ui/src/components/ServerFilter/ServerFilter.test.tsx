import { render } from "@testing-library/react";

import { ServerFilter } from "./ServerFilter";

describe("ServerFilter", () => {
  it("renders without throwing", () => {
    const { container } = render(<ServerFilter />);

    expect(container).toBeInTheDocument();
  });
});
