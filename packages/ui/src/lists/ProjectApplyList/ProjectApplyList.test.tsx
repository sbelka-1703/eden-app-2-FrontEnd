import { render } from "@testing-library/react";

import { ProjectApplyList } from "./";

describe("ProjectApplyList", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectApplyList />);

    expect(container).toBeInTheDocument();
  });
});
