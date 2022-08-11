import { render } from "@testing-library/react";

import { UserWithDescription } from "./";

describe("UserWithDescription", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserWithDescription />);

    expect(container).toBeInTheDocument();
  });
});
