import { render } from "@testing-library/react";

import { RoleList } from "./RoleList";

describe("RoleList", () => {
  it("renders without throwing", () => {
    const { container } = render(<RoleList roles={[]} />);

    expect(container).toBeInTheDocument();
  });
});
