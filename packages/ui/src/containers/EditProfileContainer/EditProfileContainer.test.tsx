import { render } from "../../../utils/jest-apollo";
import { EditProfileContainer } from ".";

describe("EditProfileContainer", () => {
  it("renders without throwing", () => {
    const { container } = render(<EditProfileContainer />);

    expect(container).toBeInTheDocument();
  });
});
