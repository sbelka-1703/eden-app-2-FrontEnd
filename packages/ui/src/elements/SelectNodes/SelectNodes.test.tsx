import { render } from "@testing-library/react";

import { SelectNodes } from ".";

describe("SelectNodes", () => {
  it("renders without throwing", () => {
    const { container } = render(<SelectNodes nodeType={"expertise"} />);

    expect(container).toBeInTheDocument();
  });
});
