import { render } from "@testing-library/react";

import { LongText } from "./";

describe("LongText", () => {
  it("renders without throwing", () => {
    const { container } = render(<LongText text="Lorem ipsum" />);

    expect(container).toBeInTheDocument();
  });
});
