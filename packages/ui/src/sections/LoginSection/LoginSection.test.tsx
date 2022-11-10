import { render } from "@testing-library/react";

import { LoginSection } from "./";

describe("LoginSection", () => {
  it("renders without throwing", () => {
    const { container } = render(<LoginSection />);

    expect(container).toBeInTheDocument();
  });
});
