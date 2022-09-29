import { faker } from "@faker-js/faker";
import { render } from "@testing-library/react";

import { ProjectSkillFilterCard } from ".";

describe("ProjectSkillFilterCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectSkillFilterCard skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
