import { render } from "@testing-library/react";

import { ShortlistList } from "./";

describe("ShortlistList", () => {
  it("renders without throwing", () => {
    const { container } = render(<ShortlistList />);

    expect(container).toBeInTheDocument();
  });
});
