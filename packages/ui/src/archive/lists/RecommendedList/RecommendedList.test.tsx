import { render } from "@testing-library/react";

import { RecommendedList } from "./";

describe("RecommendedList", () => {
  it("renders without throwing", () => {
    const { container } = render(<RecommendedList />);

    expect(container).toBeInTheDocument();
  });
});
