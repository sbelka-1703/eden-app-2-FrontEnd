import { render } from "@testing-library/react";

import { ChatSimple } from ".";

describe("ChatSimple", () => {
  it("renders without throwing", () => {
    const { container } = render(<ChatSimple />);

    expect(container).toBeInTheDocument();
  });
});
