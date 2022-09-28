import { render } from "@testing-library/react";

import { SkillVisualisationComp } from "./SkillVisualisationComp";

describe("SkillVisualisationComp", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillVisualisationComp skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
