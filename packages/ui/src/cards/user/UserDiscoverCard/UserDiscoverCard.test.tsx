import { render } from "@testing-library/react";

import { UserDiscoverCard } from "./UserDiscoverCard";

describe("UserDiscoverCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserDiscoverCard />);

    expect(container).toBeInTheDocument();
  });
});
