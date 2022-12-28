import { render } from "../../../../utils/jest-apollo";
import { UserSkillSocialAval } from ".";

describe("UserSkillSocialAval", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserSkillSocialAval member={{}} />);

    expect(container).toBeInTheDocument();
  });
});
