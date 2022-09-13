import { render } from "@testing-library/react";

import { ReadMore } from ".";

describe("ReadMore", () => {
  it("renders without throwing", () => {
    const { container } = render(<ReadMore />);

    expect(container).toBeInTheDocument();
  });
});
