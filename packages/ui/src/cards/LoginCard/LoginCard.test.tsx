import { render } from "@testing-library/react";

import { LoginCard } from ".";

describe("LoginCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<LoginCard />);

    expect(container).toBeInTheDocument();
  });
});
