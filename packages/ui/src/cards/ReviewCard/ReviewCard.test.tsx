import { render } from "@testing-library/react";

import { ReviewCard } from "./ReviewCard";

describe("ReviewCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ReviewCard />);

    expect(container).toBeInTheDocument();
  });
});
