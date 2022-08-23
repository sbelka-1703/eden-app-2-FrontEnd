import { render } from "@testing-library/react";

import { LoginButton } from ".";

describe("LoginButton", () => {
  it("renders without throwing", () => {
    const { container } = render(<LoginButton />);

    expect(container).toBeInTheDocument();
  });
});
