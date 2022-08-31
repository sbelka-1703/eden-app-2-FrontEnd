import { render } from "@testing-library/react";

import { SearchBar } from ".";

describe("SearchBar", () => {
  it("renders without throwing", () => {
    const { container } = render(<SearchBar />);

    expect(container).toBeInTheDocument();
  });
});
