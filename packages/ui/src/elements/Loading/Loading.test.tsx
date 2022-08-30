import { render } from "@testing-library/react";

import { Loading } from ".";

describe("Loading", () => {
  it("renders without throwing", () => {
    const { container } = render(<Loading />);

    expect(container).toBeInTheDocument();
  });
});
