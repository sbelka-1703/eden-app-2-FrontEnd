import { render } from "@testing-library/react";

import { Calendar } from ".";

describe("Calendar", () => {
  it("renders without throwing", () => {
    const { container } = render(<Calendar />);

    expect(container).toBeInTheDocument();
  });
});
