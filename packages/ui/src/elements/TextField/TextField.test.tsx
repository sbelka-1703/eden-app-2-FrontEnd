import { render } from "@testing-library/react";

import { TextField } from "./";

describe("TextField", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TextField onChange={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
