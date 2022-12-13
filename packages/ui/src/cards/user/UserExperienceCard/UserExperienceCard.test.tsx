import { render } from "../../../../utils/jest-apollo";
import { UserExperienceCard } from ".";

describe("UserExperienceCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserExperienceCard />);

    expect(container).toBeInTheDocument();
  });
});
