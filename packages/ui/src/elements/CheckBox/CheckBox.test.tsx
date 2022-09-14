import { render } from "@testing-library/react";

import { CheckBox } from ".";

describe("CheckBox", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <CheckBox onChange={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
