import { render } from "@testing-library/react";

import { SideNavProjectList } from "./";

describe("SideNavProjectList", () => {
  it("renders without throwing", () => {
    const { container } = render(<SideNavProjectList projects={[]} />);

    expect(container).toBeInTheDocument();
  });
});
