import { render } from "@testing-library/react";

import { ServerSelectorMulti } from "./ServerSelectorMulti";

describe("ServerSelectorMulti", () => {
  it("renders without throwing", () => {
    const { container } = render(<ServerSelectorMulti />);

    expect(container).toBeInTheDocument();
  });
});
