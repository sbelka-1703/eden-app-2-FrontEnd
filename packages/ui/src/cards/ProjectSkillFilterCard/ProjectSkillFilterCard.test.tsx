import { render } from "../../../utils/jest-apollo";
import { ProjectSkillFilterCard } from ".";

describe("ProjectSkillFilterCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<ProjectSkillFilterCard skills={[]} />);

    expect(container).toBeInTheDocument();
  });
});
