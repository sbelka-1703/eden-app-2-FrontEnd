import { render } from "@testing-library/react";

import { UserProfileCard } from ".";

describe("UserProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserProfileCard />);

    expect(container).toBeInTheDocument();
  });
});
