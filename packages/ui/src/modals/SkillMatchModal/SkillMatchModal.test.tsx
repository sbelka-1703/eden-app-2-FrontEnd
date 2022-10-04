import { render } from "../../../utils/jest-apollo";
import { SkillMatchModal } from ".";

describe("SkillMatchModal", () => {
  it("renders without throwing", () => {
    const { container } = render(<SkillMatchModal isModalOpen={true} />);

    expect(container).toBeInTheDocument();
  });
});
