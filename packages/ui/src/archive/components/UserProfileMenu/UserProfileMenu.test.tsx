import { render } from "@testing-library/react";

import { UserProfileMenu } from ".";
jest.mock("next/router", () => require("next-router-mock"));

describe("UserProfileMenu", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserProfileMenu />);

    expect(container).toBeInTheDocument();
  });
});
