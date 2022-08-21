import { render } from "@testing-library/react";

import { Endorsments } from ".";

describe("Endorsments", () => {
  it("renders without throwing", () => {
    const { container } = render(<Endorsments />);

    expect(container).toBeInTheDocument();
  });
});
