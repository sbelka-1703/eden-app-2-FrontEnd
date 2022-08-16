import { render } from "@testing-library/react";

import { AppHeader } from "./";

describe("AppHeader", () => {
  it("renders without throwing", () => {
    const { container } = render(<AppHeader />);

    expect(container).toBeInTheDocument();
  });
});
