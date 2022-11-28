import { render } from "../../../../utils/jest-apollo";
import { UserExperienceCard2 } from ".";

describe("UserExperienceCard2", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserExperienceCard2 roles={[]} />);

    expect(container).toBeInTheDocument();
  });
});
