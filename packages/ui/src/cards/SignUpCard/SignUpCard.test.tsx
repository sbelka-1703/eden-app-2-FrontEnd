import { render } from "@testing-library/react";

import { SignUpCard } from "./";

describe("SignUpCard", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <SignUpCard roles={[]} onSelectedRole={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
