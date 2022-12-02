import { render } from "@testing-library/react";

import { GrantsCard } from "./GrantsCard";

describe("GrantsCard", () => {
  it("renders without throwing stuff", () => {
    const { container } = render(<GrantsCard />);

    expect(container).toBeInTheDocument();
  });
});
