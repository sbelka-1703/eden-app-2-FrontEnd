import { render } from "@testing-library/react";

import { TextArea } from ".";

describe("TextArea", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <TextArea onChange={(val) => console.log(val)} />
    );

    expect(container).toBeInTheDocument();
  });
});
