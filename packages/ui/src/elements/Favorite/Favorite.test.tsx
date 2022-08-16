import { render } from "@testing-library/react";

import { Favorite } from ".";

describe("Favorite", () => {
  it("renders without throwing", () => {
    const { container } = render(
      <Favorite favorite={false} memberId="1234" projectId="5678" />
    );

    expect(container).toBeInTheDocument();
  });
});
