import { render } from "@testing-library/react";

import { NumberCircle } from ".";

describe("NumberCircle", () => {
  it("renders without throwing", () => {
    const { container } = render(<NumberCircle value={7} />);

    expect(container).toBeInTheDocument();
  });
});
