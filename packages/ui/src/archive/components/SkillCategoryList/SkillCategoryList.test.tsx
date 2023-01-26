import { render } from "@testing-library/react";

import { SkillCategoryList } from "./SkillCategoryList";

describe("SkillCategoryList", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillCategoryList skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
