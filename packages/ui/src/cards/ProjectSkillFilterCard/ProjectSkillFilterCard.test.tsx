import { faker } from "@faker-js/faker";
import { render } from "../../../utils/jest-apollo";
import { getSkills } from "../../../../../apps/storybook/mocks";
import { ProjectSkillFilterCard } from ".";

describe("ProjectSkillFilterCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectSkillFilterCard skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
