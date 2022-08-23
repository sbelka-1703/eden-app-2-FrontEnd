import { render } from "@testing-library/react";

import { SkillsCard } from "./";

describe("SkillsCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillsCard />);

    expect(container).toBeInTheDocument();
  });
});
