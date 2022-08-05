import { render } from "@testing-library/react";

import { UserCard } from "./";

describe("UserCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserCard />);

    expect(container).toBeInTheDocument();
  });
});
