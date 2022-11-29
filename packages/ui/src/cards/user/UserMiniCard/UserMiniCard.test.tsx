import { render } from "@testing-library/react";

import { UserMiniCard } from "./UserMiniCard";

describe("UserMiniCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserMiniCard />);

    expect(container).toBeInTheDocument();
  });
});
