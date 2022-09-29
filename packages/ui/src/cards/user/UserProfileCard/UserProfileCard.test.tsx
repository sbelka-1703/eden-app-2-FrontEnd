import { render } from "../../../../utils/jest-apollo";
import { UserProfileCard } from ".";

describe("UserProfileCard", () => {
  it("renders without throwing", () => {
    const { container } = render(<UserProfileCard />);

    expect(container).toBeInTheDocument();
  });
});
