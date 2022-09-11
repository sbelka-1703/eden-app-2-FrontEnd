import { render } from "@testing-library/react";

import { RoleSelector } from "./";

describe("RoleSelector", () => {
  it("renders without throwing", () => {
    const { container } = render(<RoleSelector roles={[]} />);

    expect(container).toBeInTheDocument();
  });
});
