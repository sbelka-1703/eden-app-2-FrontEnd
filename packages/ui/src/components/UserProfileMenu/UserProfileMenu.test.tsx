import { render } from "@testing-library/react";

import { UserProfileMenu } from ".";

describe("UserProfileMenu", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserProfileMenu />);

    expect(container).toBeInTheDocument();
  });
});
