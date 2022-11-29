import { render } from "../../../../utils/jest-apollo";
import { UserExperienceCard2 } from ".";

describe("UserExperienceCard2", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserExperienceCard2 />);

    expect(container).toBeInTheDocument();
  });
});
