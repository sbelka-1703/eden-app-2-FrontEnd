import { render } from "@testing-library/react";

import { Endorsements } from ".";

describe("Endorsements", () => {
  it("renders without throwing", () => {
    const { container } = render(<Endorsements />);

    expect(container).toBeInTheDocument();
  });
});
