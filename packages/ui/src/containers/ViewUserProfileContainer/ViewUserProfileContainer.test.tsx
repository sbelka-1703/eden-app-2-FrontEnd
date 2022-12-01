import { render } from "../../../utils/jest-apollo";
import { ViewUserProfileContainer } from ".";

describe("ViewUserProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<ViewUserProfileContainer />);

    expect(container).toBeInTheDocument();
  });
});
