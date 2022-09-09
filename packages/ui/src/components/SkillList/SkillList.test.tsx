import { render } from "@testing-library/react";

import { SkillList } from "./SkillList";

describe("SkillList", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillList skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
