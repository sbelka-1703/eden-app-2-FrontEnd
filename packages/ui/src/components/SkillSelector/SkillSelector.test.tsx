import { render } from "@testing-library/react";

import { SkillSelector } from "./";

describe("DropSkillSelectordown", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillSelector />);

    expect(container).toBeInTheDocument();
  });
});
